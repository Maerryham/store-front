import express, { Request, Response } from 'express'
import { GetOrders, Order, Status } from '../models/order';
import { verifyAuthToken } from '../middlewares/verify_auth_token'
const orderRoutes = express.Router();

const store = new GetOrders();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index()
  res.json(orders)
}

const OrderByUser = async (req: Request, res: Response) => {
    const queryStatus = req.query.status;

    const status = queryStatus ? (queryStatus as Status) : null
    try{
      const order = await store.orderByUser(req.params.id, status)
      res.json(order)
    }catch(err){
      res.status(400)
      res.json({ message: `${(err as Error).message}`})
    }  
}

  
const create = async (_req: Request, res: Response) => {
  const order: Order = {
    user_id: _req.body.user_id,
    status: _req.body.status,
  }

  try {
      const newOrder = await store.create(order)
      res.status(201)
      res.json(newOrder)
  } catch(err) {
      res.status(400)
      res.json({ message: `${(err as Error).message} Order ${JSON.stringify(order)}`})
  }
}


orderRoutes.get('/orders', index)
orderRoutes.get('/orders/users/:id', verifyAuthToken, OrderByUser)
orderRoutes.post('/orders', verifyAuthToken, create)

export default orderRoutes;