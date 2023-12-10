import { UsersDto } from '../DTOs/users.dto.js'
import { CustomError } from '../services/customError.service.js'
import { EError } from '../enums/EError.js'
import { authError } from '../services/errors/authError.service.js'

export class SessionsController {
  static signup = (req, res) => {
    res.json({ message: 'Usuario registrado de forma exitosa' })
  }

  static failSignup = (req, res) => {
    res.status(500).json({ error: 'No se pudo registrar al usuario' })
  }

  static failLogin = (req, res) => {
    CustomError.createError({
      name: 'Auth error',
      cause: authError(),
      message: 'Credenciales inválidas',
      errorCode: EError.AUTH_ERROR
    })
    res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' })
  }

  static currentUser = (req, res) => {
    const userDto = new UsersDto(req.user)
    res.json({ status: 'success', user: userDto })
  }

  static login = (req, res) => {
    res.json({ message: 'Iniciaste sesión correctamente!' })
  }

  static logout = async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: 'No se pudo cerrar la sesión' })
        res.status(200).json({ message: 'Sesion cerrada' })
      })
    } catch (error) {

    }
  }
}
