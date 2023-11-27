import { Router } from 'express'
import { CartsController } from '../controllers/carts.controller.js'

const router = Router()

// http://localhost:8080/api/carts
router.get('/', CartsController.getCarts)
router.get('/:cartId', CartsController.getCart)
router.post('/', CartsController.createCart)
router.post('/:cartId/product/:productId', CartsController.addProductToCart)
router.put('/:cartId', CartsController.updateInfoToCart)
router.put('/:cartId/product/:productId', CartsController.updateProductQuantity)
router.delete('/:cartId', CartsController.clearCart)
router.delete('/:cartId/product/:productId', CartsController.deleteProductFromCart)

export { router as cartsRouter }
