import { Router } from 'express'
import { ProductsController } from '../controllers/products.controller.js'
import { isAuth, checkRole } from '../middlewares/auth.js'
import { USER_ROLE_TYPES } from '../enums/constants.js'

const router = Router()

// http://localhost:8080/api/products
router.get('/', ProductsController.getProducts)
router.get('/:productId', ProductsController.getProduct)
router.post('/', isAuth, checkRole([USER_ROLE_TYPES.ADMIN]), ProductsController.createProduct)
router.put('/:productId', isAuth, checkRole([USER_ROLE_TYPES.ADMIN]), ProductsController.updateProduct)
router.delete('/:productId', isAuth, checkRole([USER_ROLE_TYPES.ADMIN]), ProductsController.deleteProduct)

// mocking
router.post('/mockingproducts/', ProductsController.mockingProducts)

export { router as productsRouter }
