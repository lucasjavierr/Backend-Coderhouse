import { app } from "../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import { cartsModel } from "../src/dao/models/carts.model.js";
import { usersModel } from "../src/dao/models/users.model.js";
import { productsModel } from "../src/dao/models/products.model.js";

const requester = supertest( app )

describe( 'Pruebas para los módulos de carritos', async function () {

  const userMock = {
    firstName: 'Lucas',
    lastName: 'Javier',
    age: 19,
    gender: 'masculino',
    email: 'test@coder.com',
    password: 'abc123'
  }
  const productMock = {
    title: 'test',
    description: 'test description',
    price: 123,
    category: 'storage',
    stock: 10,
    thumbnail: 'https://alfaomegaeditor.com.ar/wp-content/uploads/2023/02/unnamed.png'
  }
  const productsArray = [
    {
      title: 'Laptop XYZ',
      description: 'Potente portátil para juegos y productividad',
      price: 1299.99,
      category: 'notebook',
      stock: 50,
      thumbnail: 'laptop_thumbnail.jpg',
    },
    {
      title: 'Procesador Intel Core i7',
      description: 'Procesador de alto rendimiento para computadoras de escritorio',
      price: 399.99,
      category: 'processor',
      stock: 20,
      thumbnail: 'processor_thumbnail.jpg',
    },
    {
      title: 'Tarjeta gráfica NVIDIA GeForce RTX 3080',
      description: 'Tarjeta gráfica de última generación para juegos',
      price: 799.99,
      category: 'graphic-card',
      stock: 10,
      thumbnail: 'graphics_card_thumbnail.jpg',
    },
  ];

  before( async function () {
    await usersModel.deleteMany( {} )
    await cartsModel.deleteMany( {} )
    await productsModel.deleteMany( {} )
  } )

  it( 'Cuando un usuario se registra, se crea un carrito que estará asociado a ese usuario', async function () {
    // registrar al usuario
    const responseRegister = await requester.post( '/api/sessions/signup' ).send( userMock )
    expect( responseRegister.body.status ).to.be.equal( 'success' )
    expect( responseRegister.body.message ).to.be.equal( 'Usuario registrado correctamente' )

    // loguear al usuario
    const responseLogin = await requester.post( '/api/sessions/login' ).send( { email: userMock.email, password: userMock.password } )
    expect( responseLogin.body.status ).to.be.equal( 'success' )
    expect( responseLogin.body.message ).to.be.equal( 'Iniciaste sesión correctamente' )

    // obtener el carrito del usuario
    const response = await requester
      .post( '/api/sessions/current' )
      .set( 'Cookie', responseLogin.header[ 'set-cookie' ] )
    expect( response.body.status ).to.be.equal( 'success' )
    expect( response.body.user ).to.have.property( 'cart' )

    const cartId = response.body.user.cart
    // comprobar que existe 
    const cartExist = await requester
      .get( `/api/carts/${ cartId }` )
      .set( 'Cookie', responseLogin.header[ 'set-cookie' ] )
    expect( cartExist.body.status ).to.be.equal( 'success' )
    expect( cartExist.body.data ).to.have.property( '_id' )
    expect( cartExist.body.data._id ).to.be.equal( cartId )
  } )

  it( 'El usuario puede agregar productos a su carrito correctamente', async function () {
    // loguear al usuario
    const responseLogin = await requester.post( '/api/sessions/login' ).send( { email: userMock.email, password: userMock.password } )
    expect( responseLogin.body.status ).to.be.equal( 'success' )
    expect( responseLogin.body.message ).to.be.equal( 'Iniciaste sesión correctamente' )

    // creo el producto para añadir al carrito
    const responseCreate = await requester
      .post( '/api/products' )
      .set( 'Cookie', responseLogin.header[ 'set-cookie' ] )
      .send( productMock )

    const productId = responseCreate.body.data._id

    // obtengo el carrito del usuario
    const responseUserCart = await requester
      .post( '/api/sessions/current' )
      .set( 'Cookie', responseLogin.header[ 'set-cookie' ] )
    expect( responseUserCart.body.status ).to.be.equal( 'success' )
    expect( responseUserCart.body.user ).to.have.property( 'cart' )

    const cartId = responseUserCart.body.user.cart
    const response = await requester
      .post( `/api/carts/${ cartId }/product/${ productId }` )
      .set( 'Cookie', responseLogin.header[ 'set-cookie' ] )
    expect( response.body.data._id ).to.be.equal( cartId )
    expect( response.body.data.products[ 0 ].productId ).to.have.property( '_id', productId )
  } )

  it( 'El usuario puede limpiar su carrito y dejarlo vacío (sin eliminarlo)', async function () {
    // loguear al usuario
    const responseLogin = await requester.post( '/api/sessions/login' ).send( { email: userMock.email, password: userMock.password } )
    expect( responseLogin.body.status ).to.be.equal( 'success' )
    expect( responseLogin.body.message ).to.be.equal( 'Iniciaste sesión correctamente' )

    // obtengo el carrito del usuario
    const responseUserCart = await requester
      .post( '/api/sessions/current' )
      .set( 'Cookie', responseLogin.header[ 'set-cookie' ] )
    const cartId = responseUserCart.body.user.cart
    expect( responseUserCart.body.status ).to.be.equal( 'success' )
    expect( responseUserCart.body.user ).to.have.property( 'cart' )

    const responseClear = await requester
      .delete( `/api/carts/${ cartId }` )
      .set( 'Cookie', responseLogin.header[ 'set-cookie' ] )
    expect( responseClear.body.status ).to.be.equal( 'success' )
    expect( responseClear.body.data ).to.have.property( '_id', cartId )
    expect( responseClear.body.data.products ).to.be.deep.equal( [] )
  } )
} )