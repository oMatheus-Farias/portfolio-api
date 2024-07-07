export class ProjectNameAlreadyExistsError extends Error {
  constructor(name: string) {
    super(`Project name ${name} already exists`)
    this.name = "ProjectNameAlreadyExistsError"
  }
}
