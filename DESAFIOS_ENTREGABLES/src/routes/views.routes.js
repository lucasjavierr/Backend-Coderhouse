import { Router } from 'express';
import { productsService } from '../managers/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await productsService.getProducts();
    // console.log('products', products);
    res.render('home', { products });
  } catch (error) {
    throw error;
  }
});

router.get('/realTimeProducts', (req, res) => {
  res.render('realTime');
});

export { router as viewsRouter };
