const fs = class UserManager {
  constructor(path) {
    this.path = path;
  }

  fileExits() {
    return fs.existsSync(this.path);
  }

  async createUser(userInfo) {
    try {
      if (this.fileExits()) {
        const contenido = await fs.promises.readFile(this.path, "utf-8");
        const users = JSON.parse(contenido);
        users.push(userInfo);
        await fs.promises.writeFiles(
          this.path,
          JSON.stringify(users, null, "\t")
        );
        console.log("Usuario creado");
      } else {
        throw new Error("No es posible crear el usuario");
      }
    } catch (error) {
      throw error;
    }
  }
};

const operations = async () => {
  try {
    const manager = new UserManager("usuarios.json");
    manager.createUser({
      name: "Lucas",
      email: "lucasjavier@gmail.com",
      password: "123456",
    });
  } catch (error) {
    console.log(error);
  }
};
