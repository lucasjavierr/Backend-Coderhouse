import { usersModel } from '../models/users.model.js';

export class UsersManagerMongo {
  constructor () {
    this.model = usersModel;
  }

  async getUserById (userId) {
    try {
      const user = await this.model.findById(userId).lean();
      return user;
    } catch (error) {
      console.log('getUserById:', error.message);
      throw new Error('Se produjo un error al obtener la información del usuario.');
    }
  }

  async getUserByEmail (userEmail) {
    try {
      const user = await this.model.findOne({ email: userEmail }).lean();
      return user;
    } catch (error) {
      console.log('getUserByEmail:', error.message);
      throw new Error('Se produjo un error al obtener la información del usuario.');
    }
  }

  async createUser (userInfo) {
    try {
      const userCreated = await this.model.create(userInfo);
      return userCreated;
    } catch (error) {
      console.log('createUser', error.message);
      throw new Error('Se produjo un error al momento de crear el usuario');
    }
  }
}
