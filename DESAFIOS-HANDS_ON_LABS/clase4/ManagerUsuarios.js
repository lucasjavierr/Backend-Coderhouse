const fs = require('fs');

class UsersManager {
  constructor (filePath) {
    this.filePath = filePath;
  }

  #fileExist () {
    return fs.existsSync(this.filePath);
  }

  async #writeFile (infoToSave) {
    await fs.promises.writeFile(this.path, JSON.stringify(infoToSave, null, '\t'));
  }

  async getUsers () {
    try {
      if (!this.#fileExist()) throw new Error('No se pudieron obtener los usuarios.');
      const dataUsers = await fs.promises.readFile(this.filePath, 'utf-8');
      const users = JSON.parse(dataUsers);
      return users;
    } catch (error) {
      throw error;
    }
  }

  async createUser (userInfo) {
    try {
      const { name, surname, age, course } = userInfo;
      if (!name || !surname || !age || !course) throw new Error('Todos los campos deben estar completos');

      const users = await this.getUsers();
      users.push(userInfo);
      await this.#writeFile(users);
      console.log('Usuario agregado');
    } catch (error) {
      throw error;
    }
  }
}

const operations = async () => {
  try {
    const manager = new UsersManager('./usuarios.json');
    await manager.createUser({ nombre: 'Avril', age: 19 });
    await manager.createUser({ nombre: 'Lucas', age: 19 });
    const users = await manager.getUsers();
    console.log(users);
  } catch (error) {
    console.log(error.message);
  }
};
operations();
