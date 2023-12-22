import { UsersDto } from '../DTOs/users.dto.js'
import { CustomError } from '../services/errors/customError.service.js'
import { EError } from '../enums/EError.js'
import { authError } from '../services/errors/authError.service.js'

export class SessionsController {
  static signup = (req, res) => {
    res.json({ status: 'success', message: 'Usuario registrado de forma exitosa' })
  }

  static failSignup = (req, res) => {
    res.json({ status: 'error', message: 'No se pudo registrar al usuario' })
  }

  static failLogin = (req, res) => {
    /* CustomError.createError({
      name: 'Auth error',
      cause: authError(),
      message: 'Credenciales inválidas',
      errorCode: EError.AUTH_ERROR
    }) */
    res.render('login', { error: 'Correo electrónico o contraseña incorrectos' })
  }

  static currentUser = (req, res) => {
    const userDto = new UsersDto(req.user)
    res.json({ status: 'success', user: userDto })
  }

  static login = (req, res) => {
    res.json({ status: 'success', message: 'Iniciaste sesión correctamente!' })
  }

  static logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: 'No se pudo cerrar la sesión' })
      res.redirect('/login')
    })
  }
}
