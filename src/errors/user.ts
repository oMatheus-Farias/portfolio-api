export class EmailAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`Email ${email} already exists`)
    this.name = "EmailAlreadyExistsError"
  }
}

export class UserNotFoundError extends Error {
  constructor(email?: string) {
    email
      ? super(`User with email ${email} not found`)
      : super("User not found")
    this.name = "UserNotFoundError"
  }
}
