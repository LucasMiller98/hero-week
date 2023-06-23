import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { secretKeyToken } from "../utils/secretKeyToken";
import { Ipayload } from '../interfaces/UsersInterface'

export class AuthMiddleware {
  constructor() {}

  auth(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if(!authorization) {
      return res.status(401).json({
        code: 'token.missing',
        message: 'Token missing'
      })
    }

    const [_, token] = authorization.split(' ')

    const secretKey = secretKeyToken()

    try {
      const { sub } = verify(token, secretKey) as Ipayload
      req.user_id = sub
      return next()
    } catch (error) {
      return res.status(401).json({
        code: 'token.expired',
        message: 'Token expired'
      })
    }
  }
}