import fs from 'fs';

export class ProductManagerFiles {
  constructor (filePath) {
    this.path = filePath;
  }

  // variable privada para la gestion de IDs
  #newId;

  // metodo para verificar si el archivo existe
  #fileExist () {
    return fs.existsSync(this.path);
  }

  // metodo para obtener TODOS los archivos
  async getProducts () {
    try {
      // verifico si el archivo existe
      if (!this.#fileExist()) throw new Error('No se pudieron obtener los productos');

      // leo el archivo de forma síncrona porque sino devuelve una promesa en <pending>
      const productos = await fs.promises.readFile(this.path, 'utf-8');
      if (!productos) throw new Error('No se pudo leer el archivo porque no existe o está vacío');

      // lo convierto a JSON
      const productosJSON = JSON.parse(productos);

      // retorno todos los productos
      return productosJSON;
    } catch (error) {
      throw error;
    }
  }

  // obtener un producto por ID
  async getProductById (idProduct) {
    try {
      // verifico si el archivo existe, leo el archivo y lo convierto a JSON
      if (!this.#fileExist()) throw new Error('No se pudo obtener el producto');
      const productos = await fs.promises.readFile(this.path, 'utf-8');
      const productosJSON = JSON.parse(productos);

      // busco en el array un producto que coincida con el ID ingresado por parámetros
      // si no lo encuentra, devuelve un error diciendo que no existe
      const product = productosJSON.find((prod) => prod.id === idProduct);
      if (!product) throw new Error(`El producto con el ID "${idProduct} no existe"`);

      // retorno el producto
      return product;
    } catch (error) {
      throw error;
    }
  }

  // metodo para añadir un producto
  async createProduct (productInfo) {
    try {
      // verifico si el archivo existe, leo el archivo y lo convierto a JSON
      if (!this.#fileExist()) throw new Error('No se pudieron obtener los productos');

      const productos = await fs.promises.readFile(this.path, 'utf-8');
      const productosJSON = JSON.parse(productos);

      // desestructuro y verifico si existen todos los campos del objeto ingresado
      const { title, description, price, thumbnails, code, stock, status = true } = productInfo;
      if (!title ||
        !description ||
        !price ||
        !thumbnails ||
        !code || !stock
      ) throw new Error('Todos los campos deben estar completos');

      // verifico si ya existe un producto con el mismo code
      if (productosJSON.some(
        (prod) => prod.code === code)
      ) throw new Error(`Ya existe un producto con el código "${code}"`);

      // id incrementable, si el array no tiene ningun producto, el ID es 1
      // si ya tiene productos, busca el ID del ultimo elemento y le suma 1
      if (productosJSON.length === 0) {
        this.#newId = 1;
      } else {
        this.#newId = productosJSON[productosJSON.length - 1].id + 1;
      }

      // creo el objeto con sus propiedades y lo pusheo al array de productos
      const newProduct = {
        id: this.#newId,
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        status
      };
      productosJSON.push(newProduct);

      // reemplazo el array antiiguo con el nuevo, que ya contiene el nuevo producto
      await fs.promises.writeFile(this.path, JSON.stringify(productosJSON, null, '\t'));
      console.log('Producto creado correctamente');
    } catch (error) {
      throw error;
    }
  }

  // actualizar un producto a traves de un ID
  async updateProduct (idProduct, infoToUpdate) {
    try {
      // verifico si el archivo existe, leo el archivo y lo convierto a JSON
      if (!this.#fileExist()) throw new Error('No se pudieron obtener los productos');
      const productos = await fs.promises.readFile(this.path, 'utf-8');
      const productosJSON = JSON.parse(productos);

      const { title, description, price, thumbnails, code, stock } = infoToUpdate;
      if (!title ||
        !description ||
        !price ||
        !thumbnails ||
        !code || !stock
      ) throw new Error('No se puede modificar el producto. Debe ingresar todas las propiedades');

      // verifico que la nueva informacion no actualice el id
      if (infoToUpdate.id) throw new Error('No se puede actualizar el ID de un producto');

      // busco un producto que coincida con el ID ingresado
      // si no existe, retorno un error
      const prodToUpdate = productosJSON.find((prod) => prod.id === idProduct);
      if (!prodToUpdate) throw new Error(`El producto con el ID "${idProduct}" no existe`);

      const productIndex = productosJSON.findIndex((prod) => prod.id === idProduct);
      if (!productIndex) throw new Error(`No se pudo encontrar el producto con el ID ${idProduct}`);

      productosJSON[productIndex] = {
        ...productosJSON[productIndex],
        ...infoToUpdate
      };

      // reescribo el array con el objeto actualizado
      await fs.promises.writeFile(this.path, JSON.stringify(productosJSON, null, '\t'));
      console.log('Producto actualizado correctamente');
    } catch (error) {
      throw error;
    }
  }

  // eliminar un producto por ID
  async deleteProduct (idProduct) {
    try {
      // verifico si el archivo existe, leo el archivo y lo convierto a JSON
      if (!this.#fileExist()) throw new Error('No se pudieron obtener los productos');
      const productos = await fs.promises.readFile(this.path, 'utf-8');
      const productosJSON = JSON.parse(productos);

      // verifico si existe un producto con el ID ingresado pro parámetros
      // si no existe, retorno un error
      if (!productosJSON.some(
        (prod) => prod.id === idProduct)
      ) throw new Error(`El producto con el ID "${idProduct}" no existe`);

      // filtro el array de productos con todos los productos que NO coincidan con el ID ingresado
      const productsUpdated = productosJSON.filter((prod) => prod.id !== idProduct);

      // reescribo el array original con el actualizado
      await fs.promises.writeFile(this.path, JSON.stringify(productsUpdated, null, '\t'));
      console.log('Producto eliminado correctamente');
    } catch (error) {
      throw error;
    }
  }
}
