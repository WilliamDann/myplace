import { Application } from "express";
import InventoryRepository from "../src/InventoryRepository";
import AppError from "../../Shared/AppError";
import PermissionRepository from "../src/PermissionRepository";
import InventoryRecord from "../types/InventoryRecord";
import { extractFieldsOptional, extractNumber, getAuthedUser } from "../../Shared/Request";

export default function (app: Application)
{
    const repo      = new InventoryRepository();
    const permRepo  = new PermissionRepository();

    // get route for inventory record
    app.get('/api/inventory', async (req, res) => {
        // extract query info
        const authedUser   = getAuthedUser(req);
        const inventory_id = extractNumber(req.query, 'inventory_id');

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
        const place_id   = extractNumber(req.query, 'place_id');
        const item_id    = extractNumber(req.query, 'item_id');

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
        const place_id   = extractNumber(req.query, 'place_id');

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

        const place_id = extractNumber(req.query, 'place_id');
        const item_id  = extractNumber(req.query, 'item_id');
        const quantity = extractNumber(req.query, 'quantity');

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
        const authedUser   = getAuthedUser(req);
        const inventory_id = extractNumber(req.query, 'inventory_id');

        // read item
        const inventory = await repo.getById(inventory_id);
        if (!inventory)
            throw new AppError(403, 'no item was found');

        // check if user has read access
        if (!await permRepo.hasWritePermission(authedUser, inventory.place_id))
            throw new AppError(403, 'permission error');

        // get fields to update
        let partial = extractFieldsOptional(req.body, [ 'place_id', 'quantity' ]) as Partial<InventoryRecord>;
        if (Object.keys(partial).length != 0) {
            partial.date_updated = Date.now();
        }

        // update item
        let updated = await repo.update(inventory_id, partial);

        // OK
        res.json(updated);
    });

    // delete route for inventory record
    app.delete('/api/inventory', async (req, res) => {
        // extract query info
        const authedUser   = getAuthedUser(req);
        const inventory_id = extractNumber(req.query, 'inventory_id');

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