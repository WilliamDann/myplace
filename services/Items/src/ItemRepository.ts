import SqlRepository from "../../../shared/pattern/SqlRepository";
import ItemRecord    from "../types/ItemRecord";

export default class ItemRepository extends SqlRepository<ItemRecord>
{
    constructor() {
        super('items');
    }
}