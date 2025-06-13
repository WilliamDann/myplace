import ItemRecord from "../../Items/types/ItemRecord";
import DB from "../../Shared/DB";
import SqlRepository from "../../Shared/pattern/SqlRepository";
import SQL from "../../Shared/SQL";
import InventoryRecord from "../types/InventoryRecord";

export default class InventoryRepository extends SqlRepository<InventoryRecord>
{
    constructor()
    {
        super('places_items');
    }

    // get items at a given place
    async getByPlace(place_id: number): Promise<InventoryRecord[]>
    {
        const query = `select place_id, item_id, date_added, date_updated, quantity, upc, display_name, description, places_items.id as inventory_id from places_items join items on places_items.item_id = items.id where place_id = ${place_id}`
        const data  = await DB.query(query);

        return data.rows;
    }

    // get all in inventory for an account
    async getByAccount(account_id: number): Promise<InventoryRecord[]>
    {
        // join with places_permissions to only return inventory records for users where they are a memeber
        let query = `
        select 
            place_id, item_id, date_added, date_updated, quantity, upc, display_name, description, places_items.id as inventory_id
        from places_items 
            join places_permissions on places_items.place_id = place.id
        where places_permissions.account_id = ${account_id}`;

        let data = await DB.query(query);
        return data.rows;
    }

    // get info about an item in a place
    async getByPlaceAndItem(place_id: number, item_id: number): Promise<(InventoryRecord&ItemRecord)[]>
    {
        const query = `select place_id, item_id, date_added, date_updated, quantity, upc, display_name, description, places_items.id as inventory_id from places_items join items on places_items.item_id = items.id where place_id = ${place_id} and item_id  = ${item_id}`
        const data = await DB.query(query);
        return data.rows;
    }
}