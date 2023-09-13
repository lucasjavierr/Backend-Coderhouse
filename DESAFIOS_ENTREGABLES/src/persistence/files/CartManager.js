import fs from 'fs';

export class CartsManager {
  constructor (filePath) {
    this.path = filePath;
  }

  #newId;

  #fileExist () {
    return fs.existsSync(this.path);
  }

  async getCarts () {
    try {
      // verifico si el archivo existe
      if (!this.#fileExist()) throw new Error('No se pudieron obtener los carritos');

      // leo el archivo de forma síncrona porque sino devuelve una promesa en <pending>
      const carts = await fs.promises.readFile(this.path, 'utf-8');
      if (!carts) throw new Error('No se pudo leer el archivo porque no existe o está vacío');

      // lo convierto a JSON
      const cartsJSON = JSON.parse(carts);

      // retorno todos los productos
      return cartsJSON;
    } catch (error) {
      throw error;
    }
  }

  async getCartById (cartId) {
    const cartsJSON = await this.getCarts();

    // busco el carrito por el id ingresado
    const cart = cartsJSON.find((cart) => cart.id === cartId);
    if (!cart) throw new Error(`No se pudo encontrar un carrito con el ID ${cartId}`);
    return cart;
  }

  async createCart () {
    try {
      const cartsJSON = await this.getCarts();

      if (cartsJSON.length === 0) {
        this.#newId = 1;
      } else {
        this.#newId = cartsJSON[cartsJSON.length - 1].id + 1;
      }

      const newCart = {
        id: this.#newId,
        products: []
      };

      cartsJSON.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsJSON, null, '\t'));
      console.log('Producto creado correctamente');
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart (cartId, productId) {
    try {
      // recupero el archivo de carritos
      const cartsJSON = await this.getCarts();

      // obtengo la posicion del carrito
      // si no existe, devuelvo error
      const cartIndex = cartsJSON.findIndex((cart) => cart.id === cartId);
      if (cartIndex === -1) throw new Error(`El carrito con el ID ${cartId} no existe`);

      // dentro de ese carrito, busco si el producto ya existe dentro
      const productIndex = cartsJSON[cartIndex].products.findIndex((prod) => prod.id === productId);

      // si el producto ya existe, sumo la cantidad
      if (productIndex !== -1) {
        cartsJSON[cartIndex].products[productIndex].quantity += 1;
      } else {
        // si no, creo un obj con su id y la cantidad en 1
        cartsJSON[cartIndex].products.push({ id: productId, quantity: 1 });
      }

      console.log('Producto agregado correctamente');

      await fs.promises.writeFile(this.path, JSON.stringify(cartsJSON, null, '\t'));

      // retorno el producto
      return cartsJSON[cartIndex].products[productIndex];
    } catch (error) {
      throw error;
    }
  }
}
