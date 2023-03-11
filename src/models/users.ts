import Client from "../database";


export type User = {
    id?: string;
    firstName: string;
    lastName: string;
    password: string;
}


export class GetUsers{
   async index(): Promise<User[]> {
    try{

        const conn = await Client.connect();
        const sql = "SELECT * FROM users"
        const result = await conn.query(sql);
        conn.release();

        return result.rows;
    }
    catch(err){
        throw new Error(`Unable to get users ${err}`);
    }
   }

   async show(id: string): Promise<User> {
    try{

        const conn = await Client.connect();
        const sql = `SELECT * FROM users WHERE id =${id}`;
        const result = await conn.query(sql);
        conn.release();

        return result.rows[0];
    }
    catch(err){
        throw new Error(`Unable to get user ${err}`);
    }
    
   }

   async create(user: User): Promise<User> {
    try{

        const conn = await Client.connect();
        const sql = `INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *`;
        const result = await conn.query(sql, [...Object.values(user)]);
        conn.release();

        return result.rows[0];
    }
    catch(err){
        throw new Error(`Unable to create user ${err}`);
    }
   }

   async delete(id: string): Promise<User[]> {
    try{

        const conn = await Client.connect();
        const sql = `DELETE FROM users WHERE id = ${id}`;
        const result = await conn.query(sql);
        conn.release();

        return result.rows;
    }
    catch(err){
        throw new Error(`Unable to delete user ${err}`);
    }
   }
}