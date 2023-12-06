import { UsersDto } from '../DTOs/users.dto.js'

export class SessionsController {
  static redirectLogin = (req, res) => {
    res.json({ message: 'Usuario registrado de forma exitosa' })
  }

  static failSignup = (req, res) => {
    res.status(500).json({ error: 'No se pudo registrar al usuario' })
  }

  static failLogin = (req, res) => {
    res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' })
  }

  static getProfile = (req, res) => {
    console.log(req.user)
    const userDto = new UsersDto(req.user)
    res.json({ status: 'success', user: userDto })
  }

  static login = (req, res) => {
    res.json({ message: 'logueado' })
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
