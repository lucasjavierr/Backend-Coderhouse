import passport from 'passport';
import LocalStrategy from 'passport-local';
import { createHash, isValidPassword } from '../utils.js';
import { usersService } from '../dao/index.js';
import { config } from './config.js';
import GitHubStrategy from 'passport-github2';

// localStrategy => username y password
export const initializePassport = () => {
  // estrategia para registrar usuarios de forma local
  passport.use('signupLocalStrategy', new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email'
    },
    async (req, username, password, done) => {
      const { firstName, lastName, age, gender } = req.body;
      try {
        const userExist = await usersService.getUserByEmail(username);

        // si el usuario ya está registrado, retorna
        if (userExist) return done(null, false);

        // si no existe, lo crea
        const newUser = {
          firstName,
          lastName,
          age,
          gender,
          email: username,
          password: createHash(password)
        };

        const userCreated = await usersService.createUser(newUser);
        return done(null, userCreated);
      } catch (error) {
        return done(error);
      }
    }
  ));

  // estrategia para iniciar sesión de forma local
  passport.use('loginLocalStrategy', new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (username, password, done) => {
      try {
        const user = await usersService.getUserByEmail(username);

        // si el usuario no existe, no se puede loguear
        if (!user) return done(null, false);

        if (!isValidPassword(password, user)) return done(null, false);

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  // estrategia de registro con github
  passport.use('signupGithubStrategy', new GitHubStrategy(
    {
      clientID: config.github.clientId,
      clientSecret: config.github.clientSecret,
      callbackURL: `http://localhost:8080/api/sessions${config.github.callbackUrl}`
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log(profile);
        const userExist = await usersService.getUserByEmail(profile.username);

        // si el usuario ya está registrado, retorna
        if (userExist) return done(null, userExist);

        // si no existe, lo crea
        const newUser = {
          firstName: profile._json.name,
          lastName: profile.displayName,
          age: null,
          gender: null,
          email: profile.username,
          password: createHash(profile.id)
        };

        const userCreated = await usersService.createUser(newUser);
        return done(null, userCreated);
      } catch (error) {
        return done(error);
      }
    }

  ));

  // serialize y deserialize
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await usersService.getUserById(id);
    done(null, user);
  });
};
