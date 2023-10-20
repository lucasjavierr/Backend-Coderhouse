// import { ProductManagerFiles } from './ProductManagerFiles.js';
// import { ProductsManagerFiles } from './files/ProductManagerFiles.js';
// import { CartsManagerFiles } from './files/CartManager.js';
// import { __dirname } from '../utils.js';
// import path from 'path';
import { ProductsManagerMongo } from './managers/productsManagerMongo.js';
import { CartsManagerMongo } from './managers/cartsManagerMongo.js';
import { UsersManagerMongo } from './managers/usersManagerMongo.js';

export const productsService = new ProductsManagerMongo();
export const cartsService = new CartsManagerMongo();
export const usersService = new UsersManagerMongo();
