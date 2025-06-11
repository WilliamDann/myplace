import assert from 'assert'
import TokenRepository from '../src/TokenRepository'
import TokenRecord from '../types/TokenRecord'
import AccountRecord from '../types/AccountRecord'
import AccountRepository from '../src/AccountRepository'
import DB from '../../../shared/db'
import SQL from '../../../shared/sql'

describe('TokenRepository', () => {
    describe('#isExpired', () => {

        it ('should return true for an expired token', () => {
            let repo = new TokenRepository()
            let expiredToken = {
                generated_at: 1,
                expires_in: 3600
            } as Partial<TokenRecord>
    
            assert(repo.isExpired(expiredToken as TokenRecord) == true)
        })

        it ('should return false for a non expired token', () => {
            let repo = new TokenRepository()
            let expiredToken = {
                generated_at: Date.now(),
                expires_in: 3600
            } as Partial<TokenRecord>
    
            assert(repo.isExpired(expiredToken as TokenRecord) == false)
        })
    })

    let testAccountId: number;

    before(async () => {
        const repo = new AccountRepository();    
        let accountRecord = await repo.create({
            email: 'test@test.test',
            password_hash: "hash!",
            display_name: "testing user"
        });
        testAccountId = accountRecord.id;
    })

    after(async () => {
        let repo = new AccountRepository();
        await repo.delete(testAccountId);
    })
    
    
    describe('#createForUser()', () => {
        it ('should return a valid token', async () => {
            const repo  = new TokenRepository()
            const token = await repo.createForUser(testAccountId);
            await repo.delete(token.id);

            assert(token != null, 'returned token should exist')
            assert(token.access_token != null, 'returned token should have an access token')
        });
    })

    describe('#getTokenMatch()', () => {
        it ('should return null if no valid token exists', async () => {
            const repo    = new TokenRepository()
            const created = await repo.createForUser(testAccountId);
            const read    = await repo.getTokenMatch(testAccountId, created.access_token);
            await repo.delete(created.id);

            assert(read != null, 'should not return a null token');
            assert(read.access_token == created.access_token, 'should return correct access_token');
        });

        it ('should return a valid token if exists', async () => {
            const repo = new TokenRepository()
            const read = await repo.getTokenMatch(testAccountId, 'asdf');

            assert(read == null, 'should return a null token');
        });
    })

    describe('#deleteForUser', async () => {
        it ('should remove all tokens associated with account_id', async () => {
            const repo = new TokenRepository();
            await repo.createForUser(testAccountId)
            await repo.createForUser(testAccountId)
            await repo.createForUser(testAccountId)

            await repo.deleteForUser(testAccountId);

            let data = await DB.query(SQL.select('tokens', { account_id: testAccountId }));
            
            assert(data.rows.length == 0, 'no tokens should exist for the given user');
        })
    })
})