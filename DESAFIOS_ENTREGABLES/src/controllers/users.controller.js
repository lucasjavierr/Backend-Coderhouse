import { CustomError } from '../services/errors/customError.service.js'
import { EError } from '../enums/EError.js'
import { UsersService } from '../services/users.service.js'
import { userIdParamError } from '../services/errors/invalidParamError.service.js'

export class UsersController {
  static getUser = ( req, res ) => {
    const { userId } = req.params
    if ( Number.isNaN( parseInt( userId ) ) ) {
      CustomError.createError( {
        name: 'Get user error',
        cause: userIdParamError( userId ),
        message: 'ID invalido',
        errorCode: EError.INVALID_PARAM
      } )
    }
    const user = UsersService.getUserById( userId )
    res.json( { status: 'success', data: user } )
  }
}
