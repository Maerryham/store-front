import Client from "../database";
import bcrypt from "bcrypt";
import dotenv from 'dotenv'
dotenv.config()

const {
    BYCRYPT_PASSWORD: pepper,
    SALT_ROUNDS: saltRounds
} = process.env 

export type User = {
    id?: string;
    firstName: string;
    lastName: string;
    password: string;
}


export class GetUsers{

    async authenticate(username: string, password: string): Promise<User | null>{

        const conn = await Client.connect();
        const sql = "SELECT password FROM users  WHERE username =($1)";
        const result = await conn.query(sql, [username]);

        if(result.rows.length){
            const user = result.rows[0];
            console.log(user);
            if (bcrypt.compareSync(password+pepper, user.password)){
                return user;
            }
        }
        return null;
    }


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
        const sql = `INSERT INTO users (firstName, lastName, username, password) VALUES ($1, $2, $3) RETURNING *`;
        const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds || '') );
        
        const result = await conn.query(sql, [user.firstName, user.lastName, hash]);
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