import { Router } from 'express'
import passport from 'passport'
import { config } from '../config/config.js'
import { SessionsController } from '../controllers/sessions.controller.js'

const router = Router()

// --> RUTAS DE SIGNUP -------------------------------------------
// signup local
router.post('/signup',
  passport.authenticate('signupLocalStrategy', {
    session: false,
    failureRedirect: '/api/sessions/fail-signup'
  }),
  SessionsController.redirectLogin
)

// fallo signup local
router.get('/fail-signup', SessionsController.failSignup)

// signup con GitHub
router.get('/signup-github', passport.authenticate('signupGithubStrategy'))

// callback para recibir la información que viene de GitHub
router.get(config.github.callbackUrl,
  passport.authenticate('signupGithubStrategy', {
    session: false,
    failureRedirect: '/api/sessions/fail-signup'
  }),
  SessionsController.generateTokenGithub
)

// --> RUTAS DE LOGIN -------------------------------------------
// login local
router.post('/login',
  passport.authenticate('loginLocalStrategy', {
    session: false,
    failureRedirect: '/api/sessions/fail-login'
  }),
  SessionsController.generateTokenLocal
)

// fallo login local
router.get('/fail-login', SessionsController.failLogin)

router.post('/profile',
  passport.authenticate('jwtAuth', {
    session: false,
    failureRedirect: '/api/sessions/fail-auth'
  }),
  SessionsController.sendInfoToProfile
)

router.get('/fail-auth', SessionsController.failInvalidToken)

// logout local
router.get('/logout', SessionsController.logout)

export { router as sessionsRouter }
