export class ProjectNameAlreadyExistsError extends Error {
  constructor(name: string) {
    super(`Project name ${name} already exists`)
    this.name = "ProjectNameAlreadyExistsError"
  }
}

export class ProjectNotFoundError extends Error {
  constructor(projectName?: string) {
    projectName
      ? super(`Project with name ${projectName} not found`)
      : super("Project not found")
    this.name = "ProjectNotFoundError"
  }
}
