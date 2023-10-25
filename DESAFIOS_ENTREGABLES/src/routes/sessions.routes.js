import { Router } from 'express';
import passport from 'passport';
import { config } from '../config/config.js';

const router = Router();

// RUTAS DE REGISTRO
router.post('/signup', passport.authenticate('signupLocalStrategy', {
  failureRedirect: '/api/sessions/fail-signup'
}), async (req, res) => {
  res.render('login', { message: 'Usuario registrado correctamente' });
});

router.get('/fail-signup', (req, res) => {
  res.render('signup', { error: 'No se pudo registrar al usuario' });
});
// --> con GitHub
router.get('/signup-github', passport.authenticate('signupGithubStrategy'));
// --> callback de GitHub
router.get(config.github.callbackUrl, passport.authenticate('signupGithubStrategy', {
  failureRedirect: '/api/sessions/fail-signup'
}), (req, res) => {
  res.redirect('/products');
});

// RUTAS DE LOGIN
router.post('/login', passport.authenticate('loginLocalStrategy', {
  failureRedirect: '/api/sessions/fail-login'
}), async (req, res) => {
  res.redirect('/products');
});

router.get('/fail-login', (req, res) => {
  res.render('login', { error: 'Correo electrónico o contraseña incorrectos' });
});

router.get('/logout', async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) return res.render('products', { error: 'No se pudo cerrar la sesión' });
      res.render('login');
    });
  } catch (error) {
    console.log(error.message);
  }
});

export { router as sessionsRouter };
