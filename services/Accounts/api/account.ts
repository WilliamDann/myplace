import { Application } from 'express';
import {extractFields, extractFieldsOptional, extractNumber, getAuthedUser} from '../../Shared/Request';
import AccountRecord from '../types/AccountRecord';
import { genSalt, hash } from 'bcrypt';
import AccountRepository from '../src/AccountRepository';
import AppError from '../../Shared/AppError';

// clean an object to be sent to the user
function clean(data: Partial<AccountRecord>, authed: boolean = false): Partial<AccountRecord>
{
    delete data.password_hash;
    if (!authed) {
        delete data.email
    }
    return data;
}

export default function(app: Application) {
    const repo = new AccountRepository();

    // api account get route
    app.get('/api/account', async (req, res) => {
        // read account id
        let account_id = extractNumber(req.query, 'account_id');

        // get account from db
        let account = await repo.getById(account_id) as Partial<AccountRecord>;
        if (!account) 
            throw new AppError(404, 'account does not exist')

        // OK
        let authed = false;
        try {
            const authedUser = getAuthedUser(req);
            authed = authedUser == account_id;
        } catch { }

        res.json(clean(account, authed));
    });

    // api account create route
    //  TODO prevent spamming!
    app.post('/api/account', async (req, res) => {
        // read fields from body
        let fields = extractFields(req.body, [ 'email', 'display_name', 'password' ]);
        fields.password_hash = await hash(fields.password, await genSalt())
        delete fields.password;

        // create account
        let account: Partial<AccountRecord>;
        try {
            account = await repo.create(fields);
        } catch (err) {
            throw new AppError(400, 'invalid user data supplied: ' + err);
        }

        // send account data
        res.json(clean(account, true));
    });

    // api account update route
    app.put('/api/account', async (req, res) => {
        // get account id to delete
        let account_id = extractNumber(req.query, 'account_id');
        
        // check if the user is allowed to delete this item
        let auth_id = getAuthedUser(req);
        if (!auth_id || auth_id != account_id) 
            throw new AppError(403, 'permission error');

        // get updates from request body
        let update = extractFieldsOptional(req.body, [ 'display_name', 'email' ]) as Partial<AccountRecord>;

        // update the record
        let updated = await repo.update(account_id, update);
    
        // OK
        res.json(clean(updated, true));
    });

    // api account delete route
    app.delete('/api/account', async (req, res) => {
        // get account id to delete
        let account_id = extractNumber(req.query, 'account_id');
        
        // check if the user is allowed to delete this item
        let auth_id = getAuthedUser(req);
        if (!auth_id || auth_id != account_id) 
            throw new AppError(403, 'permission error');

        // delete it
        await repo.delete(account_id)
    
        // OK
        res.json({});
    })
}