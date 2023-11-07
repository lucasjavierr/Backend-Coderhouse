import express from 'express';
import { __dirname } from './utils.js';
import path from 'path';
import { engine } from 'express-handlebars';
import { connectDB } from './config/dbConnection.js';
import passport from 'passport';
import { initializePassport } from './config/passport.config.js';
import cookieParser from 'cookie-parser';

import { viewsRouter } from './routes/views.routes.js';
import { productsRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import { sessionsRouter } from './routes/sessions.routes.js';

const port = process.env.PORT || 8080;
const app = express();

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

// servidor HTTP con express
app.listen(port, () => console.log(`Server working on port: ${port}`));

// conexion a base de datos
connectDB();

// configuración handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

// configurar passport
initializePassport();
app.use(passport.initialize());

// routes
app.use(viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);
