import express, { Request, Response } from 'express'
import { GetProducts, Product } from '../models/product';
import { verifyAuthToken } from '../middlewares/verifyAuthToken'
import dotenv from 'dotenv'
const productRoutes = express.Router();
dotenv.config()

const store = new GetProducts();

const index = async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}
  
const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id)
  res.json(product)
}
  
const create = async (_req: Request, res: Response) => {
  const product: Product = {
    name: _req.body.name,
    price: _req.body.price,
  }

  try {
      const newProduct = await store.create(product)
      res.json(newProduct)
  } catch(err) {
      res.status(400)
      res.json({ message: `${(err as Error).message} Product ${JSON.stringify(product)}`})
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id)
  res.json(deleted)
}
  

  productRoutes.get('/products', index)
  productRoutes.get('/products/:id', show)
  productRoutes.post('/products', verifyAuthToken, create)
  productRoutes.delete('/products/:id', destroy)

  
export default productRoutes;