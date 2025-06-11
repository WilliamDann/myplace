import DB from "../db";
import SQL from "../sql";
import Repository from "./Repository";

export default class SqlRepository<RecordType> implements Repository<RecordType>
{
    tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName
    }

    async getById(id: number): Promise<RecordType | null> {
        let data = await DB.query(SQL.select(this.tableName, { id: id }));
        if (!data || !data.rows['0'])
            return null
        return data.rows['0'];
    }

    async create(account: Partial<RecordType>): Promise<RecordType> {
        let data = await DB.query(SQL.insert(this.tableName, account))
        return data.rows['0'];
    }

    async update(id: number, account: Partial<RecordType>): Promise<RecordType> {
        let data = await DB.query(SQL.update(this.tableName, account, { id: id }));
        return data.rows['0'];
    }

    async delete(id: number): Promise<void> {
        await DB.query(SQL.delete(this.tableName, { id: id }))
    }
}