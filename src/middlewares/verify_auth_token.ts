import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'


export const verifyAuthToken = (req: Request, res: Response, next) => {
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