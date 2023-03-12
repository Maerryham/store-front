import Client from "../database";


export type Order = {
    id?: string;
    product_id: string;
    quantity: string;
    user_id: string;
    status: string;
}


export enum Status {
  active = 'active',
  complete = 'complete',
}


export class GetOrders{
    async index(): Promise<Order[]> {
     try{
 
         const conn = await Client.connect();
         const sql = "SELECT * FROM orders"
         const result = await conn.query(sql);
         conn.release();
 
         return result.rows;
     }
     catch(err){
         throw new Error(`Unable to get orders ${err}`);
     }
    }

    async orderByUser(user_id: string, status?: Status | null): Promise<Order[]> {
      const additionalQuery = status ? `AND status = '${status}'` : '';
        try {
          const conn = await Client.connect()
          const sql = `SELECT * FROM orders WHERE user_id = ${user_id} ${additionalQuery};`
    
          const result = await conn.query(sql)
          conn.release()
    
          return result.rows
        } catch (err) {
          throw new Error(`unable get users with orders: ${err}`)
        } 
      }

      async create(product: Order): Promise<Order> {
        try{
    
            const conn = await Client.connect();
            const sql = `INSERT INTO orders (product_id, quantity, user_id, status) VALUES ($1, $2, $3, $4) RETURNING *`;
            const result = await conn.query(sql, [...Object.values(product)]);
            conn.release();
    
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Unable to create product ${err}`);
        }
       }

} 