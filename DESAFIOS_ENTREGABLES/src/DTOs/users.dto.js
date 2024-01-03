export class UsersDto {
  constructor ( userInfo ) {
    this.firstName = userInfo.firstName
    this.email = userInfo.email
    this.cart = userInfo.cart
    this.role = userInfo.role
    this.isAdmin = userInfo.role === 'ADMIN'
  }
}
