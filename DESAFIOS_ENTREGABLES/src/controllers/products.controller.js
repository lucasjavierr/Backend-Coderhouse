import { CATEGORY_TYPES } from '../enums/constants.js'
import { ProductsService } from '../services/products.service.js'
import { v4 as uuidv4 } from 'uuid'
import { generateProduct } from '../helpers/mock.js'
import { CustomError } from '../services/customError.service.js'
import { EError } from '../enums/EError.js'
import { createProductError } from '../services/errors/createProductError.service.js'

const products = []

export class ProductsController {
  static getProducts = async (req, res) => {
    try {
      const { limit = 10, page = 1, sort, category } = req.query
      const query = {}
      const options = {
        limit,
        page,
        lean: true
      }

      if (limit < 1) throw new Error('El limite ingresado debe ser mayor a 1')
      if (page < 1) throw new Error('La página ingresada debe ser mayor a 1')
      if (sort === 'asc') {
        options.sort = { price: 1 }
      }
      if (sort === 'desc') {
        options.sort = { price: -1 }
      }
      if (
        category === CATEGORY_TYPES.PROCESSOR ||
        category === CATEGORY_TYPES.GRAPHIC_CARD ||
        category === CATEGORY_TYPES.RAM_MEMORY ||
        category === CATEGORY_TYPES.STORAGE
      ) {
        query.category = category
      }

      // una vez pasan las verificaciones, obtengo los productos y los filtro según su stock
      const result = await ProductsService.getAllProducts(query, options)

      // obtengo la URL actual
      const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl

      // creo el objeto de la respuesta y se lo envío al cliente
      const dataProducts = {
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage
          ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}`
          : null,
        nextLink: result.hasNextPage
          ? baseUrl.includes('page')
            ? baseUrl.replace(`&page=${result.page}`, `&page=${result.nextPage}`)
            : baseUrl.concat(`&page=${result.nextPage}`)
          : null
      }
      return res.json({ status: 'success', dataProducts })
    } catch (error) {
      console.log('CONTROLLER PRODUCTS getProducts:', error)
      res.json({ status: 'error', message: error.message })
    }
  }

  static getProduct = async (req, res) => {
    try {
      const productId = req.params.productId
      const product = await ProductsService.getOneProduct(productId)
      if (!product) {
        throw new Error(`El producto con el ID '${productId}' no existe.`)
      }
      res.json({ status: 'success', data: product })
    } catch (error) {
      console.log('CONTROLLER PRODUCTS getProduct:', error)
      res.json({ status: 'error', message: error.message })
    }
  }

  static createProduct = async (req, res) => {
    try {
      const productInfo = req.body

      if (!productInfo) {
        CustomError.createError({
          name: 'Create product error',
          cause: createProductError(productInfo),
          message: 'Todos los campos deben estar completos',
          errorCode: EError.DATABASE_ERROR
        })
      }

      productInfo.code = uuidv4()
      const productCreated = await ProductsService.createProduct(productInfo)
      res.json({ status: 'success', data: productCreated })
    } catch (error) {
      console.log('CONTROLLER PRODUCTS createProduct:', error)
      res.json({ status: 'error', message: error.message })
    }
  }

  static updateProduct = async (req, res) => {
    try {
      const productId = req.params.productId
      const newInfoProduct = req.body
      const productUpdated = await ProductsService
        .updateProductInfo(productId, newInfoProduct)

      res.json({ status: 'success', data: productUpdated })
    } catch (error) {
      console.log('CONTROLLER PRODUCTS updateProduct:', error)
      res.json({ status: 'error', message: error.message })
    }
  }

  static deleteProduct = async (req, res) => {
    try {
      const productId = req.params.productId
      const productDeleted = await ProductsService.deleteProduct(productId)
      res.json({ status: 'succes', data: productDeleted })
    } catch (error) {
      console.log('CONTROLLER PRODUCTS deleteProduct:', error)
      res.json({ status: 'error', message: error.message })
    }
  }

  static mockingProducts = async (req, res) => {
    try {
      const { qtyProducts = 100 } = req.body
      for (let i = 0; i < qtyProducts; i++) {
        const newProduct = generateProduct()
        products.push(newProduct)
      }
      res.json({ status: 'success', products })
    } catch (error) {
      console.log('CONTROLLER PRODUCTS mockingProducts:', error)
      res.json({ status: 'error', message: error.message })
    }
  }
}
