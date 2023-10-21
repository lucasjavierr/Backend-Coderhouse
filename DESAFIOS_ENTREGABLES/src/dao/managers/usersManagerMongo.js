import crypto from 'crypto';
import { usersModel } from '../models/users.model.js';

export class UsersManagerMongo {
  constructor () {
    this.model = usersModel;
  }

  #secret = 'coder';

  async getUsers () {
    try {
      const users = await this.model.find();
      if (users.length === 0) throw new Error('Se produjo un error al obtener los usuarios.');
      return users;
    } catch (error) {
      console.log('getUsers:', error.message);
      throw new Error('Se produjo un error al obtener los usuarios.');
    }
  }

  async getUserByEmail (userEmail) {
    try {
      const user = await this.model.find({ email: userEmail }).lean();
      if (!user) throw new Error('El usuario ingresado no existe.');
      return user;
    } catch (error) {
      console.log('getUserById:', error.message);
      throw new Error('Se produjo un error al obtener la información del usuario.');
    }
  }

  async createUser (userInfo) {
    try {
      userInfo.password = crypto
        .createHmac('sha256', this.#secret)
        .update(userInfo.password)
        .digest('hex');

      const userCreated = await this.model.create(userInfo);
      return userCreated;
    } catch (error) {
      console.log('createUser', error.message);
      throw new Error('Se produjo un error al momento de crear el usuario');
    }
  }

  async validateUser (infoLoginForm, dataUser) {
    try {
      infoLoginForm.password = crypto
        .createHmac('sha256', this.#secret)
        .update(infoLoginForm.password)
        .digest('hex');

      const userValidated = dataUser.password === infoLoginForm.password;

      return userValidated;
    } catch (error) {
      console.log('loginUser', error.message);
      throw new Error('Se produjo un error al momento de iniciar sesión');
    }
  }

  async updateUser (userId, newUserInfo) {
    try {
      const userUpdated = await this.model.findByIdAndUpdate(userId, newUserInfo, { new: true });
      if (!userUpdated) throw new Error('Hubo un error al actualizar la información del usuario.');
      return userUpdated;
    } catch (error) {
      console.log('updateUser:', error.message);
      throw new Error('No se pudo actualizar el usuario.');
    }
  }

  async deleteUser (userId) {
    try {
      const result = await this.model.findByIdAndDelete(userId);
      if (!result) throw new Error('Hubo un error al eliminar el usuario.');
      return result;
    } catch (error) {
      console.log('deleteUser:', error.message);
      throw new Error('No se pudo eliminar el usuario.');
    }
  }
}
