import { Application } from "express";
import AppError from "../../../shared/AppError";
import ItemRepository from "../src/ItemRepository";
import extractFields from "../../../shared/extractFields";
import ItemRecord from "../types/ItemRecord";
import parseUPC from "../../../shared/UPC";

export default function(app: Application)
{
    const repo = new ItemRepository();

    // api route to get item by id
    app.get('/api/item', async (req, res) => {
        // read item_id from request
        const item_id = parseInt(req.query.item_id as string);
        if (!item_id || Number.isNaN(item_id))
            throw new AppError(400, 'invalid item_id supplied');

        // get item from database
        const item = await repo.getById(item_id);
        if (!item)
            throw new AppError(404, `item_id ${item_id} does not exist`);

        // OK
        res.json(item);
    });  

    // api route to create an item
    app.post('/api/item', async (req, res) => {
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

        // OK
        res.json(created)
    });
}