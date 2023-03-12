import Client from "../database";


export type Order = {
    id?: string;
    name: string;
    price: number;
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

    async OrderByUser(user_id: string): Promise<Order[]> {
        try {
          const conn = await Client.connect()
          const sql = `SELECT * FROM orders WHERE user_id = ${user_id} and status  = 'pending';`
    
          const result = await conn.query(sql)
          conn.release()
    
          return result.rows
        } catch (err) {
          throw new Error(`unable get users with orders: ${err}`)
        } 
      }

} 