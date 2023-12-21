import express from 'express'
import passport from 'passport'
import { config } from './config/config.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { initializePassport } from './config/passport.config.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { logger } from './helpers/logger.js'

import { cartsRouter } from './routes/carts.routes.js'
import { productsRouter } from './routes/products.routes.js'
import { sessionsRouter } from './routes/sessions.routes.js'
import { usersRouter } from './routes/users.routes.js'

import './config/console.js'

const port = config.server.port
const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// servidor HTTP con express
app.listen(port, () => logger.info(`Server listening on port: ${port}`))

app.use(session({
  store: MongoStore.create({
    ttl: 3000,
    mongoUrl: config.mongo.url
  }),
  secret: config.server.secretSession,
  resave: true,
  saveUninitialized: true
}))

// configurar passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/users', usersRouter)

app.use('/testLogger', (req, res) => {
  logger.fatal('log fatal')
  logger.error('log error')
  logger.warning('log warning')
  logger.info('log info')
  logger.http('log http')
  logger.debug('log debug')
  res.send('Prueba de logger')
})

app.use(errorHandler)

// INVESTIGAR PM2
