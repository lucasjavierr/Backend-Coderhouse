import { app } from "../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import { productsModel } from "../src/dao/models/products.model.js";
import { usersModel } from "../src/dao/models/users.model.js";
import { cartsModel } from "../src/dao/models/carts.model.js";

const requester = supertest( app )

describe( 'Pruebas para los módulos de productos', function () {

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
    await productsModel.deleteMany( {} )
    await usersModel.deleteMany( {} )
    await cartsModel.deleteMany( {} )
  } )

  it( 'GET /api/products devuelve el listado de productos correctamente', async function () {
    const response = await requester.get( '/api/products' )
    expect( response.body.status ).to.be.equal( 'success' )
    expect( response.body.dataProducts ).to.have.property( 'payload' )
    expect( Array.isArray( response.body.dataProducts.payload ) ).to.be.deep.equal( true )
  } )

  it( 'GET /api/products realiza el filtro por categoría correctamente', async function () {
    // registrar al usuario
    const responseRegister = await requester.post( '/api/sessions/signup' ).send( userMock )
    expect( responseRegister.body.status ).to.be.equal( 'success' )
    expect( responseRegister.body.message ).to.be.equal( 'Usuario registrado correctamente' )

    // loguear al usuario
    const responseLogin = await requester.post( '/api/sessions/login' ).send( { email: userMock.email, password: userMock.password } )
    expect( responseLogin.body.status ).to.be.equal( 'success' )
    expect( responseLogin.body.message ).to.be.equal( 'Iniciaste sesión correctamente' )

    // crear el producto
    const responseCreate = await requester
      .post( '/api/products' )
      .set( 'Cookie', responseLogin.headers[ 'set-cookie' ] )
      .send( productMock )
    expect( responseCreate.body.status ).to.be.equal( 'success' )
    expect( responseCreate.body.data ).to.have.property( '_id' )
    expect( responseCreate.body.data ).to.have.property( '__v' )

    // const response = await requester.get( '/api/products?category=storage' )
    const response = await requester.get( '/api/products' ).query( { category: 'storage' } )
    expect( response.body.status ).to.be.equal( 'success' )
    expect( response.body.dataProducts ).to.have.property( 'payload' )
    expect( Array.isArray( response.body.dataProducts.payload ) ).to.be.deep.equal( true )
    expect( response.body.dataProducts.payload[ 0 ] ).to.have.property( 'category', 'storage' )
  } )

  it( 'POST /api/products puede crear productos correctamente (solamente lo pueden hacer los usuarios ADMIN o PREMIUM)', async function () {
    // loguear al usuario
    const responseLogin = await requester.post( '/api/sessions/login' ).send( { email: userMock.email, password: userMock.password } )
    expect( responseLogin.body.status ).to.be.equal( 'success' )
    expect( responseLogin.body.message ).to.be.equal( 'Iniciaste sesión correctamente' )

    for ( let prod of productsArray ) {
      const response = await requester
        .post( '/api/products' )
        .set( 'Cookie', responseLogin.headers[ 'set-cookie' ] )
        .send( prod )
      expect( response.body.status ).to.be.equal( 'success' )
      expect( response.body.data ).to.have.property( '_id' )
      expect( response.body.data ).to.have.property( '__v' )
    }
  } )
} )