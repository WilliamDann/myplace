import AccountRecord from "../types/AccountRecord";
import Repository    from "./Repository";

export default class AccountRepository extends Repository<AccountRecord>
{
    constructor() {
        super('accounts');
    }
}