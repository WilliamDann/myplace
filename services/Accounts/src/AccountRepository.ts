import DB from "../../Shared/db";
import SQL from "../../Shared/sql";
import AccountRecord from "../types/AccountRecord";
import SqlRepository from "../../Shared/pattern/SqlRepository";

export default class AccountRepository extends SqlRepository<AccountRecord>
{
    constructor() {
        super('accounts');
    }

    // get a user by their email
    async getByEmail(email: string): Promise<AccountRecord|null> {
        let data = await DB.query(SQL.select(this.tableName, { email: email }));
        if (data.rows.length == 0) 
            return null;
        return data.rows[0];
    }
}