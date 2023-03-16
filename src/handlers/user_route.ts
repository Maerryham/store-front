import express, { Request, Response } from 'express'
import { GetUsers, User } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { verifyAuthToken } from '../middlewares/verify_auth_token'
// const userRoutes = express.Router();
dotenv.config()

const store = new GetUsers();

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}
  
const show = async (req: Request, res: Response) => {
  const user = await store.show(+req.params.id)
  res.json(user)
}


const authenticate = async (req: Request, res: Response) => {
  try { 
    const user = await store.authenticate(req.params.username, req.params.password)
    const token = jwt.sign({user: user}, process.env.TOKEN_SECRET || '')

    res.json({token})
  } catch(err ) {
    res.status(400)
    res.json({ message: `Unable to sign in ${(err as Error).message}`})
  }
}

      
const create = async (_req: Request, res: Response) => {
  const user: User = {
    firstname: _req.body.firstname,
    lastname: _req.body.lastname,
    username: _req.body.username,
    password: _req.body.password,
  }

  try {  
      const newUser = await store.create(user)
      res.status(201)
      res.json({user: newUser})
  } catch(err ) {
      res.status(400)
      res.json({ message: `${(err as Error).message} User ${JSON.stringify(user)}`})
  }
}
const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.post('/users/signin', authenticate)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', create)
}
  
export default userRoutes;