export class ProductManagerMemory {
  constructor () {
    this.products = [];
  }

  getProducts () {
    return this.products;
  }

  addProduct (title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('Todos los campos deben estar completos');
      return;
    }

    if (this.products.some((elm) => elm.code === code)) {
      console.log('No se puede crear el producto porque este código ya existe');
      return;
    }

    let newId;
    if (this.products === 0) {
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
      id: newId
    };

    this.products.push(newProduct);
    console.log('Producto creado correctamente');
  }

  getProductById (id) {
    const product = this.products.find((elm) => elm.id === id);
    if (!product) {
      throw new Error('El producto ingresado no existe');
    }
    return product;
  }

  updateProduct (idProduct, fieldsToUpdate, newValue) {
    const productToUpdate = this.products.find((prod) => prod.id === idProduct);
    if (!productToUpdate) {
      throw new Error(`El producto con el ID ${idProduct} no existe`);
    }
    productToUpdate[fieldsToUpdate] = newValue;
    console.log('Producto actualizado');
  }

  deleteProduct (idProduct) {
    const productsUpdated = this.products.filter(
      (prod) => prod.id !== idProduct
    );
    this.products = productsUpdated;
    console.log('Producto eliminado correctamente');
  }
}

// const manager = new ProductManagerMemory();

/* manager.addProduct(
  "AMD Ryzen 9 7950X 3D-V Cache",
  "Procesador",
  700,
  "sin foto",
  "abc123",
  160
); */
// manager.addProduct("Ryzen 9", "Procesador", 700, "sin foto", "abc123", 160);
// manager.addProduct("Ryzen 9", "Procesador", 700, "sin foto", "abc132", 200);
// console.log(manager.getProductById(34));
// manager.updateProduct(2, "title", "Intel Core i9-13900K");
// console.log(manager.getProducts());
