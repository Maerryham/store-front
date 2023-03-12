import express, { Request, Response } from 'express'
import { GetProducts, Product } from '../models/product';
import jwt from 'jsonwebtoken';
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
    name: _req.body.title,
    price: _req.body.content,
  }

  try {
    jwt.verify(_req.body.token, process.env.TOKEN_SECRET || '');
    // res.json(newProduct)
  } catch(err) {
      res.status(401)
      res.json(`Invalid token: ${err}`)
      return
  }

  try {
      const newProduct = await store.create(product)
      res.json(newProduct)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id)
  res.json(deleted)
}
  

  productRoutes.get('/products', index)
  productRoutes.get('/products/:id', show)
  productRoutes.post('/products', create)
  productRoutes.delete('/products/:id', destroy)

  
export default productRoutes;