import dotenv from 'dotenv'
import { Command } from 'commander'

dotenv.config()

const serve = new Command()

serve
  .option('-p, --persistence <persistence>', 'Tipo de persistencia de datos que utiliza la aplicación')
  .option('--env, <environment>', 'Entorno en el cual se ejecuta la aplicación')

serve.parse()
const options = serve.opts()

export const config = {
  server: {
    port: process.env.PORT,
    secretSession: process.env.SECRET_SESSION,
    persistence: options.persistence,
    env: options.env
  },
  mongo: {
    url: process.env.MONGO_URL
  },
  admin: {
    email: process.env.USER_EMAIL_ADMIN,
    password: process.env.USER_PASSWORD_ADMIN
  }
}
