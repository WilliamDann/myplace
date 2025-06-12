export default interface PermissionRecord
{
    // id for permission record in db
    id: number;

    // foreign key for account_id
    account_id: number;

    // foreign key for place_id
    place_id: number;

    // permissions

    // if the account_id can read information about the place
    can_read  : boolean;

    // if the account_id can write information about the place
    can_write : boolean;

    // if the user is a member of the place
    member    : boolean;
}