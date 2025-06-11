import { Application } from "express";
import AppError from "../../Shared/AppError";
import ItemRepository from "../src/ItemRepository";
import extractFields from "../../Shared/extractFields";
import ItemRecord from "../types/ItemRecord";
import parseUPC from "../../Shared/UPC";
import OwnershipRepository from "../src/OwnershipRepository";

// get authed user's userid from request
function getAuthedUser(req: any): number
{
    if (!req.account_id) {
        throw new AppError(403, 'permission error');
    }
    return req.account_id;
}

// get item id from request query
function getItemId(req: any): number 
{
    const item_id = parseInt(req.query.item_id as string);
    if (!item_id || Number.isNaN(item_id))
        throw new AppError(400, 'invalid item_id supplied');
    return item_id;
}

export default function(app: Application)
{
    const repo      = new ItemRepository();
    const ownerRepo = new OwnershipRepository();

    // api route to get item by id
    app.get('/api/item', async (req, res) => {
        // read item_id from request
        const item_id = getItemId(req);

        // get item from database
        const item = await repo.getById(item_id);
        if (!item)
            throw new AppError(404, `item_id ${item_id} does not exist`);

        // OK
        res.json(item);
    });  

    // api route to get all of a given user's items
    app.get('/api/item/my', async(req, res) => {
        // get authed user
        let authedUser = getAuthedUser(req);

        // get all items that belong to that user
        const items = await ownerRepo.getUserItems(authedUser);

        // OK
        res.json( {items: items} )
    })

    // api route to create an item
    app.post('/api/item', async (req, res) => {
        let authedUser = getAuthedUser(req);

        // get required fields
        const fields = extractFields(req.body, [ 'upc', 'display_name', 'description' ])

        // parse upc field
        const upc = parseUPC(fields.upc);
        if (!upc)
            throw new AppError(400, 'invalid upc code: ' + fields.upc)

        // create item in database
        let created: ItemRecord;
        try {
            created = await repo.create({
                upc: fields.upc,
                display_name: fields.display_name,
                description: fields.description,
                added_at: Date.now(),
            } as Partial<ItemRecord>);
        } catch (err) {
            throw new AppError(400, 'Invalid request: ' + err)
        }

        // create item ownership
        await ownerRepo.create({
            account_id: authedUser,
            item_id: created.id
        })

        // OK
        res.json(created)
    });

    // api route to update an item
    app.put('/api/item', async (req, res) => {
        // get authed used
        let authedUser = getAuthedUser(req);
        let item_id    = getItemId(req);

        // check if user owns item
        if (!await ownerRepo.userOwnsItem(authedUser, item_id))
            throw new AppError(403, 'permission error');

        // parse updates
        let update = {} as Partial<ItemRecord>;
        if (req.body.display_name)
            update.display_name = req.body.display_name
        if (req.body.description)
            update.description = req.body.description

        // update item
        let updated = await repo.update(item_id, update);

        // OK
        res.json(updated);
    });

    // api route to delete an item
    app.delete('/api/item', async (req, res) => {
        // get authed used
        let authedUser = getAuthedUser(req);
        let item_id    = getItemId(req);

        // check if user owns item
        if (!await ownerRepo.userOwnsItem(authedUser, item_id))
            throw new AppError(403, 'permission error');

        // delete item
        await repo.delete(item_id);

        // OK
        res.json({});
    });
}