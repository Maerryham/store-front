import express, { Request, Response } from 'express'
import { GetProducts, Product } from '../models/product';
import { verifyAuthToken } from '../middlewares/verify_auth_token'
import dotenv from 'dotenv'
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
      res.status(201)
      res.json(newProduct)
  } catch(err) {
      res.status(400)
      res.json({ message: `${(err as Error).message} Product ${JSON.stringify(product)}`})
  }
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
};
  
export default productRoutes;