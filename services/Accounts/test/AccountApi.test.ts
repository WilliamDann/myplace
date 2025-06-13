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
let deleteAfterEach: number|null = null;
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
    });
    afterEach(async () => {
        if (deleteAfterEach !== null)
        {
            await repo.delete(deleteAfterEach)
            deleteAfterEach = null;
        }
    })

    // get route tests
    describe('GET /api/account', () => {
        it ('should return 400 when account_id is missing', (done) => {
            request.execute(app)
                .get('/api/account')
                .end((err, res) => {{
                    assert(res.status == 400);
                    done();
                }});
        });

        it ('should return 404 when account_id does not exist', (done) => {
            request.execute(app)
                .get('/api/account')
                .query({ account_id: -1 })
                .end((err, res) => {{
                    assert(res.status == 404);
                    done();
                }});
        });

        it ('should return valid user data when account_id exists', (done) => {
            request.execute(app)
                .get('/api/account')
                .query({ account_id: createdId })
                .end((err, res) => {{
                    assert(res.status == 200, JSON.stringify(res.body.error));
                    assert(res.body.display_name == testAccount.display_name)
                    done();
                }});
        });

        it ('should return email when authed', (done) => {
            request.execute(app)
                .get('/api/account')
                .query({ account_id: createdId })
                .set('Authorization', auth)
                .end((err, res) => {{
                    assert(res.status == 200, JSON.stringify(res.body.error));
                    assert(res.body.display_name == testAccount.display_name)
                    assert(res.body.email == testAccount.email)
                    done();
                }});
        });

        it ('should not return email when not authed', (done) => {
            request.execute(app)
                .get('/api/account')
                .query({ account_id: createdId })
                .end((err, res) => {{
                    assert(res.status == 200, JSON.stringify(res.body.error));
                    assert(res.body.display_name == testAccount.display_name)
                    assert(!res.body.email)
                    done();
                }});
        });

        it ('should never return password_hash', (done) => {
            request.execute(app)
                .get('/api/account')
                .query({ account_id: createdId })
                .set('Authorization', auth)
                .end((err, res) => {{
                    assert(res.status == 200, JSON.stringify(res.body.error));
                    assert(!res.body.password_hash)
                    done();
                }});
        });
    });

    // post route tests
    describe('POST /api/account', () => {
        it ('should return 400 when missing email', (done) => {
            request.execute(app)
                .post('/api/account')
                .type('form')
                .send({ display_name: 'test!', password: 'test!' })
                .end((err, res) => {{
                    assert(res.status == 400);
                    done();
                }});
        });

        it ('should return 400 when missing password', (done) => {
            request.execute(app)
                .post('/api/account')
                .type('form')
                .send({ email: 'test!', display_name: 'test!' })
                .end((err, res) => {{
                    assert(res.status == 400);
                    done();
                }});
        });

        it ('should return 400 when missing display_name', (done) => {
            request.execute(app)
                .post('/api/account')
                .type('form')
                .send({ email: 'test!', password: 'test!' })
                .end((err, res) => {{
                    assert(res.status == 400);
                    done()
                }});
        });

        it ('should return 400 using duplicate email', (done) => {
            request.execute(app)
                .post('/api/account')
                .type('form')
                .send(testAccount)
                .end((err, res) => {{
                    assert(res.status == 400);
                    done()
                }});
        });

        it ('should return 200 upon success, returning created record', (done) => {
            let copy = Object.assign({}, testAccount) as any
            copy.email = 'endpoint test';
            copy.password = 'endpoint test';

            request.execute(app)
                .post('/api/account')
                .type('form')
                .send(copy)
                .end((err, res) => {{
                    assert(res.status == 200, JSON.stringify(res.body));
                    assert(res.body.id !== undefined)
                    assert(res.body.display_name == copy.display_name)

                    // delete item after test
                    deleteAfterEach = res.body.id;
                    done()
                }});
        })
    });
});