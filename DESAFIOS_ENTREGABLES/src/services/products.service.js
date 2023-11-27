import { productsDao } from '../dao/index.js'

// console.log('CAPA DE SERVICIO')
export class ProductsService {
  static getProducts = async (query, options) => {
    return productsDao.getProducts(query, options)
  }

  static getProduct = async (productId) => {
    return productsDao.getProductById(productId)
  }

  static createProduct = async (productInfo) => {
    return productsDao.createProduct(productInfo)
  }

  static updateProduct = async (productId, newProductInfo) => {
    return productsDao.updateProduct(productId, newProductInfo)
  }

  static deleteProduct = async (productId) => {
    return productsDao.deleteProduct(productId)
  }
}
