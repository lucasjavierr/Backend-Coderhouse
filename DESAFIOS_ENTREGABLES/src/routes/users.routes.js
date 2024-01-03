import { Router } from 'express'
import { UsersController } from '../controllers/users.controller.js'
import { checkRole, isAuth } from '../middlewares/auth.js'
import { USER_ROLE_TYPES } from '../enums/constants.js'

const router = Router()

router.get( '/:userId', isAuth, UsersController.getUser )
router.put( '/premium/:userId', isAuth, checkRole( [ USER_ROLE_TYPES.ADMIN ] ), UsersController.modifyRole )

export { router as usersRouter }
