// import { ProductsManagerFiles } from './managers/files/products.files.js'
// import { CartsManagerFiles } from './managers/files/cart.files.js'
// import { __dirname } from '../utils.js'
// import path from 'node:path'
import { ProductsManagerMongo } from './managers/mongo/products.mongo.js'
import { CartsManagerMongo } from './managers/mongo/carts.mongo.js'
import { UsersManagerMongo } from './managers/mongo/users.mongo.js'

// console.log('CAPA DE GENERACION DE INSTANCIAS')
export const productsDao = new ProductsManagerMongo()
export const cartsDao = new CartsManagerMongo()
export const usersDao = new UsersManagerMongo()

// 00:35:00
