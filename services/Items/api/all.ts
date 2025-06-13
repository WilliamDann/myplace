import { Application } from "express";
import item from "./item";
import Logs from "../../Shared/Logs";

// import all routes
export default function(app: Application)
{
    item(app);

    Logs.info('items service registered');
}