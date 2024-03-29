import express, { Request, Response } from 'express'
import { GetOrderProduct, OrderProduct, OrderProductMini, Status } from '../models/order_product';


const store = new GetOrderProduct();


const addProductToUserOrder = async (_req: Request, res: Response) => {
    const orderProduct: OrderProductMini = {
      order_id: +_req.params.order_id,
      product_id: +_req.params.product_id,
      quantity: +_req.body.quantity,
    }
  
    try {
        const newOrder = await store.addProductToUserOrder(orderProduct)
        res.status(201)
        if (!newOrder) {
          return res.status(500).send({ message: `Server error`});
        }
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json({ message: `${(err as Error).message} Order ${JSON.stringify(orderProduct)}`})
    }
  }

  const productsInUserOrder = async (_req: Request, res: Response) => {
    const userId = +_req.params.user_id
    const queryStatus = _req.query.status;

    const status = queryStatus ? (queryStatus as Status) : null
    
    try {
        const newOrder = await store.productsInUserOrder(userId, status)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json({ message: `${(err as Error).message} }`})
    }
  }

  const orderProductRoutes = (app: express.Application) => {
    app.post('/orders/:order_id/products/:product_id', addProductToUserOrder)
    app.get('/users/:user_id/orders', productsInUserOrder)
  }
export default orderProductRoutes;