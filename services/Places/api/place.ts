import { Application } from "express";
import AppError from "../../Shared/AppError";
import PlaceRecord from "../types/PlaceRecord";
import extractFields from "../../Shared/extractFields";
import PlaceRepository from "../src/PlaceRepository";
import PermissionRepository from "../src/PermissionRepository";

// get authed user's userid from request
function getAuthedUser(req: any): number
{
    if (!req.account_id) {
        throw new AppError(403, 'permission error');
    }
    return req.account_id;
}

const placeRepo = new PlaceRepository();
const permRepo  = new PermissionRepository();

export default function (app: Application)
{
    // get route for a place
    app.get('/api/place', async (req, res) => {
        const authedUser = getAuthedUser(req);
        const place_id   = parseInt(req.query.place_id as string);
        if (!place_id || Number.isNaN(place_id))
            throw new AppError(400, 'invalid place_id');

        // check if user has read access
        if (!await permRepo.hasReadPermission(authedUser, place_id))
            throw new AppError(403, 'permission error');

        // read item and return
        const read = await placeRepo.getById(place_id);
        if (!read)
            throw new AppError(404, 'invalid place_id')

        // OK
        res.json(read)
    });

    // get all places where a user is a member
    app.get('/api/place/my', async (req, res) => {
        const authedUser = getAuthedUser(req);
        const places     = await placeRepo.getAccountPlaces(authedUser);

        res.json(places);
    });

    // post route for a place
    app.post('/api/place', async (req, res) => {
        // extract request data
        const authedUser = getAuthedUser(req);
        const params     = extractFields(req.body, [ 'display_name' ]);

        const partial    = {
            display_name : params.display_name,
            address      : req.body.address
        } as Partial<PlaceRecord>;

        // create item in DB
        const created = await placeRepo.create(partial);

        // create permissions for user
        await permRepo.create({
            account_id: authedUser,
            place_id  : created.id,
            can_read  : true,
            can_write : true,
            member    : true
        });

        // OK
        res.json(created);
    });

    // update route for a place
    app.put('/api/place', async (req, res) => {
        const authedUser = getAuthedUser(req);
        const place_id   = parseInt(req.query.place_id as string);
        if (!place_id || Number.isNaN(place_id))
            throw new AppError(400, 'invalid place_id');

        // check if user has owner access
        if (!await permRepo.hasOwnerPermission(authedUser, place_id))
            throw new AppError(403, 'permission error');

        // read update params
        const partial    = {} as Partial<PlaceRecord>;
        if (req.body.display_name)
            partial.display_name = req.body.display_name;
        if (req.body.address)
            partial.address = req.body.address;

        // update item
        const updated = await placeRepo.update(place_id, partial);

        // OK
        res.json(updated);
    });

    // delete route for a place
    app.delete('/api/place', async (req, res) => {
        const authedUser = getAuthedUser(req);
        const place_id   = parseInt(req.query.place_id as string);
        if (!place_id || Number.isNaN(place_id))
            throw new AppError(400, 'invalid place_id');

        // check if user owns the place
        if (!await permRepo.hasOwnerPermission(authedUser, place_id))
            throw new AppError(403, 'permission error');

        // delete the place
        await placeRepo.delete(place_id);

        // OK
        res.json({});
    });
}