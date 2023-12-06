export class UsersDto {
  constructor (userInfo) {
    this.firstName = userInfo.firstName
    this.email = userInfo.email
    this.role = userInfo.role
  }
}
