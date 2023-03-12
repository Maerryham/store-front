import express, { Request, Response } from 'express'
import { GetOrders } from '../models/order';


const store = new GetOrders();

const index = async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}

const orderByUser = async (req: Request, res: Response) => {
    const product = await store.OrderByUser(req.params.id)
    res.json(product)
}