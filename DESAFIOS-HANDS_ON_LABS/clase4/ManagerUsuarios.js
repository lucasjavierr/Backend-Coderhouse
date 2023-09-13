const fs = require('fs');

class UsersManager {
  constructor (filePath) {
    this.filePath = filePath;
  }

  fileExist () {
    return fs.existsSync(this.filePath);
  }

  async getUsers () {
    try {
      if (this.fileExist) {
        const contenido = await fs.promises.readFile(this.filePath, 'utf-8');
        const contenidoJSON = JSON.parse(contenido);
        return contenidoJSON;
      } else {
        throw new Error('No es posible leer el archivo');
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async createUser (userInfo) {
    try {
      if (this.fileExist) {
        const contenido = await fs.promises.readFile(this.filePath, 'utf-8');
        const contenidoJSON = JSON.parse(contenido);
        contenidoJSON.push(userInfo);
        await fs.promises.writeFile(
          this.filePath,
          JSON.stringify(contenidoJSON, null, '\t')
        );
        console.log('Usuario agregado');
      } else {
        throw new Error('El archivo no existe');
      }
    } catch (error) {
      console.log(error.message);
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
