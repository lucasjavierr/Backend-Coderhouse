import { cartsModel } from '../../models/carts.model.js'

export class CartsManagerMongo {
  constructor () {
    this.model = cartsModel
  }

  // obtiene todos los carritos
  async getCarts () {
    try {
      const carts = await this.model
        .find()
        .populate('products.productId')
        .lean()
      if (carts.length === 0) {
        throw new Error('No hay carritos creados hasta el momento.')
      }
      return carts
    } catch (error) {
      console.log('getCarts:', error.message)
      throw new Error('No se pudieron obtener los carritos.')
    }
  }

  // obtener un carrito por un ID
  async getCartById (cartId) {
    try {
      const cart = await this.model
        .findById(cartId)
        .populate('products.productId')
        .lean()
      if (!cart) {
        throw new Error(`El carrito con el ID: '${cartId}' no existe.`)
      }
      return cart
    } catch (error) {
      console.log('getCartById:', error.message)
      throw new Error('No se pudo encontrar el carrito.')
    }
  }

  // crear un carrito
  async createCart () {
    try {
      const newCart = {}
      const cart = await this.model.create(newCart)
      return cart
    } catch (error) {
      console.log('createCart:', error.message)
      throw new Error('No se pudo crear el carrito.')
    }
  }

  // añadir un producto a un carrito
  async addProduct (cartId, productId) {
    try {
      const cart = await this.getCartById(cartId)
      if (!cart) {
        throw new Error(`El carrito con el ID: '${cartId}' no existe.`)
      }

      const productIndex = cart.products.findIndex(
        (prod) => prod.productId._id.toString() === productId
      )

      // si el producto no existe en el carrito, lo agrega
      if (productIndex === -1) {
        cart.products.push({ productId, quantity: 1 })
      } else {
        cart.products[productIndex].quantity++
      }

      const updateCart = await this.model
        .findByIdAndUpdate(cartId, cart, { new: true })
        .populate('products.productId')

      return updateCart
    } catch (error) {
      console.log('addProduct:', error.message)
      throw new Error('No se pudo agregar el producto al carrito.')
    }
  }

  // actualiza la informacion del carrito, con lo que le pasemos por el body
  async updateCart (cartId, newCartInfo) {
    try {
      const cart = await this.getCartById(cartId)
      if (!cart) {
        throw new Error(`El carrito con el ID: '${cartId}' no existe.`)
      }

      const updatedCart = await this.model
        .findByIdAndUpdate(cartId, { products: newCartInfo }, { new: true })
        .populate('products.productId')

      return updatedCart
    } catch (error) {
      console.log('updateCart:', error.message)
      throw new Error('No se pudo agregar el producto al carrito.')
    }
  }

  // actualiza solo la cantidad de un producto del carrito, con el número que le pasemos por el body
  async updateProductQuantity (cartId, productId, newQuantity) {
    try {
      const cart = await this.getCartById(cartId)
      if (!cart) {
        throw new Error(`El carrito con el ID: '${cartId}' no existe.`)
      }

      const productIndex = cart.products.findIndex(
        (prod) => prod.productId._id.toString() === productId
      )

      // si el producto no existe en el carrito, lanzo un error
      if (productIndex === -1) {
        throw new Error(
          'No se puede actualizar la cantidad porque el producto no se agregó al carrito'
        )
      }

      // luego verifico si el dato ingresado es de tipo numérico
      if (typeof newQuantity !== 'number') {
        throw new Error('La cantidad ingresada debe ser de tipo numérico.')
      }

      // si es asi, actualizo la cantidad del producto
      cart.products[productIndex].quantity = newQuantity

      const updateCart = await this.model
        .findByIdAndUpdate(cartId, cart, { new: true })
        .populate('products.productId')

      return updateCart
    } catch (error) {
      console.log('updateProductQuantity', error.message)
      throw new Error('No se pudo actualizar la cantidad del producto.')
    }
  }

  // eliminar solo un producto del carrito
  async deleteProduct (cartId, productId) {
    try {
      const cart = await this.getCartById(cartId)
      if (!cart) {
        throw new Error(`El carrito con el ID: '${cartId}' no existe.`)
      }

      const productExist = cart.products.some(
        (prod) => prod.productId._id.toString() === productId
      )
      if (!productExist) {
        throw new Error(
          'El producto que quiere eliminar no se encuentra en el carrito.'
        )
      }

      const newProducts = cart.products.filter(
        (prod) => prod.productId._id.toString() !== productId
      )

      const updateCart = await this.model
        .findByIdAndUpdate(cartId, { products: newProducts }, { new: true })
        .populate('products.productId')

      return updateCart
    } catch (error) {
      console.log('deleteProduct:', error.message)
      throw new Error('No se pudo eliminar el producto del carrito.')
    }
  }

  // elimina los elementos de cart.products, pero el carrito sigue existiendo
  async clearCart (cartId) {
    try {
      const cart = await this.getCartById(cartId)
      if (!cart) {
        throw new Error(`El carrito con el ID: '${cartId}' no existe.`)
      }

      const newProducts = []

      const updateCart = await this.model
        .findByIdAndUpdate(cartId, { products: newProducts }, { new: true })
        .populate('products.productId')

      return updateCart
    } catch (error) {
      console.log('clearCart:', error.message)
      throw new Error('No se pudo eliminar el carrito.')
    }
  }

  // elimina todo el carrito
  async deleteCart (cartId) {
    try {
      const cartDeleted = await this.model.findByIdAndDelete(cartId)
      if (!cartDeleted) {
        throw new Error(`El carrito con el ID: '${cartId}' no existe.`)
      }
      return cartDeleted
    } catch (error) {
      console.log('deleteCart:', error.message)
      throw new Error('No se pudo eliminar el carrito.')
    }
  }
}
