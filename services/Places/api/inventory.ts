import { Application } from "express";
import InventoryRepository from "../src/InventoryRepository";
import AppError from "../../Shared/AppError";
import PermissionRepository from "../src/PermissionRepository";
import InventoryRecord from "../types/InventoryRecord";
import Logs from "../../Shared/log";

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
    const repo      = new InventoryRepository();
    const permRepo  = new PermissionRepository();

    // get route for inventory record
    app.get('/api/inventory', async (req, res) => {
        // extract query info
        const authedUser = getAuthedUser(req);
        const inventory_id   = parseInt(req.query.inventory_id as string);
        if (!inventory_id || Number.isNaN(inventory_id))
            throw new AppError(400, 'invalid inventory_id');

        // read item
        const inventory = await repo.getById(inventory_id);
        if (!inventory)
            throw new AppError(403, 'no item was found');

        // check if user has read access
        if (!await permRepo.hasReadPermission(authedUser, inventory.place_id))
            throw new AppError(403, 'permission error');

        // OK
        res.json(inventory);
    })

    // route to find all inventory with a given item_id in a given place_id
    app.get('/api/place/item', async(req, res) => {
        // extract query info
        const authedUser = getAuthedUser(req);
        const place_id   = parseInt(req.query.place_id as string);
        if (!place_id || Number.isNaN(place_id))
            throw new AppError(400, 'invalid place_id');
        const item_id   = parseInt(req.query.item_id as string);
        if (!item_id || Number.isNaN(item_id))
            throw new AppError(400, 'invalid account_id');

        // check if user has read access
        if (!await permRepo.hasReadPermission(authedUser, place_id))
            throw new AppError(403, 'permission error');
    
        // read data
        const records = await repo.getByPlaceAndItem(place_id, item_id);

        // OK
        res.json({items: records});
    });

    // route to find all inventory with a given place_id
    app.get('/api/place/items', async (req, res) => {
        // extract query info
        const authedUser = getAuthedUser(req);
        const place_id   = parseInt(req.query.place_id as string);
        if (!place_id || Number.isNaN(place_id))
            throw new AppError(400, 'invalid place_id');

        // check if user has read access
        if (!await permRepo.hasReadPermission(authedUser, place_id))
            throw new AppError(403, 'permission error');

        // lookup
        const records = await repo.getByPlace(place_id);

        // OK
        res.json({items: records});
    })

    // post route for inventory record
    app.post('/api/inventory', async (req, res) => {
        // extract query info
        const authedUser = getAuthedUser(req);

        const place_id   = parseInt(req.body.place_id as string);
        if (!place_id || Number.isNaN(place_id))
            throw new AppError(400, 'invalid place_id');
        const item_id   = parseInt(req.body.item_id as string);
        if (!item_id || Number.isNaN(item_id))
            throw new AppError(400, 'invalid place_id');
        let quantity   = parseInt(req.body.quantity as string);
        if (!quantity || Number.isNaN(quantity))
            quantity = 1

        // check if user has write access
        if (!await permRepo.hasWritePermission(authedUser, place_id))
            throw new AppError(403, 'permission error');

        // create inventory record
        const record = {
            place_id: place_id,
            item_id: item_id,
            quantity: quantity,
            date_added: Date.now(),
            date_updated: Date.now()
        } as Partial<InventoryRecord>;

        let created;
        try {
            created = await repo.create(record);
        } catch (err) {
            throw new AppError(400, 'invalid request: ' + err);
        }

        // OK
        res.json(created);
    });

    // update route for inventory record
    app.put('/api/inventory', async (req, res) => {
        // extract query info
        const authedUser = getAuthedUser(req);
        const inventory_id   = parseInt(req.query.inventory_id as string);
        if (!inventory_id || Number.isNaN(inventory_id))
            throw new AppError(400, 'invalid inventory_id');

        const place_id = req.body.place_id ? parseInt(req.body.place_id) : undefined
        const quantity = req.body.quantity ? parseInt(req.body.quantity) : undefined

        // read item
        const inventory = await repo.getById(inventory_id);
        if (!inventory)
            throw new AppError(403, 'no item was found');

        // check if user has read access
        if (!await permRepo.hasWritePermission(authedUser, inventory.place_id))
            throw new AppError(403, 'permission error');

        // update fields
        let partial = { date_updated: Date.now() } as Partial<InventoryRecord>;
        if (place_id)
            partial.place_id = place_id;
        if (quantity)
            partial.quantity = quantity;

        // update item
        let updated = await repo.update(inventory_id, partial);

        // OK
        res.json(updated);
    });

    // delete route for inventory record
    app.delete('/api/inventory', async (req, res) => {
        // extract query info
        const authedUser = getAuthedUser(req);
        const inventory_id   = parseInt(req.query.inventory_id as string);
        if (!inventory_id || Number.isNaN(inventory_id))
            throw new AppError(400, 'invalid inventory_id');

        // read item
        const inventory = await repo.getById(inventory_id);
        if (!inventory)
            throw new AppError(403, 'no item was found');

        // check if user has read access
        if (!await permRepo.hasWritePermission(authedUser, inventory.place_id))
            throw new AppError(403, 'permission error');

        // delete the item
        await repo.delete(inventory_id);

        // OK
        res.json({});
    });
}