interface ListProjectsProps {
  project: {
    id: string
    name: string
    description: string
    imagesUrl: string[]
    repositoryUrl: string
    projectUrl: string
    technologies: string[]
    userId: string
    createdAt: Date | null
    updatedAt: Date | null
  }[]
}

export const checkProjectExists = (
  { project }: ListProjectsProps,
  projectName: string,
) => {
  return project.some((project) => project.name === projectName)
}
