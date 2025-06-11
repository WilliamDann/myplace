import { Application } from "express";
import item from "./item";
import Logs from "../../Shared/log";

// import all routes
export default function(app: Application)
{
    item(app);

    Logs.info('items service started');
}