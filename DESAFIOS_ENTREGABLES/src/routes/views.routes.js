import { Router } from 'express'
import { ViewsController } from '../controllers/views.controller.js'
import { USER_ROLE_TYPES } from '../enums/constants.js'
import { checkRole, isAuth } from '../middlewares/auth.js'

const router = Router()

router.get('/', ViewsController.homeView)
router.get('/products', ViewsController.productsView)
router.get('/realTime', isAuth, ViewsController.realTime)
router.get('/cart/:cartId', ViewsController.cartView)
router.get('/login', ViewsController.loginView)
router.get('/signup', ViewsController.signupView)
router.get('/profile', isAuth, ViewsController.profileView)
router.get('/forgot-password', ViewsController.forgotPassword)

export { router as viewsRouter }
