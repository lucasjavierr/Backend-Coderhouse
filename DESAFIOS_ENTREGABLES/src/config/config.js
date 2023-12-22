import dotenv from 'dotenv'
import { Command } from 'commander'

dotenv.config()

const serve = new Command()

serve
  .option('-p, --persistence <persistence>', 'Tipo de persistencia de datos que utiliza la aplicación')
  .option('--env, <environment>', 'Entorno en el cual se ejecuta la aplicación')

serve.parse()
const options = serve.opts()
process.env.NODE_ENVIRONMENT = options.env
process.env.PERSISTENCE = options.persistence

export const config = {
  server: {
    port: process.env.PORT,
    secretSession: process.env.SECRET_SESSION,
    persistence: process.env.PERSISTENCE,
    env: process.env.NODE_ENVIRONMENT
  },
  mongo: {
    url: process.env.MONGO_URL
  },
  admin: {
    email: process.env.APP_EMAIL_ADMIN,
    password: process.env.APP_PASSWORD_ADMIN
  },
  gmail: {
    account: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASS,
    secretToken: process.env.TOKEN_EMAIL
  }
}
