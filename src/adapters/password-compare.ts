import bcrypt from "bcrypt"

export class PasswordCompareAdapter {
  async execute(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword)
  }
}
