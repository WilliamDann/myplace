import SqlRepository from "../src/SqlRepository";
import TestAccountRecord from "./TestRecord";

// dummy Repository for testing base Repository
export default class TestRepository extends SqlRepository<TestAccountRecord>
{
    constructor() {
        super('accounts');
    }
}