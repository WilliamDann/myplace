import assert from 'assert'
import AccountRecord from '../../Accounts/types/AccountRecord';
import ItemRecord from '../types/ItemRecord';
import AccountRepository from '../../Accounts/src/AccountRepository';
import ItemRepository from '../src/ItemRepository';
import OwnershipRepository from '../src/OwnershipRepository';
import OwnershipRecord from '../types/OwnershipRecord';

let testAccount = {
    email: 'invalid test email',
    password_hash: 'invalid test user',
    display_name: 'invalid test user'
} as AccountRecord;

let testItem = {
    upc: "036000291452",
    display_name: "Debug Item",
    description: "A Debug Item",
    added_at: Date.now()
} as ItemRecord;

let ownershipId: number;

let accountRepo = new AccountRepository();
let itemRepo    = new ItemRepository();
let ownerRepo   = new OwnershipRepository();

describe('OwnershipRepository', () => {
    // test setup
    before(async () => {
        // create test items
        let acc  = await accountRepo.create(testAccount)
        let item = await itemRepo.create(testItem)
        let own  = await ownerRepo.create({
            account_id: acc.id,
            item_id: item.id
        } as OwnershipRecord)

        // update item ids
        testAccount.id = acc.id;
        testItem.id = item.id;
        ownershipId = own.id;
    });

    // test teardown
    after(async() => {
        // delete created debug items
        await ownerRepo.delete(ownershipId);
        await accountRepo.delete(testAccount.id);
        await itemRepo.delete(testItem.id);
    })

    describe('#getUserItems', () => {
        it ('should return all items created by a given user', async () => {
            const data = await ownerRepo.getUserItems(testAccount.id);
            
            assert(data.length != 0, 'should contain an element')
            assert(data[0].item_id == testItem.id, 'should return correct item');
            assert(data[0].display_name == testItem.display_name, 'should return the correct item');
        })
    });

    describe('#userOwnsItem', () => {
        it ('should return true if user created item', async () => {
            const data = await ownerRepo.userOwnsItem(testAccount.id, testItem.id);
            assert(data == true);
        });

        it ('should return false if use did not create item', async () => {
            const data = await ownerRepo.userOwnsItem(testAccount.id, 0);
            assert(data == false);
        });
    });
})