import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from './config/config.js'

// creo y exporto la constante __dirname que hace referencia a la carpeta src
export const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

export const isValidPassword = (password, user) => {
  return bcrypt.compareSync(password, user.password)
}

export const generateToken = (user) => {
  const token = jwt.sign(
    { firstName: user.firstName, email: user.email, role: user.role },
    config.jwt.privateKey,
    { expiresIn: '24h' }
  )
  return token
}
