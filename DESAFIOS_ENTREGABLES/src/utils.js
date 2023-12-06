import bcrypt from 'bcrypt'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// exporto la constante __dirname que hace referencia a la carpeta src
export const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

export const isValidPassword = (password, user) => {
  return bcrypt.compareSync(password, user.password)
}
