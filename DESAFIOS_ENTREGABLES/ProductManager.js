const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  #fileExist() {
    return fs.existsSync(this.path);
  }

  getProducts() {
    if (!this.#fileExist()) {
      throw new Error("El archivo no existe");
    }
    const productos = fs.readFileSync(this.path, "utf-8");
    const productosJSON = JSON.parse(productos);
    return productosJSON;
  }

  getProductById(idProduct) {
    if (!this.#fileExist()) {
      throw new Error("El archivo no existe");
    }
    const productos = fs.readFileSync(this.path, "utf-8");
    const productosJSON = JSON.parse(productos);
    const product =
      productosJSON.find((prod) => prod.id === idProduct) ||
      `El producto con el ID "${idProduct} no existe"`;
    return product;
  }

  async addProduct(productInfo) {
    try {
      if (!this.#fileExist()) {
        throw new Error("El archivo no existe");
      }

      const productos = await fs.promises.readFile(this.path, "utf-8");
      const productosJSON = JSON.parse(productos);

      const { title, description, price, thumbnail, code, stock } = productInfo;

      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw new Error("Todos los campos deben estar completos");
      }

      if (productosJSON.some((prod) => prod.code === code)) {
        throw new Error(`Ya existe un producto con el código "${code}"`);
      }

      let newId;
      if (productosJSON == 0) {
        newId = 1;
      } else {
        newId = productosJSON[productosJSON.length - 1].id + 1;
      }

      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: newId,
      };

      productosJSON.push(newProduct);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productosJSON, null, "\t")
      );
      console.log("Producto creado correctamente");
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(idProduct, fieldsToUpdate, newValue) {
    try {
      if (!this.#fileExist()) {
        throw new Error("El archivo no existe");
      }
      const productos = await fs.promises.readFile(this.path, "utf-8");
      const productosJSON = JSON.parse(productos);

      const prodToUpdate = productosJSON.find((prod) => prod.id === idProduct);

      if (!prodToUpdate) {
        throw new Error(`El producto con el ID "${idProduct}" no existe`);
      }

      const propertyExists = prodToUpdate.hasOwnProperty(fieldsToUpdate);

      if (!propertyExists) {
        throw new Error(`La propiedad ${fieldsToUpdate} no existe`);
      }
      prodToUpdate[fieldsToUpdate] = newValue;

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productosJSON, null, "\t")
      );
      console.log("Producto actualizado correctamente");
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(idProduct) {
    try {
      if (!this.#fileExist()) {
        throw new Error("El archivo no existe");
      }
      const productos = await fs.promises.readFile(this.path, "utf-8");
      const productosJSON = JSON.parse(productos);

      if (!productosJSON.some((prod) => prod.id === idProduct)) {
        throw new Error(`El producto con el ID "${idProduct}" no existe`);
      }

      const productsUpdated = productosJSON.filter(
        (prod) => prod.id !== idProduct
      );
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productsUpdated, null, "\t")
      );
      console.log("Producto eliminado correctamente");
    } catch (error) {
      throw error;
    }
  }
}

const prod1 = {
  title: "Ryzen 9",
  description: "Procesador",
  price: 700,
  thumbnail: "sin foto",
  code: "abc123",
  stock: 160,
};

const prod2 = {
  title: "Intel Core i9-13900K",
  description: "Procesador",
  price: 850,
  thumbnail: "sin foto",
  code: "abc132",
  stock: 200,
};

const operations = async () => {
  try {
    const manager = new ProductManager("./productos.json");
    // await manager.addProduct(prod1);
    // await manager.addProduct(prod2);
    // await manager.updateProduct(1, "title", "AMD Ryzen 9 7950X 3D-V Cache");
    // console.log(manager.getProductById(1));
    // await manager.deleteProduct(2);
    console.log(manager.getProducts());
  } catch (error) {
    console.log(error.message);
  }
};
operations();
