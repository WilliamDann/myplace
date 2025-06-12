import DB from "../../Shared/db";
import SqlRepository from "../../Shared/pattern/SqlRepository";
import SQL from "../../Shared/sql";
import PlaceRecord from "../types/PlaceRecord";

export default class PlaceRepository extends SqlRepository<PlaceRecord>
{
    constructor()
    {
        super('places')
    }

    async getAccountPlaces(account_id: number): Promise<PlaceRecord[]>
    {
        let data = await DB.query(SQL.select(this.tableName, { account_id: account_id }));
        return data.rows;
    }
}