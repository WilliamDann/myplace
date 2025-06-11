import DB from "../../../shared/db";
import SQL from "../../../shared/sql";
import TokenRecord from "../types/TokenRecord";
import Repository from "./Repository";

export default class TokenRepository extends Repository<TokenRecord>
{
    constructor() {
        super('tokens')
    }

    // generates a random string to be used as an access token
    private generateAccessToken(length = 32): string {
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        return Array.from(array)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    // generates a token record for a given user id
    private generateToken(account_id: number): Partial<TokenRecord>
    {
        return {
            account_id: account_id,
            access_token: this.generateAccessToken(),
            generated_at: Date.now(),
            expires_in: 3600
        } as Partial<TokenRecord>;
    }

    // check if a token is expired
    isExpired(record: TokenRecord): boolean
    {
        return (Date.now() - record.generated_at) > record.expires_in
    }

    // returns a token that matches account_id and access_token
    //  null if no such token exists
    async getTokenMatch(account_id: number, access_token: string): Promise<TokenRecord|null>
    {
        let data = await DB.query(SQL.select(this.tableName, { account_id: account_id, access_token: access_token }))
        if (data.rows.length == 0)
            return null
        return data.rows[0] as TokenRecord;
    }

    // creates a token for a given user id in the database
    async createForUser(account_id: number): Promise<TokenRecord>
    {
        let record = this.generateToken(account_id);
        let result = await this.create(record)
        return result;
    }

    // delete all tokens associated with a user
    async deleteForUser(account_id: number): Promise<void>
    {
        await DB.query(SQL.delete(this.tableName, { account_id: account_id }))
    }
}