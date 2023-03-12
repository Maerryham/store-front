import express, { Request, Response } from 'express'
import { GetOrders, Order } from '../models/order';
import { verifyAuthToken } from '../middlewares/verifyAuthToken'
const orderRoutes = express.Router();

const store = new GetOrders();

const index = async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}

const orderByUser = async (req: Request, res: Response) => {
    const product = await store.activeOrderByUser(req.params.id)
    res.json(product)
}

  
const create = async (_req: Request, res: Response) => {
  const product: Order = {
    product_id: _req.body.product_id,
    quantity: _req.body.quantity,
    user_id: _req.body.user_id,
    status: _req.body.status,
  }

  try {
      const newProduct = await store.create(product)
      res.json(newProduct)
  } catch(err) {
      res.status(400)
      res.json(`Error ${(err as Error).message}`)
  }
}


orderRoutes.get('/orders', index)
orderRoutes.get('/orders/:id', orderByUser)
orderRoutes.post('/orders', verifyAuthToken, create)

export default orderRoutes;