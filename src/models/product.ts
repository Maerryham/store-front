import Client from "../database";


export type Product = {
    id?: string | number;
    name: string;
    price: string | number;
}


export class GetProducts{
   async index(): Promise<Product[]> {
    try{

        const conn = await Client.connect();
        const sql = "SELECT * FROM products"
        const result = await conn.query(sql);
        conn.release();

        return result.rows;
    }
    catch(err){
        throw new Error(`Unable to get products ${err}`);
    }
   }

   async show(id: string): Promise<Product> {
    try{

        const conn = await Client.connect();
        const sql = `SELECT * FROM products WHERE id =${id}`;
        const result = await conn.query(sql);
        conn.release();

        return result.rows[0];
    }
    catch(err){
        throw new Error(`Unable to get product ${err}`);
    }
    
   }

   async create(product: Product): Promise<Product> {
    try{

        const conn = await Client.connect();
        const sql = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *`;
        const result = await conn.query(sql, [...Object.values(product)]);
        conn.release();

        return result.rows[0];
    }
    catch(err){
        throw new Error(`Unable to create product ${err}`);
    }
   }
}