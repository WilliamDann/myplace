import AccountRecord from "../types/AccountRecord";
import Repository    from "./Repository";
import TokenRepository from "./TokenRepository";

export default class AccountRepository extends Repository<AccountRecord>
{
    constructor() {
        super('accounts');
    }
}