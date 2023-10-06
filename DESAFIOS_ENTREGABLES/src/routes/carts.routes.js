import { Router } from 'express';
import { cartsService } from '../dao/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const carts = await cartsService.getCarts();
    res.json({ status: 'success', data: carts });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

router.get('/:cartId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await cartsService.getCartById(cartId);
    res.json({ status: 'success', data: cart });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const cartCreated = await cartsService.createCart();
    res.json({ status: 'success', data: cartCreated });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

router.put('/:cartId/product/:productId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const productAdded = await cartsService.addProductToCart(cartId, productId);
    res.json({ status: 'success', data: productAdded });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

router.delete('/:cartId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productAdded = await cartsService.deleteCart(cartId);
    res.json({ status: 'success', data: productAdded });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

export { router as cartsRouter };
