export default interface PlaceRecord
{
    // place id stored in database
    id : number;

    // display name for the plcae
    display_name: string;

    // address info
    address ?: string;
}