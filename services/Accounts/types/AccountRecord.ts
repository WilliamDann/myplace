// an account record represents a user account
export default interface AccountRecord
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