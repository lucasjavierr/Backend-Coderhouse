import { app } from "../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import { usersModel } from "../src/dao/models/users.model.js";
import { cartsModel } from "../src/dao/models/carts.model.js";

/* process.env.NODE_ENVIRONMENT = 'development'
process.env.PERSISTENCE = 'mongo' */
const requester = supertest( app )

describe( 'Pruebas para los módulos de sesiones', async function () {

  const userMock = {
    firstName: 'Lucas',
    lastName: 'Javier',
    age: 19,
    gender: 'masculino',
    email: 'test@coder.com',
    password: 'abc123'
  }

  before( async function () {
    await usersModel.deleteMany( {} )
    await cartsModel.deleteMany( {} )
  } )

  it( 'El endpoint POST /api/sessions/signup permite registrar a un usuario', async function () {
    const response = await requester.post( '/api/sessions/signup' ).send( userMock )
    expect( response.body.status ).to.be.equal( 'success' )
    expect( response.body.message ).to.be.equal( 'Usuario registrado correctamente' )
  } )

  it( 'El endpoint POST /api/sessions/login permite al usuario loguearse correctamente', async function () {
    const response = await requester.post( '/api/sessions/login' ).send( { email: userMock.email, password: userMock.password } )
    expect( response.body.status ).to.be.equal( 'success' )
    expect( response.body.message ).to.be.equal( 'Iniciaste sesión correctamente' )
    expect( response.header ).to.have.deep.property( 'set-cookie' )
  } )

  it( 'El endpoint POST /api/sessions/login redirecciona a a la ruta /fail-login si pasamos datos incorrectos o vacíos', async function () {
    const responseEmptyValues = await requester.post( '/api/sessions/login' ).send( { email: '', password: '' } )
    expect( responseEmptyValues.statusCode ).to.be.equal( 302 )
    expect( responseEmptyValues.redirect ).to.be.equal( true )
    expect( responseEmptyValues.headers.location ).to.be.equal( '/api/sessions/fail-login' )

    const responseInvalidValues = await requester.post( '/api/sessions/login' ).send( { email: userMock.email, password: 'abc1234' } )
    expect( responseInvalidValues.statusCode ).to.be.equal( 302 )
    expect( responseEmptyValues.redirect ).to.be.equal( true )
    expect( responseInvalidValues.headers.location ).to.be.equal( '/api/sessions/fail-login' )
  } )

  it( 'El endpoint POST /api/sessions/current devuelve un status 401 si el usuario intenta acceder a la ruta sin loguearse', async function () {
    const response = await requester.post( '/api/sessions/current' )
    expect( response.statusCode ).to.be.equal( 401 )
    expect( response.body.status ).to.be.equal( 'error' )
    expect( response.body ).to.have.property( 'message', 'Debes iniciar sesión para acceder a esta ruta' )
  } )
} )
