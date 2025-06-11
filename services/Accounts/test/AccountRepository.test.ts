import assert from 'assert';
import AccountRecord from '../types/AccountRecord';
import AccountRepository from '../src/AccountRepository';

const testAccount = {
    email: 'invalid',
    display_name: 'invalid test user',
    password_hash: 'invalid user'
} as AccountRecord

const repo = new AccountRepository()

describe('AccountRepository', () => {
    describe('#getByEmail', () => {
        it ('should return record if exists', async () => {
            // create a test item in the db
            let created = await repo.create(testAccount);

            // read that item by email
            let read    = await repo.getByEmail(testAccount.email);

            // create test item
            await repo.delete(created.id);

            // check read item is valid
            assert(read != null, 'record should exist')
            assert(read.email == testAccount.email, 'should be the same user');
        });
`   `
        it ('should return null when record does not exist', async () => {
            let read = await repo.getByEmail(testAccount.email);

            assert(read == null, 'invalid item should not exist');
        });
    })
});