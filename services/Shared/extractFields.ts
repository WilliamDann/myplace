import AppError from "./AppError";

export default function<T = any>(body: any, fields: string[]): T
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