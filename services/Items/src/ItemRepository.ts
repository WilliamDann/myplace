import DB from "../../../shared/db";
import SQL from "../../../shared/sql";
import ItemRecord    from "../types/ItemRecord";
import SqlRepository from "../../../shared/pattern/SqlRepository";

export default class ItemRepository extends SqlRepository<ItemRecord>
{
    constructor() {
        super('items');
    }

    // get item records by upc codes
    async getByUpc(upc_code: string): Promise<ItemRecord[]>
    {
        const data = await DB.query(SQL.select(this.tableName, { upc: upc_code }));
        return data.rows as ItemRecord[];
    }
}