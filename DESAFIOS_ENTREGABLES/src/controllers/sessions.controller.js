import { generateToken } from '../utils.js'

export class SessionsController {
  static redirectLogin = (req, res) => {
    res.redirect('/login')
  }

  static failSignup = (req, res) => {
    res.render('signup', { error: 'No se pudo registrar al usuario' })
  }

  static failLogin = (req, res) => {
    res.json({
      status: 'error',
      message: 'Correo electrónico o contraseña incorrectos'
    })
  }

  static failInvalidToken = (req, res) => {
    res.json({ status: 'error', message: 'Token inválido' })
  }

  static generateTokenLocal = async (req, res) => {
    const token = generateToken(req.user)
    res.cookie('accessToken', token)
      .json({ status: 'success', message: 'login exitoso' })
  }

  static generateTokenGithub = async (req, res) => {
    const token = generateToken(req.user)
    res.cookie('accessToken', token)
      .redirect('/profile')
  }

  static sendInfoToProfile = (req, res) => {
    res.json({ status: 'success', user: req.user })
  }

  static logout = (req, res) => {
    res.clearCookie('accessToken')
    res.redirect('/login')
  }
}
