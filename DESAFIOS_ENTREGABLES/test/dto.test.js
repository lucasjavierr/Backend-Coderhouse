import { expect } from "chai"
import { createHash } from "../src/utils.js"
import { UsersDto } from "../src/DTOs/users.dto.js"

describe( 'Pruebas de bcrypt y dto', () => {

  it( 'EL servicio debe realizar un hasheo efectivo de la contraseña (debe corroborarse que el resultado sea diferente a la contraseña original)', async function () {
    const password = 'abc123'
    const result = await createHash( password )
    const hashExp = /(?=[A-Za-z0-9@#$%/^.,{}&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g

    expect( hashExp.test( result ) ).to.be.equal( true )
    expect( result ).to.not.be.equal( password )
  } )

  it( 'Por parte del DTO del usuario: Corroborar que el DTO no devuelva la propiedad "password"', async function () {
    const userMock = {
      firstName: 'Lucas',
      lastName: 'Javier',
      age: 19,
      gender: 'masculino',
      email: 'santilujavier@coder.com',
      password: 'abc123',
      cart: '6525b05f6d9f1c50835332d1',
      role: 'ADMIN'
    }
    const result = new UsersDto( userMock )
    expect( result ).to.have.property( 'name' )
    expect( result ).to.not.have.property( 'password' )
    expect( result.name ).to.be.equal( `${ userMock.firstName } ${ userMock.lastName }` )
  } )
} )