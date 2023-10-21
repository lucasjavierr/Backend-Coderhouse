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

    const userExist = await usersService.getUserByEmail(signupInfo.email);
    if (userExist[0]) return res.render('signup', { error: 'Ya existe un usuario registrado con este correo.' });

    if (signupInfo.email === 'adminCoder@coder.com' && signupInfo.password === 'adminCod3r123') {
      signupInfo.role = 'admin';
    }

    await usersService.createUser(signupInfo);
    res.render('login', { message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.render('signup', { error: 'No se pudo registrar al usuario' });
    console.log(error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const infoLoginForm = req.body;

    // verifico si el usuario existe
    const user = await usersService.getUserByEmail(infoLoginForm.email);
    if (!user) return res.render('login', { error: 'Este usuario no ha sido registrado.' });

    // verificar si los datos fueron ingresados correctamente
    const userLogin = await usersService.validateUser(infoLoginForm, user[0]);
    if (!userLogin) return res.render('login', { error: 'Correo electrónico o contraseña incorrectos' });

    // crear la sesion del usuario
    req.session.email = user[0].email;
    req.session.role = user[0].role;
    res.redirect('/products');
  } catch (error) {
    console.log(error);
    res.render('login', { error: 'No se pudo iniciar sesión' });
  }
});

export { router as sessionsRouter };
