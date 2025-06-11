import Repository from "../src/Repository";
import TestAccountRecord from "./TestRecord";

// dummy Repository for testing base Repository
export default class TestRepository extends Repository<TestAccountRecord>
{
    constructor() {
        super('accounts');
    }
}