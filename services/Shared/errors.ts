import { NextFunction, Request, Response }  from "express";
import AppError from "./AppError";
import Logs from "./Logs";

export default function(err: Error, req: Request, res: Response, next: NextFunction)
{
    // if the error is thrown by the app itself
    if (err instanceof AppError)
    {
        res.status(err.code);
        res.json({
            error: {
                code: err.code,
                message: err.message
            }
        });
        return;
    }
    
    // if it's just a normal error
    Logs.error(err.message);

    res.status(500);
    res.json({
        error: {
            code: 500,
            message: err.message
        }
    })
    return;
}