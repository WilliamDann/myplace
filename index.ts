import express from 'express'
import bodyParser from 'body-parser';
import errors from './services/Shared/errors';
import dotenv from 'dotenv';
import Logs from './services/Shared/log';
import itemsService from './services/Items/api/all';
import accountsService from './services/Accounts/api/all';
import DB from './services/Shared/db';
import token from './services/Shared/token';

// load env vars
dotenv.config();

// init db connection
(async () => {
    await DB.connection();
})();


const port = process.env.PORT ? parseInt(process.env.PORT) : 8080
const host = process.env.HOST ? process.env.HOST : 'localhost'

const app = express();

// http logging
app.use((req, res, next) => {
    Logs.info(`http: method:${req.method} route:${req.url}`)
    next();
})

// middleware
app.use(bodyParser.urlencoded())

// token auth middleware
app.use(token)

// routes
itemsService(app);
accountsService(app);

// error handling
app.use(errors)

// start app
app.listen(port, host, () => {
    Logs.info(`app started on ${host}:${port}`)
    console.log(`listening on ${host}:${port}`)
})