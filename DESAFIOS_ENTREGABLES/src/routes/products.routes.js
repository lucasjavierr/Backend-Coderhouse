import { Router } from 'express';
import { productsService } from '../dao/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, category } = req.query;

    const query = {};

    const options = {
      limit,
      page,
      lean: true
    };

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

    const dataProducts = {
      status: 'success',
      payload: result.docs,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
      nextLink: result.hasNextPage ? baseUrl.includes('page') ? baseUrl.replace(`&page=${result.page}`, `&page=${result.nextPage}`) : baseUrl.concat(`&page=${result.nextPage}`) : null
    };
    return res.json({ status: 'success', dataProducts });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await productsService.getProductById(productId);
    if (!product) throw new Error(`El producto con el ID '${productId}' no existe.`);
    res.json({ status: 'success', data: product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const productInfo = req.body;
    const productCreated = await productsService.createProduct(productInfo);
    res.json({ status: 'success', data: productCreated });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.put('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const newInfoProduct = req.body;
    const productUpdated = await productsService.updateProduct(productId, newInfoProduct);
    res.json({ status: 'success', data: productUpdated });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
});

router.delete('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const productDeleted = await productsService.deleteProduct(productId);
    res.json({ status: 'succes', data: productDeleted });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
});

export { router as productsRouter };
