import { Router } from 'express';
import passport from 'passport';
import { config } from '../config/config.js';
import { generateToken } from '../utils.js';

const router = Router();

// --> RUTAS DE SIGNUP -------------------------------------------
// signup local
router.post('/signup', passport.authenticate('signupLocalStrategy', {
  session: false,
  failureRedirect: '/api/sessions/fail-signup'
}), (req, res) => {
  res.redirect('/login');
});

// fallo signup local
router.get('/fail-signup', (req, res) => {
  res.render('signup', { error: 'No se pudo registrar al usuario' });
});

// signup con GitHub
router.get('/signup-github', passport.authenticate('signupGithubStrategy'));

// callback para recibir la información que viene de GitHub
router.get(config.github.callbackUrl, passport.authenticate('signupGithubStrategy', {
  session: false,
  failureRedirect: '/api/sessions/fail-signup'
}), async (req, res) => {
  // generar el token del usuario
  const token = generateToken(req.user);
  // enviar el token al cliente
  res.cookie('accessToken', token).json({ status: 'success', message: 'login exitoso' });
});

// --> RUTAS DE LOGIN -------------------------------------------
// login local
router.post('/login', passport.authenticate('loginLocalStrategy', {
  session: false,
  failureRedirect: '/api/sessions/fail-login'
}), async (req, res) => {
  // generar el token del usuario
  const token = generateToken(req.user);
  // enviar el token al cliente
  res.cookie('accessToken', token).json({ status: 'success', message: 'login exitoso' });
});

// fallo login local
router.get('/fail-login', (req, res) => {
  res.json({ status: 'error', message: 'Correo electrónico o contraseña incorrectos' });
});

router.post('/profile', passport.authenticate('jwtAuth', {
  session: false,
  failureRedirect: '/api/sessions/fail-auth'
}), (req, res) => {
  res.json({ status: 'success', message: 'Peticion válida', user: req.user });
});

router.get('/fail-auth', (req, res) => {
  res.json({ status: 'error', message: 'Token inválido' });
});

// logout local
router.get('/logout', async (req, res) => {
  try {
    res.clearCookie('accessToken');
    res.redirect('/login');
  } catch (error) {
    console.log(error.message);
  }
});

export { router as sessionsRouter };
