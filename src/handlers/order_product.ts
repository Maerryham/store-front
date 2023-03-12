import express, { Request, Response } from 'express'
import { GetOrderProduct, OrderProduct } from '../services/order_products';
import { verifyAuthToken } from '../middlewares/verifyAuthToken'
const orderProductRoutes = express.Router();

const store = new GetOrderProduct();


const addProductToUserOrder = async (_req: Request, res: Response) => {
    const orderProduct: OrderProduct = {
      product_id: _req.params.product_id,
      quantity: _req.body.quantity,
      user_id: _req.body.user_id,
      order_id: _req.params.order_id,
    }
  
    try {
        const newOrder = await store.addProductToUserOrder(orderProduct)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json({ message: `${(err as Error).message} Order ${JSON.stringify(orderProduct)}`})
    }
  }


  orderProductRoutes.post('/orders/:order_id/products/:product_id', addProductToUserOrder)

export default orderProductRoutes;