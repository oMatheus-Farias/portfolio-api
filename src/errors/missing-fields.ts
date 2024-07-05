export class MissingFieldsError extends Error {
  constructor() {
    super("Missing required fields")
    this.name = "MissingFieldsError"
  }
}
