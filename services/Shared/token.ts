import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError from './AppError';

export default async function (req: Request, res: Response, next: NextFunction)
{
    const token = req.headers['authorization'] as string;
    if (!token)
    {
        next();
        return
    }

    // add authed user to request object if valid
    jwt.verify(token, process.env.SECRET_KEY as string, (err, data) => {
        if (err)
            throw new AppError(403, 'auth error');

        (req as any).account_id = (data as any).account_id;
        next();
    });
}