import { CustomError } from '../services/errors/customError.service.js'
import { EError } from '../enums/EError.js'
import { UsersService } from '../services/users.service.js'
import { userIdParamError } from '../services/errors/invalidParamError.service.js'
import { USER_ROLE_TYPES } from '../enums/constants.js'

export class UsersController {
  static getUser = async ( req, res, next ) => {
    try {
      const { userId } = req.params
      if ( Number.isNaN( parseInt( userId ) ) ) {
        CustomError.createError( {
          name: 'Get user error',
          cause: userIdParamError( userId ),
          message: 'ID invalido',
          errorCode: EError.INVALID_PARAM
        } )
      }
      const user = await UsersService.getUserById( userId )
      res.json( { status: 'success', data: user } )
    } catch ( error ) {
      next( error )
    }
  }

  static modifyRole = async ( req, res ) => {
    try {
      const userId = req.params.userId
      const user = await UsersService.getUserById( userId )

      if ( user.role === USER_ROLE_TYPES.PREMIUM ) {
        user.role = USER_ROLE_TYPES.USER
      } else if ( user.role === USER_ROLE_TYPES.USER ) {
        user.role = USER_ROLE_TYPES.PREMIUM
      } else {
        res.json( { status: 'error', message: 'No se puede actualizar el rol del usuario' } )
      }

      await UsersService.updateUser( user._id, user )
      res.json( { status: 'success', message: 'Rol de usuario modificado correctamente' } )
    } catch ( error ) {
      next( error )
    }
  }
}
