export default interface InventoryRecord
{
    // id for inventory record in db;
    id: number;

    // foreign key to place
    place_id: number;

    // foreign key to item id
    item_id: number;

    // amount of item
    quantity: number;

    // date record was created
    date_added: number;

    // date record was updated
    date_updated: number;
}