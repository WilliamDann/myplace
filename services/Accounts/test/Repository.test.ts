import assert from 'assert'
import TestAccountRecord from './TestRecord';
import TestRepository from './TestRepo';

const sampleAccount = {
    email: 'test@test.test',
    password_hash: "hash!",
    display_name: "testing user"
} as Partial<TestAccountRecord>

describe('Repository', () => {
    describe('#getById', () => {
        it ('should return a valid record', async () => {
            let repo    = new TestRepository()
            let created = await repo.create(sampleAccount)
            
            let read = await repo.getById(created.id)
            await repo.delete(created.id)

            assert(read != null, 'an item should exist in the db')
            assert(read.id == created.id != null, 'read item should match created item')
        })
    });

    describe('#create', () => {
        it ('should return a valid record', async () => {
            let repo    = new TestRepository()
            let created = await repo.create(sampleAccount)
            await repo.delete(created.id)

            assert(created != null, 'an item should be returned by create')
            assert(created.id != null, 'the item returned by create should have an id')
        });

        it ('should have created the record in the db', async () => {
            let repo    = new TestRepository()
            let created = await repo.create(sampleAccount)
            
            let read = await repo.getById(created.id)
            await repo.delete(created.id)

            assert(read != null, 'an item should exist in the db')
            assert(read.display_name == created.display_name != null, 'the item should matched the input')
        })
    });

    describe('#update', () => {

        it ('should reutrn an updated record', async () => {
            let repo    = new TestRepository()
            let created = await repo.create(sampleAccount)
            
            let cpy = Object.assign({}, sampleAccount)
            cpy.display_name = 'updated user'

            let updated = await repo.update(created.id, cpy)
            await repo.delete(created.id);

            assert(updated != null, 'updated item should be returned')
            assert(updated.display_name == cpy.display_name != null, 'the item should matched the input')
        });


        it ('should have updated the db', async () => {
            let repo    = new TestRepository()
            let created = await repo.create(sampleAccount)
            
            let cpy = Object.assign({}, sampleAccount)
            cpy.display_name = 'updated user'

            let updated = await repo.update(created.id, cpy)
            let read = await repo.getById(created.id);

            await repo.delete(created.id);

            assert(read != null, 'updated item should be returned')
            assert(read.display_name == read.display_name != null, 'the item should matched the input')
        })
    });

    describe('#delete', () => {
        it ('should delete the given record in the db', async () => {
            let repo    = new TestRepository()
            let created = await repo.create(sampleAccount)

            await repo.delete(created.id)

            let read = await repo.getById(created.id)

            assert(read == null, 'should not be able to read deleted item')
        });
    });
});