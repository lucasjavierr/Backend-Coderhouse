import { Router } from 'express';
import { cartsService, productsService } from '../dao/index.js';

const router = Router();

// obtener todos los carritos
router.get('/', async (req, res) => {
  try {
    const carts = await cartsService.getCarts();
    res.json({ status: 'success', data: carts });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

// obtener un carrito por el ID
router.get('/:cartId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await cartsService.getCartById(cartId);
    res.json({ status: 'success', data: cart });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

// crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const cartCreated = await cartsService.createCart();
    res.json({ status: 'success', data: cartCreated });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

// agregar un producto al carrito
router.post('/:cartId/product/:productId', async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    await cartsService.getCartById(cartId);
    await productsService.getProductById(productId);

    const productAdded = await cartsService.addProduct(cartId, productId);
    res.json({ status: 'success', data: productAdded });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

// actualizar la informacion de un carrito segun un array ingresado por el body
router.put('/:cartId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const newCartInfo = req.body;

    await cartsService.getCartById(cartId);
    const newCart = await cartsService.updateCart(cartId, newCartInfo);
    res.json({ status: 'success', data: newCart });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

// actualiza la cantidad de un producto que ya existe en el carrito, segun lo ingresado por el body
router.put('/:cartId/product/:productId', async (req, res) => {
  try {
    // obtengo todos los datos ingresados
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const { newQuantity } = req.body;

    // verifico si el carrito y el producto existen
    await cartsService.getCartById(cartId);
    await productsService.getProductById(productId);

    // realizo la operacion de actualizar la cantidad
    const productUpdated = await cartsService.updateProductQuantity(cartId, productId, newQuantity);

    // respondo al cliente con esa operacion realizada
    res.json({ status: 'success', data: productUpdated });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

// eliminar un carrito (vaciar carrito)
router.delete('/:cartId', async (req, res) => {
  try {
    const cartId = req.params.cartId;

    // ------------------------------------------------------------
    // aca no entendi si debia eliminar los objetos del array de cart.products
    // o si tenia que eliminar el documento completo de todo el carrito
    // dejé las dos formas por si acaso
    // cleanCart elimina todos los elementos del array cart.products
    // deleteCart elimina todo el documento como tal
    // ------------------------------------------------------------
    const cartDeleted = await cartsService.clearCart(cartId);
    // const cartDeleted = await cartsService.deleteCart(cartId);
    res.json({ status: 'success', data: cartDeleted });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

// eliminar solo un producto de un carrito
router.delete('/:cartId/product/:productId', async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    await cartsService.getCartById(cartId);
    await productsService.getProductById(productId);

    const newProducts = await cartsService.deleteProduct(cartId, productId);
    res.json({ status: 'success', data: newProducts });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

export { router as cartsRouter };
