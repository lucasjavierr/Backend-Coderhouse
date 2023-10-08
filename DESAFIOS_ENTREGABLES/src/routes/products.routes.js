import { Router } from 'express';
import { productsService } from '../dao/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await productsService.getProducts();

    // si tiene limite, devuelvo los productos con ese limite
    if (limit) {
      const productsLimit = await productsService.getProducts(limit);
      return res.json({ status: 'success', data: productsLimit });
    }

    // sino, devuelvo todos los productos
    res.json({ status: 'success', data: products });
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
    const productInfoToUpdate = req.body;
    const productUpdated = await productsService.updateProduct(productId, productInfoToUpdate);
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
