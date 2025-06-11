import { Application } from "express";
import item from "./item";
import Logs from "../../../shared/log";

// import all routes
export default function(app: Application)
{
    item(app);

    Logs.info('items service started');
}