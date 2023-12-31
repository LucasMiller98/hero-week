import { Router } from 'express'
import { UsersController } from '../controllers/UsersController'
import { upload } from '../config/multer'
import { AuthMiddleware } from '../middlewares/AuthMiddleware'

export class UsersRoutes {

  private router: Router
  private usersController: UsersController
  private authMiddleware: AuthMiddleware
  
  constructor() {
    this.router = Router()
    this.usersController = new UsersController()
    this.authMiddleware = new AuthMiddleware()
  }
  
  getRoutes(): Router {

    this.router.get(
      '/findAll', 
      this.usersController.index.bind(this.usersController)
    )
    
    this.router.post(
      '/create',
      this.usersController.store.bind(this.usersController)
    )
    
    this.router.post(
      '/auth',
      this.usersController.auth.bind(this.usersController)
    )

    this.router.put(
      '/edit', 
      upload.single('avatar_url'),
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.usersController.update.bind(this.usersController)
    )
    
    this.router.post(
      '/refresh',
      this.usersController.refreshToken.bind(this.usersController)
    )

    return this.router
  }
}