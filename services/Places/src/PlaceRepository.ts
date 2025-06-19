import DB from "../../Shared/DB";
import SqlRepository from "../../Shared/pattern/SqlRepository";
import SQL from "../../Shared/SQL";
import PlaceRecord from "../types/PlaceRecord";

export default class PlaceRepository extends SqlRepository<PlaceRecord>
{
    constructor()
    {
        super('places')
    }

    async getAccountPlaces(account_id: number): Promise<PlaceRecord[]>
    {
        const query = `select places.* from places join places_permissions on places.id = places_permissions.place_id where account_id=${account_id}`;
        const result = await DB.query(query);

        return result.rows;
    }
}