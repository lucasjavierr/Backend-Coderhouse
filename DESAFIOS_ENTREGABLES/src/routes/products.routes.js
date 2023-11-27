import { Router } from 'express'
import { ProductsController } from '../controllers/products.controller.js'

const router = Router()
// console.log('CAPA DE RUTAS')

router.get('/', ProductsController.getProducts)
router.get('/:productId', ProductsController.getProduct)
router.post('/', ProductsController.createProduct)
router.put('/:productId', ProductsController.updateProduct)
router.delete('/:productId', ProductsController.deleteProduct)

export { router as productsRouter }
