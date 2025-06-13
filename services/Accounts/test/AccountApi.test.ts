import assert from 'assert';
import {default as chaiHttp, request} from 'chai-http';
import App from '../../../App';
import AccountRepository from '../src/AccountRepository';
import jwt from 'jsonwebtoken';

const testAccount = {
    email: 'invalid endpoint test user',
    display_name: 'invalid test user',
    password_hash: 'invalid user'
}
let createdId: number;
let auth: string;

const app = App(true);
const repo = new AccountRepository();

describe('Accounts API', () => {
    // setup valid data
    before(async () => {
        // create a fake test user
        createdId = (await repo.create(testAccount)).id;

        // generate auth for fake user
        auth = await jwt.sign({ account_id: createdId }, process.env.SECRET_KEY as string);
    })
    after(async () => {
        // remove user
        await repo.delete(createdId);
    })

    // get route tests
    describe('GET /api/account', () => {
        it ('should return 400 when account_id is missing', () => {
            request.execute(app)
                .get('/api/account')
                .end((err, res) => {{
                    assert(res.status == 400);
                }});
        });

        it ('should return 404 when account_id does not exist', () => {
            request.execute(app)
                .get('/api/account')
                .query({ account_id: -1 })
                .end((err, res) => {{
                    assert(res.status == 404);
                }});
        });

        it ('should return valid user data when account_id exists', () => {
            request.execute(app)
                .get('/api/account')
                .query({ account_id: createdId })
                .end((err, res) => {{
                    assert(res.status == 200, JSON.stringify(res.body.error));
                    assert(res.body.display_name == testAccount.display_name)
                }});
        });

        it ('should return email when authed', () => {
            request.execute(app)
                .get('/api/account')
                .query({ account_id: createdId })
                .set('Authorization', auth)
                .end((err, res) => {{
                    assert(res.status == 200, JSON.stringify(res.body.error));
                    assert(res.body.display_name == testAccount.display_name)
                    assert(res.body.email == testAccount.email)
                }});
        });

        it ('should not return email when not authed', () => {
            request.execute(app)
                .get('/api/account')
                .query({ account_id: createdId })
                .end((err, res) => {{
                    assert(res.status == 200, JSON.stringify(res.body.error));
                    assert(res.body.display_name == testAccount.display_name)
                    assert(!res.body.email)
                }});
        });
    });

    // post route tests
    describe('POST /api/account', () => {

    });
});