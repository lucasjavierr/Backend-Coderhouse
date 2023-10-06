import { Router } from 'express';
import { productsService } from '../dao/index.js';

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

router.get('/chat', async (req, res) => {
  res.render('chat');
});

export { router as viewsRouter };
