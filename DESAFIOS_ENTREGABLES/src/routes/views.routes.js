import { Router } from 'express'
import { ViewsController } from '../controllers/views.controller.js'
// import { checkRole, isAuth } from '../middlewares/auth.js'

const router = Router()

router.get('/', ViewsController.homeView)
router.get('/products', ViewsController.productsView)
router.get('/cart/:cartId', ViewsController.cartView)
router.get('/login', ViewsController.loginView)
router.get('/signup', ViewsController.signupView)
router.get('/profile', ViewsController.profileView)
router.get('/forgot-password', ViewsController.forgotPassword)

export { router as viewsRouter }
