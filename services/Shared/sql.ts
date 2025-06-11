import { escapeLiteral } from 'pg'

// generates basic sql queries
export default class SQL
{
    // generate a sql style colum list
    // for columns=[] output is "*", as in sql
    static list(columns: string[]): string {
        if (columns && columns.length > 0) {
            return columns.map(col => `"${col}"`).join(', ')
        }
        return '*'
    }

    // escape strings
    static escape(value: any): string {
        if (typeof value === "string")
            return escapeLiteral(value)
        if (value == null || value == undefined)
            return 'NULL'

        return ''+value
    }

    // generate a sql set clause
    static setClause(updates: any)
    {
        return Object.entries(updates)
            .map(([key, value]) => {return `"${key}" = ${this.escape(value)}`})
            .join(', ')
    }

    // generate a sql where clause
    static whereClause(where: any)
    {
        return Object.entries(where)
            .map(([key, value]) => { return `"${key}" = ${this.escape(value)}`})
            .join(' and ')
    }
    
    // generate a simple sql select
    static select(tableName: string, where:any, columns ?: string[])
    {
        if (!columns)
            columns = [];

        return `select ${this.list(columns)} from ${tableName} where ${this.whereClause(where)}`
    }

    // generate a simple sql insert
    static insert(tableName: string, data: any): string
    {
        const cols = Object.keys(data)
        const vals = Object.values(data)
        
        const colsPart = cols.map(col => `"${col}"`).join(', ')
        const valsPart = vals.map(val => this.escape(val)).join(', ')
        
        return `insert into "${tableName}" (${colsPart}) values (${valsPart}) returning *;`
    }

    // generate a simple sql update 
    static update(tableName: string, updates: any, where: any): string
    {   
        return `update "${tableName}" set ${this.setClause(updates)} where ${this.whereClause(where)} returning *;`
    }

    // generates a simple sql delete
    static delete(tableName: string, where: any): string
    {
        return `delete from ${tableName} where ${this.whereClause(where)}`
    }
}