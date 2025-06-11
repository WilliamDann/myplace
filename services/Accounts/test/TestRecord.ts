// dummy user account record for testing Repository
export default interface TestAccountRecord
{
    // id stored in database
    id: number;

    // email associated with account
    email: string;

    // user's hashed password
    password_hash: string;

    // user's desired display name
    display_name: string;
}