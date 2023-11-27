import { Router } from 'express'
import { CATEGORY_TYPES } from '../constants.js'
import { ProductsService } from '../services/products.service.js'
import { CartsService } from '../services/carts.service.js'

const router = Router()

// vista del home
router.get('/', async (req, res) => {
  try {
    res.render('home')
  } catch (error) {
    console.log('Home view:', error)
    res.render('home', { error: 'Se produjo un error al cargar la página' })
  }
})

// vista de todos los productos y su filtrado por categorías
router.get('/products', async (req, res) => {
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
      category === CATEGORY_TYPES.processor ||
      category === CATEGORY_TYPES.graphicCard ||
      category === CATEGORY_TYPES.ramMemory ||
      category === CATEGORY_TYPES.storage
    ) {
      query.category = category
    }

    const result = await ProductsService.getProducts(query, options)
    const filteredProducts = result.docs.filter((prod) => prod.stock > 0)

    const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl

    const dataProducts = {
      payload: filteredProducts,
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
    res.render('products', dataProducts)
  } catch (error) {
    console.log('Products view', error)
    res.render('login')
  }
})

// vista del carrito
router.get('/cart/:cartId', async (req, res) => {
  try {
    const cartId = req.params.cartId
    const cart = await CartsService.getCart(cartId)
    const productsFromCart = cart.products
    res.render('cart', { products: productsFromCart })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  }
})

router.get('/login', async (req, res) => {
  try {
    res.render('login')
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  }
})

router.get('/signup', async (req, res) => {
  res.render('signup')
})

router.get('/profile', (req, res) => {
  res.render('profile')
})

export { router as viewsRouter }
