import { Router } from 'express'
import { ProductsController } from '../controllers/products.controller.js'
import { checkRole } from '../middlewares/auth.js'
import { USER_ROLE_TYPES } from '../constants.js'

const router = Router()

// http://localhost:8080/api/products
router.get('/', ProductsController.getProducts)
router.get('/:productId', ProductsController.getProduct)
router.post('/', checkRole([USER_ROLE_TYPES.user]), ProductsController.createProduct)
router.put('/:productId', checkRole([USER_ROLE_TYPES.admin]), ProductsController.updateProduct)
router.delete('/:productId', checkRole([USER_ROLE_TYPES.admin]), ProductsController.deleteProduct)

export { router as productsRouter }
