import { Router } from 'express'
import passport from 'passport'
import { SessionsController } from '../controllers/sessions.controller.js'

const router = Router()

router.post('/signup', passport.authenticate('signupLS',
  { failureRedirect: '/api/sessions/fail-signup' }
), SessionsController.signup)

router.get('/fail-signup', SessionsController.failSignup)

// ------------------------------------------------------------------------
router.post('/login', passport.authenticate('loginLS',
  { failureRedirect: '/api/sessions/fail-login' }
), SessionsController.login)

router.get('/fail-login', SessionsController.failLogin)

router.post('/current', SessionsController.currentUser)

router.get('/logout', SessionsController.logout)

export { router as sessionsRouter }
