import { cartsModel } from '../models/carts.model.js';

export class CartsManagerMongo {
  constructor () {
    this.model = cartsModel;
  }

  async getCarts () {
    try {
      const carts = await this.model.find().populate('products.productId');
      if (carts.length === 0) throw new Error('No hay carritos creados hasta el momento.');
      return carts;
    } catch (error) {
      console.log('getCarts:', error.message);
      throw new Error('No se pudieron obtener los carritos.');
    }
  }

  async getCartById (cartId) {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) throw new Error(`El carrito con el ID: '${cartId}' no existe.`);
      return cart;
    } catch (error) {
      console.log('getCartById:', error.message);
      throw new Error('No se pudo encontrar el carrito.');
    }
  }

  async createCart (cartInfo) {
    try {
      const cart = await this.model.create(cartInfo);
      return cart;
    } catch (error) {
      console.log('createCart:', error.message);
      throw new Error('No se pudo crear el carrito.');
    }
  }

  async addProductToCart (cartId, productId) {
    try {
      const cart = await this.getCartById(cartId);
      if (!cart) throw new Error(`El carrito con el ID: '${cartId}' no existe.`);

      const productIndex = cart.products.findIndex((prod) => prod.productId.toString() === productId);
      console.log(productIndex);

      // si el producto no existe en el carrito, lo agrega
      if (productIndex === -1) {
        cart.products.push({ productId, quantity: 1 });
      } else {
        cart.products[productIndex].quantity++;
      }

      const updateCart = await this.model.findByIdAndUpdate(
        cartId,
        { $set: { products: cart.products } },
        { new: true }
      ).populate('products.productId');

      return updateCart;
    } catch (error) {
      console.log('addProductToCart:', error.message);
      throw new Error('No se pudo agregar el producto al carrito.');
    }
  }

  async deleteCart (cartId) {
    try {
      const cartdeleted = await this.model.findByIdAndDelete(cartId);
      if (!cartdeleted) throw new Error(`El carrito con el ID: '${cartId}' no existe.`);
      return cartdeleted;
    } catch (error) {
      console.log('deleteCart:', error.message);
      throw new Error('No se pudo eliminar el carrito.');
    }
  }
}
