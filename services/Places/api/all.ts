import { Application } from "express";
import Logs from "../../Shared/Logs";
import place from "./place";
import inventory from "./inventory";
import permission from "./permission";

export default function(app: Application)
{
    place(app);
    inventory(app);
    permission(app);
    
    Logs.info('places service registered')
}