import { CartsService } from '../services/carts.service.js'
import { ProductsService } from '../services/products.service.js'
import { TicketsService } from '../services/tickets.service.js'
import { v4 as uuidv4 } from 'uuid'

export class CartsController {
  static getCarts = async (req, res) => {
    try {
      const carts = await CartsService.getAllCarts()
      res.json({ status: 'success', data: carts })
    } catch (error) {
      console.log('CONTROLLER CARTS getCarts:', error)
      res.status(500).json({ error: error.message })
    }
  }

  static getCart = async (req, res) => {
    try {
      const { cartId } = req.params
      const cart = await CartsService.getOneCart(cartId)
      res.json({ status: 'success', data: cart })
    } catch (error) {
      console.log('CONTROLLER CARTS getCart:', error)
      res.status(500).json({ error: error.message })
    }
  }

  static createCart = async (req, res) => {
    try {
      const cartCreated = await CartsService.createCart()
      res.json({ status: 'success', data: cartCreated })
    } catch (error) {
      console.log('CONTROLLER CARTS createCart:', error)
      res.status(500).json({ error: error.message })
    }
  }

  static addProductToCart = async (req, res) => {
    try {
      const { cartId, productId } = req.params

      // verifico si producto y carrito existen
      await CartsService.getOneCart(cartId)
      await ProductsService.getOneProduct(productId)

      const productAdded = await CartsService.addProductToCart(cartId, productId)
      res.json({ status: 'success', data: productAdded })
    } catch (error) {
      console.log('CONTROLLER CARTS addProductToCart:', error)
      res.status(500).json({ error: error.message })
    }
  }

  static updateInfoToCart = async (req, res) => {
    try {
      const cartId = req.params.cartId
      const newCartInfo = req.body

      await CartsService.getOneCart(cartId)
      const newCart = await CartsService.updateCartInfo(cartId, newCartInfo)
      res.json({ status: 'success', data: newCart })
    } catch (error) {
      console.log('CONTROLLER CARTS updateInfoToCart:', error)
      res.status(500).json({ error: error.message })
    }
  }

  static updateProductQuantity = async (req, res) => {
    try {
      const { cartId, productId } = req.params
      const { newQuantity } = req.body

      // verifico si producto y carrito existen
      await CartsService.getOneCart(cartId)
      await ProductsService.getOneProduct(productId)

      // realizo la operacion de actualizar la cantidad
      const productUpdated = await CartsService
        .updateProductQuantity(cartId, productId, newQuantity)

      res.json({ status: 'success', data: productUpdated })
    } catch (error) {
      console.log('CONTROLLER CARTS updateProductQuantity:', error)
      res.status(500).json({ error: error.message })
    }
  }

  static clearCart = async (req, res) => {
    try {
      const { cartId } = req.params
      const cartDeleted = await CartsService.clearCart(cartId)
      res.json({ status: 'success', data: cartDeleted })
    } catch (error) {
      console.log('CONTROLLER CARTS clearCart:', error)
      res.status(500).json({ error: error.message })
    }
  }

  static deleteProductFromCart = async (req, res) => {
    try {
      const { cartId, productId } = req.params
      await CartsService.getOneCart(cartId)
      await ProductsService.getOneProduct(productId)

      const newProducts = await CartsService.deleteProductFromCart(cartId, productId)
      res.json({ status: 'success', data: newProducts })
    } catch (error) {
      console.log('CONTROLLER CARTS deleteProductFromCart:', error)
      res.status(500).json({ error: error.message })
    }
  }

  static purchaseCart = async (req, res) => {
    try {
      const { cartId } = req.params
      const cart = await CartsService.getOneCart(cartId)

      // verificar que el carrito tenga productos
      if (cart.products.length <= 0) return res.json({ status: 'error', message: 'El carrito esta vacío' })

      const ticketProducts = []
      const rejectedProducts = []

      // verificar el stock de los productos
      for (let i = 0; i < cart.products.length; i++) {
        const productInCart = cart.products[i]
        const productInfo = productInCart.productId

        if (productInCart.quantity <= productInfo.stock) {
          ticketProducts.push(productInCart)
          productInfo.stock -= productInCart.quantity

          // actualizo el stock de los productos en DB
          await ProductsService.updateProductInfo(productInfo._id, productInfo)
        } else {
          rejectedProducts.push(productInCart)
        }
      }
      // console.log('ticketProducts', ticketProducts)
      // console.log('rejectedProducts', rejectedProducts)

      const newTicket = {
        code: uuidv4(),
        purchase_datetime: new Date(),
        // eslint-disable-next-line no-return-assign
        amount: ticketProducts.reduce((acc, curr) => acc += curr.quantity * curr.productId.price, 0),
        purchaser: req.user.email
      }
      // crear el ticket en la DB
      const ticket = await TicketsService.createTicket(newTicket)
      console.log(newTicket)
      console.log('ticket DB', ticket)

      // actualizar el carrito con los productos rechazados
      // si es un array vacío, significa que todos los productos se compraron
      // por ende, el carrito quedaria vacío tambien
      await CartsService.updateCartInfo(cartId, rejectedProducts)

      if (rejectedProducts.length >= 1) {
        return res.json({ status: 'success', message: 'Compra realizada, algunos productos no se pudieron comprar por falta de stock', rejectedProducts })
      }
      res.json({ status: 'success', message: 'Compra realizada de forma exitosa' })
    } catch (error) {
      console.log('CONTROLLER CARTS purchaseCart:', error)
      res.status(500).json({ status: 'error', message: error.message })
    }
  }
}
