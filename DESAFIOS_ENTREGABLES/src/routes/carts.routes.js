import { Router } from 'express';
import { cartsService } from '../managers/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const carts = await cartsService.getCarts();
    res.json({ data: carts });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

router.get('/:cartId', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cartId);
    const cart = await cartsService.getCartById(cartId);
    res.json({ data: cart });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    await cartsService.createCart();
    res.json({ message: 'Carrito creado correctamente' });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

router.post('/:cartId/product/:productId', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cartId);
    const productId = parseInt(req.params.productId);
    const productAdded = await cartsService.addProductToCart(cartId, productId);
    res.json({ data: productAdded });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

export { router as cartsRouter };
