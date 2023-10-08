import { productsModel } from '../models/products.model.js';

export class ProductsManagerMongo {
  constructor () {
    this.model = productsModel;
  }

  async getProducts (limit) {
    try {
      if (limit) {
        const productsWithLimit = await this.model.find().limit(limit).lean();
        return productsWithLimit;
      }
      const products = await this.model.find().lean();
      return products;
    } catch (error) {
      console.log('getProducts:', error.message);
      throw new Error('No se pudo obtener los productos.');
    }
  }

  async getProductById (productId) {
    try {
      const product = await this.model.findById(productId);
      return product;
    } catch (error) {
      console.log('getProductById:', error.message);
      throw new Error('No se pudo encontrar el producto.');
    }
  }

  async createProduct (productInfo) {
    try {
      const result = await this.model.create(productInfo);
      return result;
    } catch (error) {
      console.log('createProduct:', error.message);
      throw new Error('No se pudo crear el producto.');
    }
  }

  async updateProduct (productId, newProductInfo) {
    try {
      const result = await this.model.findByIdAndUpdate(productId, newProductInfo, { new: true });
      if (!result) throw new Error('No se pudo encontrar el producto a actualizar.');
      return result;
    } catch (error) {
      console.log('updateProduct:', error.message);
      throw new Error('No se pudo actualizar el producto.');
    }
  }

  async deleteProduct (productId) {
    try {
      const result = await this.model.findByIdAndDelete(productId);
      if (!result) throw new Error('No se pudo encontrar el producto a eliminar.');
      return result;
    } catch (error) {
      console.log('deletProduct:', error.message);
      throw new Error('No se pudo eliminar el producto.');
    }
  }
}
