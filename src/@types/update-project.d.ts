export interface UpdateProjectParams {
  userId: string
  projectId: string
  updateParams: {
    name?: string
    description?: string
    imagesUrl?: string[]
    repositoryUrl?: string
    projectUrl?: string
    technologies?: string[]
  }
}
