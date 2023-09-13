import { ProductManagerFiles } from './files/ProductManagerFiles.js';
import { CartsManager } from './files/CartManager.js';
import { __dirname } from '../utils.js';
import path from 'path';

export const productsService = new ProductManagerFiles(path.join(__dirname, '/files/products.json'));
export const cartsService = new CartsManager(path.join(__dirname, '/files/carts.json'));
