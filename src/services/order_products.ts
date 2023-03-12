import Client from "../database";


export type OrderProduct = {
    order_id: string;
    product_id: string;
    quantity: string;
    user_id: string;
    id?: string;
    name?: string;
    price?: string;
}
export type OrderProductMini = {
    order_id: string;
    product_id: string;
    quantity: string;
    user_id: string;
    id?: string;
}


export class GetOrderProduct{

    async orderByUser(user_id: string): Promise<OrderProduct[]> {

        try {
          const conn = await Client.connect()
          const sql = `SELECT 
          p.name, p.price, op.order_id 
          FROM products p 
          INNER JOIN order_product op 
          ON p.id=op.product_id WHERE user_id = ${user_id};`
    
          const result = await conn.query(sql)
          conn.release()
    
          return result.rows
        } catch (err) {
          throw new Error(`unable get users with orders: ${err}`)
        } 
      }

      async addProductToUserOrder(product: OrderProductMini): Promise<OrderProductMini> {

        try {
          const conn = await Client.connect()
          const sql = `INSERT INTO order_product (order_id, product_id, quantity, user_id) VALUES ($1, $2, $3, $4) RETURNING *;`
    
          const result = await conn.query(sql, [...Object.values(product)])
          conn.release()
    
          return result.rows[0]
        } catch (err) {
          throw new Error(`unable to add product to order: ${err}`)
        } 
      }

    

    }



