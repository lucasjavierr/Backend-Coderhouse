// import { ProductManagerFiles } from './ProductManagerFiles.js';
// import { ProductsManagerFiles } from './files/ProductManagerFiles.js';
// import { CartsManagerFiles } from './files/CartManager.js';
// import { __dirname } from '../utils.js';
// import path from 'path';
import { ProductsManagerMongo } from './mongo/productsManagerMongo.js';
import { CartsManagerMongo } from './mongo/cartsManagerMongo.js';
import { ChatManagerMongo } from './mongo/chatManagerMongo.js';

export const productsService = new ProductsManagerMongo();
export const cartsService = new CartsManagerMongo();
export const chatService = new ChatManagerMongo();
// 49:40
