import express, { Request, Response } from 'express'
import { GetOrders, Order } from '../models/order';
import { verifyAuthToken } from '../middlewares/verifyAuthToken'
const orderRoutes = express.Router();

const store = new GetOrders();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index()
  res.json(orders)
}

const orderByUser = async (req: Request, res: Response) => {
    const order = await store.activeOrderByUser(req.params.id)
    res.json(order)
}

  
const create = async (_req: Request, res: Response) => {
  const order: Order = {
    product_id: _req.body.product_id,
    quantity: _req.body.quantity,
    user_id: _req.body.user_id,
    status: _req.body.status,
  }

  try {
      const newOrder = await store.create(order)
      res.json(newOrder)
  } catch(err) {
      res.status(400)
      res.json({ message: `${(err as Error).message} Order ${JSON.stringify(order)}`})
  }
}


orderRoutes.get('/orders', index)
orderRoutes.get('/orders/:id', orderByUser)
orderRoutes.post('/orders', verifyAuthToken, create)

export default orderRoutes;