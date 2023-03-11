import express, { Request, Response } from 'express'
import { GetUsers, User } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const store = new GetUsers();

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}
  
const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id)
  res.json(user)
}

const verifyAuthToken = (req: Request, res: Response, next) => {
  try {
      const authorizationHeader = req.headers.authorization
      if (!authorizationHeader) {throw new Error("Invalid authorization header")}
      const token = authorizationHeader.split(' ')[1] 
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET || '')

      next()
  } catch (error) {
      res.status(401)
  }
}
  
const create = async (_req: Request, res: Response) => {
  const user: User = {
    firstName: _req.body.firstName,
    lastName: _req.body.lastName,
    password: _req.body.password,
  }

  try {  
      const newUser = await store.create(user)
      const token = jwt.sign({user: user}, process.env.TOKEN_SECRET || '')
      res.json(token)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id)
  res.json(deleted)
}
  
const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', verifyAuthToken, create)
  app.delete('/users/:id', verifyAuthToken, destroy)
}
  
export default userRoutes;