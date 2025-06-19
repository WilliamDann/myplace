import DB from "../../Shared/DB";
import SqlRepository from "../../Shared/pattern/SqlRepository";
import SQL from "../../Shared/SQL";
import PermissionRecord from "../types/PermissionRecord";

export default class PermissionRepository extends SqlRepository<PermissionRecord>
{
    constructor()
    {
        super('places_permissions')
    }

    // get permissions by account_id
    async getByAccountAndPlace(account_id: number, place_id: number): Promise<PermissionRecord|null>
    {
        let data = await DB.query(SQL.select(this.tableName, { account_id: account_id, place_id: place_id }));
        if (data.rows.length == 0)
            return null
        return data.rows[0];
    }

    // check if an account has a given permission for a given place
    async checkPermission(account_id: number, place_id: number, permissionName: string): Promise<boolean>
    {
        // beacuse of unique constraint, only one permission is allowed to exist
        let data = await DB.query(SQL.select(this.tableName, { account_id: account_id, place_id: place_id }));
        if (data.length != 0 && data.rows[0][permissionName] === true)
            return true;

        return false;
    }

    // true if a user has read permission for a place
    async hasReadPermission(account_id: number, place_id: number): Promise<boolean>
    {
        return await this.checkPermission(account_id, place_id, 'can_read');
    }

    // true if a user has write permission for a place
    async hasWritePermission(account_id: number, place_id: number): Promise<boolean>
    {
        return await this.checkPermission(account_id, place_id, 'can_write');
    }

    // true if the user is an owner of the place
    async hasOwnerPermission(account_id: number, place_id: number): Promise<boolean>
    {
        return await this.checkPermission(account_id, place_id, 'member');
    }}