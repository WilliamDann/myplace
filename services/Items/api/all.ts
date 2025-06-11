import { Application } from "express";
import item from "./item";

// import all routes
export default function(app: Application)
{
    item(app);
}