export default interface ItemRecord
{
    // the item's id number in our service
    id : number;

    // the item's upc code
    upc: string;

    // the item's display name
    display_name: string;

    // a short text description about the item
    description: string;

    // when the item was added
    added_at : number;
}