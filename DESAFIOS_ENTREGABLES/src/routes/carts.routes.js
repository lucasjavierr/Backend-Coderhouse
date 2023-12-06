import { Router } from 'express'
import { checkRole } from '../middlewares/auth.js'
import { CartsController } from '../controllers/carts.controller.js'
import { USER_ROLE_TYPES } from '../constants.js'

const router = Router()

// http://localhost:8080/api/carts
router.get('/', CartsController.getCarts)
router.get('/:cartId', CartsController.getCart)
router.post('/', CartsController.createCart)
router.post('/:cartId/product/:productId', checkRole([USER_ROLE_TYPES.admin]), CartsController.addProductToCart)
router.post('/:cartId/purchase', CartsController.purchaseCart)
router.put('/:cartId', CartsController.updateInfoToCart)
router.put('/:cartId/product/:productId', CartsController.updateProductQuantity)
router.delete('/:cartId', CartsController.clearCart)
router.delete('/:cartId/product/:productId', CartsController.deleteProductFromCart)

export { router as cartsRouter }
