import { Router } from 'express'
import { UsersController } from '../controllers/users.controller.js'
import { isAuth } from '../middlewares/auth.js'

const router = Router()

router.get( '/:userId', isAuth, UsersController.getUser )

export { router as usersRouter }
