import passport from 'passport'
import LocalStrategy from 'passport-local'
import { createHash, isValidPassword } from '../utils.js'
import { UsersService } from '../services/users.service.js'
// import { CartsService } from '../services/carts.service.js'
import { config } from './config.js'
import GitHubStrategy from 'passport-github2'
import jwt from 'passport-jwt'

const JWTStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

// localStrategy => username y password
export const initializePassport = () => {
  // estrategia para registrar usuarios de forma local
  passport.use('signupLocalStrategy',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email'
        // => con esto el campo username es igual al campo email
      },
      async (req, username, password, done) => {
        const { firstName, lastName, age, gender } = req.body
        try {
          const userExist = await UsersService.getUserByEmail(username)

          // el usuario ya está registrado
          if (userExist) return done(null, false)

          // el usuario no está registrado
          const newUser = {
            firstName,
            lastName,
            age,
            gender,
            email: username,
            password: createHash(password),
            role:
              username === config.admin.email &&
              password === config.admin.password
                ? 'ADMIN'
                : 'USER'
          }

          const userCreated = await UsersService.createUser(newUser)
          return done(null, userCreated)
        } catch (error) {
          return done(error)
        }
      }
    )
  )

  // estrategia para iniciar sesión de forma local
  passport.use('loginLocalStrategy',
    new LocalStrategy(
      {
        usernameField: 'email'
        // => con esto el campo username es igual al campo email
      },
      async (username, password, done) => {
        try {
          const user = await UsersService.getUserByEmail(username)

          // si el usuario no existe, no se puede loguear
          if (!user) return done(null, false)

          // si los datos son incorrectos, no se puede loguear
          if (!isValidPassword(password, user)) return done(null, false)

          // el correo y la contraseña son correctos
          return done(null, user)
          // la info del usuario se guarda en req.user
        } catch (error) {
          return done(error)
        }
      }
    )
  )

  // estrategia de registro e inicio de sesion con github
  passport.use('signupGithubStrategy',
    new GitHubStrategy(
      {
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackURL: `http://localhost:8080/api/sessions${config.github.callbackUrl}`
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // console.log(profile);
          const userExist = await UsersService.getUserByEmail(profile.username)
          // const newCart = await CartsService.createCart()

          // si el usuario ya está registrado
          // envío los datos y se loguea
          if (userExist) return done(null, userExist)

          // si no existe, lo crea
          const newUser = {
            firstName: profile._json.name,
            lastName: profile.displayName,
            age: null,
            gender: null,
            // cart: newCart._id,
            email: profile.username,
            password: createHash(profile.id)
          }

          const userCreated = await UsersService.createUser(newUser)
          return done(null, userCreated)
        } catch (error) {
          return done(error)
        }
      }
    )
  )

  passport.use('jwtAuth',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.jwt.privateKey
      },
      async (jwtPayload, done) => {
        try {
          return done(null, jwtPayload) // --> req.user
        } catch (error) {
          return done(error)
        }
      }
    )
  )
}

const cookieExtractor = (req) => {
  let token
  if (req?.cookies) {
    // eslint-disable-next-line dot-notation
    token = req.cookies['accessToken']
  } else {
    token = null
  }
  return token
}
