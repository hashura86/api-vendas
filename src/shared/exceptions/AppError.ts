class AppError {
  readonly message: string
  readonly code: number

  constructor(message = 'Ocorreu um erro!', code = 400) {
    this.message = message
    this.code = code
  }
}

export default AppError
