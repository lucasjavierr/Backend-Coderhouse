import { Router } from 'express';
import { cartsService, productsService } from '../dao/index.js';

const router = Router();

// vista del home
router.get('/', async (req, res) => {
  try {
    res.render('home');
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// vista de todos los productos y su filtrado por categorías
router.get('/products', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, category } = req.query;

    const query = {};

    const options = {
      limit,
      page,
      lean: true
    };

    if (typeof limit !== 'number' || typeof page !== 'number') throw new Error('Los valores de page y limit deben ser de tipo numérico');

    if (limit < 1) throw new Error('El limite ingresado debe ser mayor a 1');
    if (page < 1) throw new Error('La página ingresada debe ser mayor a 1');

    if (sort === 'asc') {
      options.sort = { price: 1 };
    }
    if (sort === 'desc') {
      options.sort = { price: -1 };
    }

    if (category === 'processor' ||
      category === 'graphic-card' ||
      category === 'ram-memory' ||
      category === 'storage') {
      query.category = category;
    }

    const result = await productsService.getProducts(query, options);

    const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    const filteredProducts = result.docs.filter((prod) => prod.stock > 0);

    const dataProducts = {
      status: 'success',
      payload: filteredProducts,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
      nextLink: result.hasNextPage ? baseUrl.includes('page') ? baseUrl.replace(`&page=${result.page}`, `&page=${result.nextPage}`) : baseUrl.concat(`&page=${result.nextPage}`) : null
    };
    res.render('products', dataProducts);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

/* router.get('/realTimeProducts', (req, res) => {
  res.render('realTime');
});

router.get('/chat', async (req, res) => {
  res.render('chat');
}); */

// vista del carrito
router.get('/cart/:cartId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await cartsService.getCartById(cartId);
    const productsFromCart = cart.products;
    res.render('cart', { products: productsFromCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export { router as viewsRouter };
