import { Application } from 'express';
import extractFields from '../../../shared/extractFields';
import AccountRecord from '../types/AccountRecord';
import { genSalt, hash } from 'bcrypt';
import AccountRepository from '../src/AccountRepository';
import AppError from '../../../shared/AppError';
import Logs from '../../../shared/log';

function getAuthedId(req: any): number
{
    return req.account_id
}

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
        let account_id = parseInt(req.query.account_id as string);
        if (!account_id || Number.isNaN(account_id))
            throw new AppError(400, 'invalid account_id supplied');

        // get account from db
        let account = await repo.getById(account_id) as Partial<AccountRecord>;
        if (!account) 
            throw new AppError(404, 'account does not exist')

        // OK
        res.json(clean(account, account_id == getAuthedId(req)));
    });

    // api account create route
    //  TODO prevent spamming!
    app.post('/api/account', async (req, res) => {
        // read fields from body
        Logs.info(req.body)

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
        let account_id = parseInt(req.query.account_id as string);
        if (!account_id || Number.isNaN(account_id))
            throw new AppError(400, 'invalid account_id supplied');

        // check if the user is allowed to delete this item
        let auth_id = getAuthedId(req);
        if (!auth_id || auth_id != account_id) 
            throw new AppError(403, 'permission error');

        // update the object
        let update: Partial<AccountRecord> = {}

        // update valid fields
        if (req.body.display_name)
            update.display_name = req.body.display_name;
        if (req.body.email)
            update.email = req.body.email;

        // update the record
        let updated = await repo.update(account_id, update);
    
        // OK
        res.json(clean(updated, true));
    });

    // api account delete route
    app.delete('/api/account', async (req, res) => {
        // get account id to delete
        let account_id = parseInt(req.query.account_id as string);
        if (!account_id || Number.isNaN(account_id))
            throw new AppError(400, 'invalid account_id supplied');

        // check if the user is allowed to delete this item
        let auth_id = getAuthedId(req);
        if (!auth_id || auth_id != account_id) 
            throw new AppError(403, 'permission error');

        // delete it
        await repo.delete(account_id)
    
        // OK
        res.json({});
    })
}