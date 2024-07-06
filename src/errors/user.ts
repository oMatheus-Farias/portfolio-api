export class EmailAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`Email ${email} already exists`)
    this.name = "EmailAlreadyExistsError"
  }
}

export class UserNotFoundError extends Error {
  constructor(email: string) {
    super(`User with email ${email} not found`)
    this.name = "UserNotFoundError"
  }
}
