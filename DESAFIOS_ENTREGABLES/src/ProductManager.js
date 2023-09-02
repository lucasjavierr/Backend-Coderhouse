import fs from "fs";

export class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  // metodo para verificar si el archivo existe
  #fileExist() {
    return fs.existsSync(this.path);
  }

  // metodo para obtener TODOS los archivos
  getProducts() {
    // verifico si el archivo existe
    if (!this.#fileExist()) {
      throw new Error("El archivo no existe");
    }
    // leo el archivo de forma síncrona porque sino devuelve una promesa en <pending>
    const productos = fs.readFileSync(this.path, "utf-8");
    if (!productos) {
      throw new Error(
        "No se pudo leer el archivo porque no existe o está vacío"
      );
    }
    // y lo convierto a JSON
    const productosJSON = JSON.parse(productos);
    // retorno todos los productos
    return productosJSON;
  }

  // obtener un producto por ID
  getProductById(idProduct) {
    // verifico si el archivo existe, leo el archivo y lo convierto a JSON
    if (!this.#fileExist()) {
      throw new Error("El archivo no existe");
    }
    const productos = fs.readFileSync(this.path, "utf-8");
    const productosJSON = JSON.parse(productos);

    // busco en el array un producto que coincida con el ID ingresado por parámetros
    // si no lo encuentra, devuelve un string diciendo que no existe
    const product = productosJSON.find((prod) => prod.id === idProduct);
    if (!product) {
      throw new Error(`El producto con el ID "${idProduct} no existe"`);
    }

    // retorno el producto
    return product;
  }

  // metodo para añadir un producto
  async addProduct(productInfo) {
    try {
      // verifico si el archivo existe, leo el archivo y lo convierto a JSON
      if (!this.#fileExist()) {
        throw new Error("El archivo no existe");
      }
      const productos = await fs.promises.readFile(this.path, "utf-8");
      const productosJSON = JSON.parse(productos);

      // desestructuro y verifico si existen todos los campos del objeto ingresado
      const { title, description, price, thumbnail, code, stock } = productInfo;
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw new Error("Todos los campos deben estar completos");
      }

      // verifico si ya existe un producto con el mismo code
      if (productosJSON.some((prod) => prod.code === code)) {
        throw new Error(`Ya existe un producto con el código "${code}"`);
      }

      // id incrementable, si el array no tiene ningun producto, el ID es 1
      // si ya tiene productos, busca el ID del ultimo elemento y le suma 1
      let newId;
      if (productosJSON == 0) {
        newId = 1;
      } else {
        newId = productosJSON[productosJSON.length - 1].id + 1;
      }

      // creo el objeto con sus propiedades y lo pusheo al array de productos
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

      // reemplazo el array antiiguo con el nuevo, que ya contiene el nuevo producto
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productosJSON, null, "\t")
      );
      console.log("Producto creado correctamente");
    } catch (error) {
      throw error;
    }
  }

  // actualizar un producto a traves de un ID
  async updateProduct(idProduct, fieldsToUpdate, newValue) {
    try {
      // verifico si el archivo existe, leo el archivo y lo convierto a JSON
      if (!this.#fileExist()) {
        throw new Error("El archivo no existe");
      }
      const productos = await fs.promises.readFile(this.path, "utf-8");
      const productosJSON = JSON.parse(productos);

      // busco un producto que coincida con el ID ingresado
      // si no existe, retorno un error
      const prodToUpdate = productosJSON.find((prod) => prod.id === idProduct);
      if (!prodToUpdate) {
        throw new Error(`El producto con el ID "${idProduct}" no existe`);
      }

      // verifico si la propiedad ingresada para actualizar existe
      // si no existe, retorno un error
      const propertyExists = prodToUpdate.hasOwnProperty(fieldsToUpdate);
      if (!propertyExists) {
        throw new Error(`La propiedad ${fieldsToUpdate} no existe`);
      }
      // actualizo la propiedad del objeto con el nuevo valor
      prodToUpdate[fieldsToUpdate] = newValue;

      // reescribo el array con el objeto actualizado
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productosJSON, null, "\t")
      );
      console.log("Producto actualizado correctamente");
    } catch (error) {
      throw error;
    }
  }

  // eliminar un producto por ID
  async deleteProduct(idProduct) {
    try {
      // verifico si el archivo existe, leo el archivo y lo convierto a JSON
      if (!this.#fileExist()) {
        throw new Error("El archivo no existe");
      }
      const productos = await fs.promises.readFile(this.path, "utf-8");
      const productosJSON = JSON.parse(productos);

      // verifico si existe un producto con el ID ingresado pro parámetros
      // si no existe, retorno un error
      if (!productosJSON.some((prod) => prod.id === idProduct)) {
        throw new Error(`El producto con el ID "${idProduct}" no existe`);
      }

      // filtro el array de productos con todos los productos que NO coincidan con el ID ingresado
      const productsUpdated = productosJSON.filter(
        (prod) => prod.id !== idProduct
      );

      // reescribo el array original con el actualizado
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

// pruebas
const operations = async () => {
  try {
    const manager = new ProductManager("./productos.json");
    // await manager.addProduct(prod1);
    // await manager.addProduct(prod2);
    // await manager.updateProduct(1, "title", "AMD Ryzen 9 7950X 3D-V Cache");
    // console.log(manager.getProductById(1));
    // await manager.deleteProduct(1);
    console.log(manager.getProducts());
  } catch (error) {
    console.log(error.message);
  }
};
operations();
