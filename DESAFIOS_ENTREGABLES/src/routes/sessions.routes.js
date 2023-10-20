import { Router } from 'express';
import { usersService } from '../dao/index.js';

const router = Router();

router.get('/logout', async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) return res.render('profileView', { error: 'No se pudo cerrar la sesión' });
      res.render('login');
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const signupInfo = req.body;
    await usersService.createUser(signupInfo);
    res.render('login', { message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.render('signup', { error: 'No se pudo registrar al usuario' });
    console.log(error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const loginForm = req.body;
    const user = await usersService.getUserByEmail(loginForm.email);

    // verifico si el usuario existe
    if (!user) return res.render('login', { error: 'Este usuario no ha sido registrado' });

    // verificar si los datos son correctos
    if (user[0].password !== loginForm.password) return res.render('login', { error: 'Correo electrónico o contraseña incorrectos' });

    // crear la sesion del usuario
    req.session.email = user[0].email;
    res.redirect('/products');
  } catch (error) {
    console.log(error);
    res.render('login', { error: 'No se pudo iniciar sesión' });
  }
});

export { router as sessionsRouter };
