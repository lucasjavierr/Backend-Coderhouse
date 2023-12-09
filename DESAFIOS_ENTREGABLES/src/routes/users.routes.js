import { Router } from 'express'
import { UsersController } from '../controllers/users.controller.js'

const router = Router()

router.get('/:userId', UsersController.getUser)

export { router as usersRouter }
