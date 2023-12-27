import { UsersDto } from '../DTOs/users.dto.js'
import { UsersService } from '../services/users.service.js'
import { generateEmailToken, sendChangePasswordEmail } from '../helpers/email.js'
// import { CustomError } from '../services/errors/customError.service.js'
// import { EError } from '../enums/EError.js'
// import { authError } from '../services/errors/authError.service.js'

export class SessionsController {
  static signup = (req, res) => {
    res.render('login', { message: 'Usuario registrado correctamente' })
  }

  static failSignup = (req, res) => {
    res.json({ status: 'error', message: 'No se pudo registrar al usuario' })
  }

  static login = (req, res) => {
    res.json({ status: 'success', message: 'Iniciaste sesión correctamente' })
  }

  static failLogin = (req, res) => {
    /* CustomError.createError({
      name: 'Auth error',
      cause: authError(),
      message: 'Credenciales inválidas',
      errorCode: EError.AUTH_ERROR
    }) */
    res.json({ status: 'error', message: 'Correo electrónico o contraseña incorrectos' })
  }

  static currentUser = (req, res) => {
    const userDto = new UsersDto(req.user)
    res.json({ status: 'success', user: userDto })
  }

  static logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: 'No se pudo cerrar la sesión' })
      res.redirect('/login')
    })
  }

  static forgotPassword = async (req, res) => {
    try {
      const { email } = req.body
      // verifico que el usuario exista
      await UsersService.getUserByEmail(email)

      const emailToken = generateEmailToken(email, 5 * 60)
      await sendChangePasswordEmail(req, email, emailToken)
      res.send(`
        Se envió un mensaje a su correo para restablecer la contraseña
        <a href="/login">Volver a la página de inicio</a>
        `)
    } catch (error) {
      res.json({ status: 'error', error: error.message })
    }
  }
}
