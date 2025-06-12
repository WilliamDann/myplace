import { Application } from "express";
import PlaceRepository from "../src/PlaceRepository";
import PermissionRepository from "../src/PermissionRepository";
import AppError from "../../Shared/AppError";
import PermissionRecord from "../types/PermissionRecord";

// get authed user's userid from request
function getAuthedUser(req: any): number
{
    if (!req.account_id) {
        throw new AppError(403, 'permission error');
    }
    return req.account_id;
}

export default function (app: Application)
{
    const permRepo  = new PermissionRepository();

    // route to get the permission level of a given user
    app.get('/api/place/permission', async (req, res) => {
        // extract query info
        const authedUser = getAuthedUser(req);
        const place_id   = parseInt(req.query.place_id as string);
        if (!place_id || Number.isNaN(place_id))
            throw new AppError(400, 'invalid place_id');
        const account_id   = parseInt(req.query.account_id as string);
        if (!account_id || Number.isNaN(account_id))
            throw new AppError(400, 'invalid account_id');

        // check if user has read access
        if (!await permRepo.hasOwnerPermission(authedUser, place_id))
            throw new AppError(403, 'permission error');

        // get permissions for user
        let permission = await permRepo.getByAccountAndPlace(account_id, place_id);
        if (!permission)
            permission = await permRepo.create(
                {
                    account_id: account_id,
                    place_id: place_id,
                    can_read: false,
                    can_write: false,
                    member: false
                });

        // OK
        res.json(permission);
    });

    // route to set the permission level of a given user
    app.post('/api/place/permission', async (req, res) => {
        // extract query info
        const authedUser = getAuthedUser(req);
        const place_id   = parseInt(req.query.place_id as string);
        if (!place_id || Number.isNaN(place_id))
            throw new AppError(400, 'invalid place_id');
        const account_id   = parseInt(req.query.account_id as string);
        if (!account_id || Number.isNaN(account_id))
            throw new AppError(400, 'invalid account_id');

        // check if user has read access
        if (!await permRepo.hasOwnerPermission(authedUser, place_id))
            throw new AppError(403, 'permission error');

        // read desired permissions
        const record = {
            can_read    : req.body.can_read     ? req.body.can_read     : false,
            can_write   : req.body.can_write    ? req.body.can_write    : false,
            owner       : req.body.owner        ? req.body.owner        : false,
        } as Partial<PermissionRecord>;

        // either update existing permission record, or create one for this user 
        let created: PermissionRecord;
        const existing = await permRepo.getByAccountAndPlace(account_id, place_id);
        if (existing)
            created = await permRepo.update(existing.id, record);
        else
            created = await permRepo.create(record)

        // OK
        res.json(created);
    })

    // route to update the permission level of a given user
    app.put('/api/place/permission', async (req, res) => {
        // extract query info
        const authedUser = getAuthedUser(req);
        const place_id   = parseInt(req.query.place_id as string);
        if (!place_id || Number.isNaN(place_id))
            throw new AppError(400, 'invalid place_id');
        const account_id   = parseInt(req.query.account_id as string);
        if (!account_id || Number.isNaN(account_id))
            throw new AppError(400, 'invalid account_id');

        // check if user has read access
        if (!await permRepo.hasOwnerPermission(authedUser, place_id))
            throw new AppError(403, 'permission error');

        // read desired permissions
        const record = {
            can_read    : req.body.can_read     ? req.body.can_read     : undefined,
            can_write   : req.body.can_write    ? req.body.can_write    : undefined,
            owner       : req.body.owner        ? req.body.owner        : undefined,
        } as Partial<PermissionRecord>;

        // either update existing permission record, or create one for this user 
        let created: PermissionRecord;
        const existing = await permRepo.getByAccountAndPlace(account_id, place_id);
        if (existing)
            created = await permRepo.update(existing.id, record);
        else
            created = await permRepo.create(record);

        // OK
        res.json(created);
    });

    // route to delete permissions for given user
    app.delete('/api/place/permission', async (req, res) => {
        // extract query info
        const authedUser = getAuthedUser(req);
        const place_id   = parseInt(req.query.place_id as string);
        if (!place_id || Number.isNaN(place_id))
            throw new AppError(400, 'invalid place_id');
        const account_id   = parseInt(req.query.account_id as string);
        if (!account_id || Number.isNaN(account_id))
            throw new AppError(400, 'invalid account_id');

        // check if user has read access
        if (!await permRepo.hasOwnerPermission(authedUser, place_id))
            throw new AppError(403, 'permission error');

        // delete item
        const existing = await permRepo.getByAccountAndPlace(account_id, place_id);
        if (!existing)
            return res.json({});

        await permRepo.delete(existing.id);

        // OK
        res.json({});
    });
}