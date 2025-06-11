import { Client, Result } from 'pg';
import dotenv from 'dotenv';
import Logs from './log';

// database connection singleton
export default class DB 
{
    // shared pool instance
    private static instance : Client;

    private constructor() { }

    // create the database connection
    private static async createConnection() {
        // load env vars
        dotenv.config();

        // create pool instance
        this.instance = new Client({
            connectionString: "postgresql://postgres:root@localhost:5432/postgres",
            ssl: false
        })

        // connect to database
        //  TODO better logging
        await this.instance.connect()

        // set search path
        await this.query(`set search_path to myplace;`)
    }

    // close the connection
    public static closeConnection() {
        this.instance.end();
        this.instance = undefined
    }

    // get the current connection
    public static connection() {
        if (!this.instance)
            this.createConnection()

        return this.instance
    }

    // send a query
    public static async query(str: string): Promise<Result>
    {
        let connection = await this.connection();

        Logs.info(`sql query: ${str}`)
        return await connection.query(str)
    }
}