import express from 'express';
import { productsRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';

const PORT = 8080;
const app = express();

app.listen(PORT, () => console.log('Server working'));

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
