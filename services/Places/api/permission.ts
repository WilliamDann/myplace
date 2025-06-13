import { Application } from "express";
import PermissionRepository from "../src/PermissionRepository";
import AppError from "../../Shared/AppError";
import PermissionRecord from "../types/PermissionRecord";
import { extractFieldsOptional, extractNumber, getAuthedUser } from "../../Shared/Request";

export default function (app: Application)
{
    const permRepo  = new PermissionRepository();

    // route to get the permission level of a given user
    app.get('/api/place/permission', async (req, res) => {
        // extract query info
        const authedUser = getAuthedUser(req);
        const place_id   = extractNumber(req.query, 'place_id');
        const account_id = extractNumber(req.query, 'account_id');

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
        const place_id   = extractNumber(req.query, 'place_id');
        const account_id = extractNumber(req.query, 'account_id');

        // check if user has read access
        if (!await permRepo.hasOwnerPermission(authedUser, place_id))
            throw new AppError(403, 'permission error');

        // read desired permissions
        const record = extractFieldsOptional(req.body, [ 'can_read', 'can_write', 'owner' ]) as Partial<PermissionRecord>;

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
        // redirect to POST, as it's the same
        res.redirect(307, '/api/place/permission');
    });

    // route to delete permissions for given user
    app.delete('/api/place/permission', async (req, res) => {
        // extract query info
        const authedUser = getAuthedUser(req);
        const place_id   = extractNumber(req.query, 'place_id');
        const account_id = extractNumber(req.query, 'account_id');

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