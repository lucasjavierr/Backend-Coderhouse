import { CartsService } from '../services/carts.service.js'
import { ProductsService } from '../services/products.service.js'

export class CartsController {
  static getCarts = async (req, res) => {
    try {
      const carts = await CartsService.getCarts()
      res.json({ status: 'success', data: carts })
    } catch (error) {
      res.json({ status: 'error', message: error.message })
    }
  }

  static getCart = async (req, res) => {
    try {
      const cartId = req.params.cartId
      const cart = await CartsService.getCart(cartId)
      res.json({ status: 'success', data: cart })
    } catch (error) {
      res.json({ status: 'error', message: error.message })
    }
  }

  static createCart = async (req, res) => {
    try {
      const cartCreated = await CartsService.createCart()
      res.json({ status: 'success', data: cartCreated })
    } catch (error) {
      res.json({ status: 'error', message: error.message })
    }
  }

  static addProductToCart = async (req, res) => {
    try {
      const { cartId, productId } = req.params
      await CartsService.getCart(cartId)
      await ProductsService.getProduct(productId)

      const productAdded = await CartsService.addProductToCart(cartId, productId)
      res.json({ status: 'success', data: productAdded })
    } catch (error) {
      res.json({ status: 'error', message: error.message })
    }
  }

  static updateInfoToCart = async (req, res) => {
    try {
      const cartId = req.params.cartId
      const newCartInfo = req.body

      await CartsService.getCart(cartId)
      const newCart = await CartsService.updateCartInfo(cartId, newCartInfo)
      res.json({ status: 'success', data: newCart })
    } catch (error) {
      res.json({ status: 'error', message: error.message })
    }
  }

  static updateProductQuantity = async (req, res) => {
    try {
      // obtengo todos los datos ingresados
      const cartId = req.params.cartId
      const productId = req.params.productId
      const { newQuantity } = req.body

      // verifico si el carrito y el producto existen
      await CartsService.getCart(cartId)
      await ProductsService.getProduct(productId)

      // realizo la operacion de actualizar la cantidad
      const productUpdated = await CartsService.updateProductQuantity(
        cartId,
        productId,
        newQuantity
      )

      // respondo al cliente con esa operacion realizada
      res.json({ status: 'success', data: productUpdated })
    } catch (error) {
      res.json({ status: 'error', message: error.message })
    }
  }

  static clearCart = async (req, res) => {
    try {
      const cartId = req.params.cartId
      const cartDeleted = await CartsService.clearCart(cartId)
      res.json({ status: 'success', data: cartDeleted })
    } catch (error) {
      res.json({ status: 'error', message: error.message })
    }
  }

  static deleteProductFromCart = async (req, res) => {
    try {
      const { cartId, productId } = req.params
      await CartsService.getCart(cartId)
      await ProductsService.getProduct(productId)

      const newProducts = await CartsService.deleteProductFromCart(cartId, productId)
      res.json({ status: 'success', data: newProducts })
    } catch (error) {
      res.json({ status: 'error', message: error.message })
    }
  }
}
