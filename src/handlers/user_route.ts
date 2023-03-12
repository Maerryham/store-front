import express, { Request, Response } from 'express'
import { GetUsers, User } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { verifyAuthToken } from '../middlewares/verifyAuthToken'
const userRoutes = express.Router();
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


  
const create = async (_req: Request, res: Response) => {
  const user: User = {
    firstName: _req.body.firstName,
    lastName: _req.body.lastName,
    password: _req.body.password,
  }

  try {  
      const newUser = await store.create(user)
      const token = jwt.sign({user: user}, process.env.TOKEN_SECRET || '')
      res.json({token})
  } catch(err ) {
      res.status(400)
      res.json({ message: `${(err as Error).message} User ${JSON.stringify(user)}`})
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id)
  res.json(deleted)
}
  
  userRoutes.get('/users', verifyAuthToken, index)
  userRoutes.get('/users/:id', verifyAuthToken, show)
  userRoutes.post('/users', create)

  
export default userRoutes;