import jwt from 'jsonwebtoken';
import AppError from "./AppError";
import { NextFunction, Request, Response } from 'express';

// get authed user's userid from request
export function getAuthedUser(req: any): number
{
    if (!req.account_id) {
        throw new AppError(403, 'permission error');
    }
    return req.account_id;
}

// extract required fields from request body
export function extractFields<T = any>(body: any, fields: string[]): T
{
    let extract = {};
    
    for (let key of fields)
        {
        let value = body[key];
        if (typeof value != "boolean" && !value) 
            throw new AppError(400, `invalid value for ${key} : ${value}`);
        extract[key] = value;
    }
    
    return extract as T;
}

// extract required fields from request body, does not error for missing field
export function extractFieldsOptional<T = any>(body: any, fields: string[]): T
{
    let extract = {};
    
    for (let key of fields)
        if (body[key]) 
            extract[key] = body[key];
    
    return extract as T;
}

// extract a number from request body
export function extractNumber(body: any, field : string): number {
    let data = parseInt(body[field] as string);
    if (!data || Number.isNaN(data))
        throw new AppError(400, `invalid ${field} supplied: ${body[field]}`);
    return data;
}

// middleware to get auth token on a request object
export function getAuthToken(req: Request, res: Response, next: NextFunction)
{
    const token = req.headers['authorization'] as string;
    if (!token)
    {
        next();
        return
    }
    
    // add authed user to request object if valid
    jwt.verify(token, process.env.SECRET_KEY as string, (err: any, data: any) => {
        if (err)
            throw new AppError(403, 'auth error');
        
        (req as any).account_id = (data as any).account_id;
        next();
    });
}