import DB from "../../../shared/db";
import SQL from "../../../shared/sql";
import AccountRecord from "../types/AccountRecord";
import Repository from "../../../shared/pattern/Repository";
import Logs from "../../../shared/log";

export default class AccountRepository implements Repository<AccountRecord>
{
    async getById(id: number): Promise<AccountRecord | null> {
        let data = await DB.query(SQL.select('accounts', { id: id }));
        if (!data || !data.rows['0'])
            return null
        return data.rows['0'];
    }

    async create(account: Partial<AccountRecord>): Promise<AccountRecord> {
        let data = await DB.query(SQL.insert('accounts', account))
        return data.rows['0'];
    }

    async update(id: number, account: Partial<AccountRecord>): Promise<AccountRecord> {
        let data = await DB.query(SQL.update('accounts', account, { id: id }));
        return data.rows['0'];
    }

    async delete(id: number): Promise<void> {
        await DB.query(SQL.delete('accounts', { id: id }))
    }
}