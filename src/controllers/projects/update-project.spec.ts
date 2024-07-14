import { describe, it, expect, vitest } from "vitest"

import { UpdateProjectController } from "./update-project"
import { UpdateProjectUseCase } from "../../use-cases/index"

import { UpdateProjectParams } from "../../@types/update-project"

import { faker } from "@faker-js/faker"

describe("Update Project Controller", () => {
  const project = {
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    description: faker.lorem.paragraph(),
    imagesUrl: [faker.internet.url()],
    repositoryUrl: faker.internet.url(),
    projectUrl: faker.internet.url(),
    technologies: [faker.lorem.word()],
    userId: faker.string.uuid(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  }

  const user = {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  class PostgresUpdateProjectRepositoryStub {
    async execute(updateParams: UpdateProjectParams) {
      const { name } = updateParams.updateParams
      return { ...project, name: name || "" }
    }
  }

  class PostgresGetProjectByIdRepositoryStub {
    async execute() {
      return project
    }
  }

  class PostgresGetUserByIdRepositoryStub {
    async execute() {
      return user
    }
  }

  class PostgresGetProjectsByUserIdRepositoryStub {
    async execute() {
      return [project]
    }
  }

  const makeSut = () => {
    const postgresUpdateProjectRepositoryStub =
      new PostgresUpdateProjectRepositoryStub()
    const postgresGetProjectByIdRepositoryStub =
      new PostgresGetProjectByIdRepositoryStub()
    const postgresGetUserByIdRepositoryStub =
      new PostgresGetUserByIdRepositoryStub()
    const postgresGetProjectsByUserIdRepositoryStub =
      new PostgresGetProjectsByUserIdRepositoryStub()

    const updateProjectUseCase = new UpdateProjectUseCase(
      postgresUpdateProjectRepositoryStub,
      postgresGetProjectByIdRepositoryStub,
      postgresGetUserByIdRepositoryStub,
      postgresGetProjectsByUserIdRepositoryStub,
    )

    const sut = new UpdateProjectController(updateProjectUseCase)

    return {
      sut,
      postgresUpdateProjectRepositoryStub,
      postgresGetProjectByIdRepositoryStub,
      postgresGetUserByIdRepositoryStub,
      postgresGetProjectsByUserIdRepositoryStub,
    }
  }

  it("should return 200 if project is updated", async () => {
    const { sut } = makeSut()

    const result = await sut.execute({
      projectId: project.id,
      userId: project.userId,
      updateParams: {
        name: "new name",
      },
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({ ...project, name: "new name" })
  })

  it("should return 400 if project id missing", async () => {
    const { sut } = makeSut()

    const result = await sut.execute({
      projectId: "",
      userId: project.userId,
      updateParams: {
        name: "new name",
      },
    })

    expect(result.statusCode).toBe(400)
  })
})
