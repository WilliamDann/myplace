// a token represents a valid user sign in action
export default interface TokenRecord
{
    // id stored in database
    id: number;

    // user id associated with the sign-in action
    user_id: number;

    // token generated at sign-in action
    access_token: string;

    // the date the token was generated
    generated_at: number;

    // how long the token lasts
    expires: number;
}