import { Application } from 'express';
import {extractFields} from '../../Shared/Request';
import AccountRepository from '../src/AccountRepository';
import AppError from '../../Shared/AppError';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

export default function(app: Application) {
    let repo = new AccountRepository();

    app.post('/api/auth', async (req, res) => {
        let fields = extractFields(req.body, [ 'email', 'password' ]);
        
        // get user data from db
        let account = await repo.getByEmail(fields.email);
        if (!account) 
            throw new AppError(403, 'auth error');

        // check password
        if (!await compare(fields.password, account.password_hash))
            throw new AppError(403, 'auth error');

        // generate token
        let token = jwt.sign({account_id: account.id}, process.env.SECRET_KEY as string, { expiresIn: '1h' });
        res.cookie('token', token);

        // OK
        res.json( {token: token} );
    });
}