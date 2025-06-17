import express, { Application } from "express";
import dotenv from 'dotenv';
import DB from "./services/Shared/DB";
import Logs from "./services/Shared/Logs";
import bodyParser from "body-parser";
import { getAuthToken } from "./services/Shared/Request";
import cookieParser from 'cookie-parser';

import cors from 'cors';

import accountsService from './services/Accounts/api/all';
import placeService from './services/Places/api/all';
import itemsService from './services/Items/api/all';
import errors from "./services/Shared/errors";

export default function(testing = false)
{
    // load env vars
    dotenv.config();

    // init db connection
    (async () => {
        await DB.connection();
    })();

    const app = express();

    app.use(cors({
        origin: 'http://localhost:8080',
        credentials: true,
        exposedHeaders: ['SET-COOKIE'] 
    }))
    app.use(cookieParser());

    // http logging
    app.use((req, res, next) => {
        Logs.info(`http: method:${req.method} route:${req.url}`)
        next();
    })

    // middleware
    app.use(bodyParser.urlencoded())

    // token auth middleware
    app.use(getAuthToken)

    // routes
    itemsService(app);
    accountsService(app);
    placeService(app);

    // error handling
    app.use(errors)

    // add testing mode to logs
    if (testing)
        Logs.info('\n\n##### APP STARTED IN TESTING MODE ##### ');

    return app;
}