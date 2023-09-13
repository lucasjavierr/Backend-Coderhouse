import { Router } from 'express';
import { productsService } from '../persistence/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await productsService.getProducts();

    // si tiene limite, devuelvo los productos con ese limite
    if (limit) {
      const productsLimit = products.slice(0, limit);
      return res.json({ data: productsLimit });
    }

    // sino, devuelvo todos los productos
    res.json({ data: products });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

router.get('/:productId', async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const product = await productsService.getProductById(productId);
    res.json({ data: product });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const productInfo = req.body;
    await productsService.createProduct(productInfo);
    res.json({ message: 'Producto creado correctamente' });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

router.put('/:productId', async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const productInfoToUpdate = req.body;
    await productsService.updateProduct(productId, productInfoToUpdate);
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

router.delete('/:productId', async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    await productsService.deleteProduct(productId);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

export { router as productsRouter };
