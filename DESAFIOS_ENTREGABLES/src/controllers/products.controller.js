import { CATEGORY_TYPES } from '../constants.js'
import { ProductsService } from '../services/products.service.js'

// console.log('CAPA DE CONTROLADORES')
export class ProductsController {
  static getProducts = async (req, res) => {
    try {
      // obtengo los valores de cada query
      const { limit = 10, page = 1, sort, category } = req.query

      // creo los objetos que se pasan como parámetros en la petición
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
        category === CATEGORY_TYPES.processor ||
        category === CATEGORY_TYPES.graphicCard ||
        category === CATEGORY_TYPES.ramMemory ||
        category === CATEGORY_TYPES.storage
      ) {
        query.category = category
      }

      // una vez pasan las verificaciones, obtengo los productos y los filtro según su stock
      const result = await ProductsService.getProducts(query, options)
      const filteredProducts = result.docs.filter((prod) => prod.stock > 0)

      // obtengo la URL actual
      const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl

      // creo el objeto de la respuesta y se lo envío al cliente
      const dataProducts = {
        payload: filteredProducts,
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
      console.log('--> ERROR ProductsController:', error)
      res.json({ status: 'error', message: error.message })
    }
  }

  static getProduct = async (req, res) => {
    try {
      const productId = req.params.productId
      const product = await ProductsService.getProduct(productId)
      if (!product) {
        throw new Error(`El producto con el ID '${productId}' no existe.`)
      }
      res.json({ status: 'success', data: product })
    } catch (error) {
      res.json({ status: 'error', message: error.message })
    }
  }

  static createProduct = async (req, res) => {
    try {
      const productInfo = req.body
      const productCreated = await ProductsService.createProduct(productInfo)
      res.json({ status: 'success', data: productCreated })
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message })
    }
  }

  static updateProduct = async (req, res) => {
    try {
      const productId = req.params.productId
      const newInfoProduct = req.body
      const productUpdated = await ProductsService.updateProduct(
        productId,
        newInfoProduct
      )
      res.json({ status: 'success', data: productUpdated })
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message })
    }
  }

  static deleteProduct = async (req, res) => {
    try {
      const productId = req.params.productId
      const productDeleted = await ProductsService.deleteProduct(productId)
      res.json({ status: 'succes', data: productDeleted })
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message })
    }
  }
}
