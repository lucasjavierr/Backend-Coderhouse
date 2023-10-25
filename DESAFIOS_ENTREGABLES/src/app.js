import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { engine } from 'express-handlebars';
import { __dirname } from './utils.js';
import path from 'path';
import { connectDB } from './config/dbConnection.js';
import passport from 'passport';
import { initializePassport } from './config/passport.config.js';
import { config } from './config/config.js';

import { productsRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import { sessionsRouter } from './routes/sessions.routes.js';
import { viewsRouter } from './routes/views.routes.js';

const port = process.env.PORT || 8080;
const app = express();

// middlewares
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// servidor HTTP con express
app.listen(port, () => console.log(`Server working on port: ${port}`));

// conexion a base de datos
connectDB();

// configuración handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

// configuracion de session
app.use(session({
  store: MongoStore.create({
    ttl: 3600,
    mongoUrl: config.mongo.url
  }),
  secret: config.server.secretSession,
  resave: true,
  saveUninitialized: true
}));

// configurar passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);
