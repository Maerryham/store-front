import Client from "../database";


export type Order = {
    id?: string;
    product_id: string;
    quantity: string;
    user_id: string;
    status: string;
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

    async activeOrderByUser(user_id: string): Promise<Order[]> {
        try {
          const conn = await Client.connect()
          const sql = `SELECT * FROM orders WHERE user_id = ${user_id} and status  = 'active';`
    
          const result = await conn.query(sql)
          conn.release()
    
          return result.rows
        } catch (err) {
          throw new Error(`unable get users with orders: ${err}`)
        } 
      }

      async completeOrderByUser(user_id: string): Promise<Order[]> {
          try {
            const conn = await Client.connect()
            const sql = `SELECT * FROM orders WHERE user_id = ${user_id} and status  = 'complete';`
      
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