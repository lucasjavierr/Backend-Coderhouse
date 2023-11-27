import { usersDao } from '../dao/index.js'

export class UsersService {
  static getUserById = async (userId) => {
    return usersDao.getUserById(userId)
  }

  static getUserByEmail = async (userEmail) => {
    return usersDao.getUserByEmail(userEmail)
  }

  static createUser = async (userInfo) => {
    return usersDao.createUser(userInfo)
  }
}
