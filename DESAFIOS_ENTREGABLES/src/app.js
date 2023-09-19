import express from 'express';
import { __dirname } from './utils.js';
import path from 'path';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { productsService } from './managers/index.js';

import { productsRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import { viewsRouter } from './routes/views.routes.js';

const port = process.env.PORT || 8080;
const app = express();

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// servidor HTTP con express
const httpServer = app.listen(port, () => console.log(`Server working on port: ${port}`));

// servidor con websocket
const io = new Server(httpServer);

// configuración handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

// routes
app.use(viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// socket servidor
io.on('connection', async (socket) => {
  console.log('cliente conectado');
  const products = await productsService.getProducts();
  socket.emit('allProducts', products);

  // recibir los datos del cliente para crear el producto
  socket.on('addProduct', async (productData) => {
    const result = await productsService.createProduct(productData);
    const products = await productsService.getProducts();
    socket.emit('allProducts', products);
  });

  socket.on('productId', async (idProduct) => {
    const productsUpdated = await productsService.deleteProduct(idProduct);
    const products = await productsService.getProducts();
    socket.emit('allProducts', products);
  });
});
