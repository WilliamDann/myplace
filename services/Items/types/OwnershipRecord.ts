export default interface OwnershipRecord
{
    // unique id stored in database
    id: number;

    // foreign key refing account_id
    account_id: number;

    // foreign key refing item
    item_id: number;
}