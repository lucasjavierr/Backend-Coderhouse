const fs = require('fs');
const crypto = require('node:crypto');

class UserManager {
  constructor (filePath) {
    this.path = filePath;
  }

  #secret = 'avrilTeAmo';

  #fileExist () {
    return fs.existsSync(this.path);
  }

  async #writeFile (infoToSave) {
    await fs.promises.writeFile(this.path, JSON.stringify(infoToSave, null, '\t'));
  }

  async getUsers () {
    try {
      if (!this.#fileExist()) throw new Error('No se pudieron obtener los usuarios.');
      const dataUsers = await fs.promises.readFile(this.path, 'utf-8');
      const users = JSON.parse(dataUsers);
      // console.log(users);
      return users;
    } catch (error) {
      throw error;
    }
  }

  async createUser (userInfo) {
    try {
      const { name, surname, username, password } = userInfo;
      if (!name || !surname || !username || !password) throw new Error('Todos los campos deben estar completos');

      const passwordHash = crypto.createHmac('sha256', this.#secret)
        .update(password)
        .digest('hex');

      const newUser = { ...userInfo, password: passwordHash };
      console.log(newUser);

      if (!this.#fileExist()) throw new Error('No se pudieron obtener los usuarios');
      const users = await this.getUsers();

      const userExist = users.find((user) => username === user.username);
      if (userExist) throw new Error('El usuario ingresado ya existe');

      users.push(newUser);
      this.#writeFile(users);
      console.log('Usuario creado');
    } catch (error) {
      throw error;
    }
  }

  async validateUser (username, password) {
    const users = await this.getUsers();

    const user = users.find((user) => user.username === username);

    const passwordHash = crypto.createHmac('sha256', this.#secret)
      .update(password)
      .digest('hex');

    if (passwordHash !== user.password) throw new Error('Usuario o contraseña incorrecto');
    console.log('Logueado');
  }
}

const user = {
  name: 'Lucas',
  surname: 'Javier',
  username: 'lucasjavier',
  password: 'Slnj19ard11ñ'

};

const operations = async () => {
  try {
    const manager = new UserManager('./users.json');
    await manager.createUser(user);
    await manager.getUsers();
    await manager.validateUser('lucasjavier', 'Slnj19ard11ñ');
  } catch (error) {
    console.log(error.message);
  }
};
operations();
