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
        let instance = new Client({
            connectionString: "postgresql://postgres:root@localhost:5432/postgres",
            ssl: false
        })

        // connect to database
        //  TODO better logging
        try {
            await instance.connect()
        } catch (err) {
            Logs.error(''+err)
            return
        }

        // set search path
        try {
            await instance.query(`set search_path to myplace;`)
        } catch (err) {
            Logs.error(''+err)
            return
        }

        this.instance = instance
    }

    // close the connection
    public static closeConnection() {
        this.instance.end();
        this.instance = undefined
    }

    // get the current connection
    public static async connection(): Promise<Client> {
        if (!this.instance)
            await this.createConnection()

        return this.instance
    }

    // send a query
    public static async query(str: string): Promise<Result>
    {
        let connection = await this.connection();

        Logs.info(`sql query: ${str}`)
        let data;

        try {
            data = await connection.query(str)
        } catch (err) {
            Logs.error(`sql error: ${err}`)
            throw err
        }

        return data
    }
}