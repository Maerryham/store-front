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

export enum Status {
    active = 'active',
    complete = 'complete',
  }


export class GetOrderProduct{

    async productsInUserOrder(user_id: string, status?: Status | null): Promise<OrderProduct[]> {
        const additionalQuery = status ? `AND o.status = '${status}'` : '';
        try {
          const conn = await Client.connect()
          const sql = `SELECT 
          p.name, p.price, op.order_id, op.quantity, op.user_id, o.status
          FROM products p 
          INNER JOIN order_product op 
          ON p.id=op.product_id 
          JOIN orders o
          ON op.order_id=o.id 
          WHERE op.user_id = ${user_id} 
          ${additionalQuery};`
    
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



