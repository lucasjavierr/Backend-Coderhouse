export class CustomError {
  static createError ({ name = 'Error', cause, message, errorCode = 1 }) {
    const error = new Error(message)
    error.name = name
    error.cause = cause
    error.code = errorCode
    console.log('CustomError', error)
    throw error
  }
}
