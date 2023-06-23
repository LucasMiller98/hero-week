import { NextFunction, Request, Response } from "express";
import { 
  IAuth as ILogin,
  IRequestCreateUsers, 
  IUpdateUser 
} from '../interfaces/UsersInterface'
import { UsersService } from "../service/UsersService";

export class UsersController {

  private usersService: UsersService 

  constructor() {
    this.usersService = new UsersService()
  }
  
  async index(req: Request, res: Response, next: NextFunction) {
    
  }

  async show(req: Request, res: Response, next: NextFunction) {

  }

  async store(req: Request, res: Response, next: NextFunction) {

    const { name, email, password } = req.body as IRequestCreateUsers
    
    try {
      const result = await this.usersService.create({ name, email, password })

      return res.status(201).json(result)
      
    } catch (error) {
      next(error)
    }
  }

  async auth(req: Request, res: Response, next: NextFunction) {

    const { email, password } = req.body as ILogin
    
    try {
      const result = await this.usersService.auth(email, password)

      return res.json(result)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { name, oldPassword, newPassword } = req.body as IUpdateUser
    const { user_id } = req
    
    try {
      

      const result = await this.usersService.update({ 
        name, 
        oldPassword, 
        newPassword, 
        avatar_url: req.file,
        user_id 
      })

      return res.status(200).json(result)
      
    } catch (error) {
      next(error)
    }
  }
}