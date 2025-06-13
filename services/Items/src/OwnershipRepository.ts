import DB from "../../Shared/DB"
import SqlRepository from "../../Shared/pattern/SqlRepository"
import SQL from "../../Shared/SQL"
import ItemRecord from "../types/ItemRecord"
import OwnershipRecord from "../types/OwnershipRecord"

export default class OwnershipRepository extends SqlRepository<OwnershipRecord>
{
    constructor() {
        super('items_accounts')
    }

    // get all items owned by a user
    async getUserItems(account_id: number): Promise<(ItemRecord&OwnershipRecord)[]>
    {
        const query = `select * from items_accounts join items on items.id = items_accounts.item_id where items_accounts.account_id=${account_id};`
        const data = await DB.query(query);

        return data.rows;
    }

    // determine if a user owns a given item
    async userOwnsItem(account_id: number, item_id: number): Promise<boolean>
    {
        const data = await DB.query(SQL.select(this.tableName, { account_id: account_id, item_id: item_id }));
        return data.rows.length > 0;
    }
}