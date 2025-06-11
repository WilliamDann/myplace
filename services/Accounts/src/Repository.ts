export default interface Repository<RecordType>
{
    tableName: string;

    getById(id: number): Promise<RecordType | null>
    create(account: Partial<RecordType>): Promise<RecordType>
    update(id: number, account: Partial<RecordType>): Promise<RecordType>
    delete(id: number): Promise<void>
}