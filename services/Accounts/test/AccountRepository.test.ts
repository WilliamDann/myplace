import assert from 'assert'
import AccountRecord from '../types/AccountRecord';
import AccountRepository from '../src/AccountRepository';

function sampleAccount(): Partial<AccountRecord>
{
    return {
        email: 'test@test.test',
        password_hash: "hash!",
        display_name: "testing user"
    }
}

describe('AccountRepository', () => {
    describe('#getById', () => {

    });

    describe('#create', () => {
        it ('should return a valid record', async () => {
            let repo   = new AccountRepository()
            let record = await repo.create(sampleAccount())

            assert(record != null, 'created record should exist')
            assert(record.id != null, 'created record should have an id')

            // await repo.delete(record.id);
        });

        it ('should have created that record in the DB', async() => {
            let repo   = new AccountRepository()
            let record = await repo.create(sampleAccount())

            let read = await repo.getById(record.id);
            
            assert(read != null, 'read record should exist')
            assert(read.display_name == record.display_name, 'read record should match input one')

            // await repo.delete(record.id);
        })
    });

    describe('#update', () => {

    });

    describe('#delete', () => {

    });
});