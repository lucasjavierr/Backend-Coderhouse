import { cartsDao } from '../dao/index.js'

export class CartsService {
  static getCarts = async () => {
    return cartsDao.getCarts()
  }

  static getCart = async (cartId) => {
    return cartsDao.getCartById(cartId)
  }

  static createCart = async () => {
    return cartsDao.createCart()
  }

  static addProductToCart = async (cartId, productId) => {
    return cartsDao.addProduct(cartId, productId)
  }

  static updateCartInfo = async (cartId, newCartInfo) => {
    return cartsDao.updateCart(cartId, newCartInfo)
  }

  static updateProductQuantity = async (cartId, productId, newQuantity) => {
    return cartsDao.updateProductQuantity(cartId, productId, newQuantity)
  }

  static deleteProductFromCart = async (cartId, productId) => {
    return cartsDao.deleteProduct(cartId, productId)
  }

  static clearCart = async (cartId) => {
    return cartsDao.clearCart(cartId)
  }

  static deleteCart = async (cartId) => {
    return cartsDao.deleteCart(cartId)
  }
}
