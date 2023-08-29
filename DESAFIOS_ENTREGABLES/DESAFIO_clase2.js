class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos deben estar completos");
      return;
    }

    if (this.products.some((elm) => elm.code === code)) {
      console.log("No se puede crear el producto porque este código ya existe");
      return;
    }

    let newId;
    if (this.products == 0) {
      newId = 1;
    } else {
      newId = this.products[this.products.length - 1].id + 1;
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

    this.products.push(newProduct);
    console.log("Producto creado correctamente");
  }

  getProductById(id) {
    const product =
      this.products.find((elm) => elm.id === id) ||
      "El producto no se ha encontrado";
    return product;
  }
}

const manager = new ProductManager();

manager.addProduct("Ryzen 9", "Procesador", 700, "sin foto", "abc123", 160);
// manager.addProduct("Ryzen 9", "Procesador", 700, "sin foto", "abc123", 160);
manager.addProduct("Ryzen 9", "Procesador", 700, "sin foto", "abc132", 200);
// console.log(manager.getProductById(34));
console.log(manager.getProducts());
