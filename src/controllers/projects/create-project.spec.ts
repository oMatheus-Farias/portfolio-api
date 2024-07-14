import { describe, it, expect, vitest } from "vitest"

import { CreateProjectController } from "./create-project"
import { CreateProjectUseCase } from "../../use-cases"

import { faker } from "@faker-js/faker"

describe("Create Project Controller", () => {
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

  class PostgresCreateProjectRepositoryStub {
    async execute() {
      return project
    }
  }

  class PostgresGetProjectByNameRepositoryStub {
    async execute() {
      return null
    }
  }

  const makeSut = () => {
    const postgresCreateProjectRepositoryStub =
      new PostgresCreateProjectRepositoryStub()
    const postgresGetProjectByNameRepositoryStub =
      new PostgresGetProjectByNameRepositoryStub()

    const createProjectUseCase = new CreateProjectUseCase(
      postgresCreateProjectRepositoryStub,
      postgresGetProjectByNameRepositoryStub,
    )

    const sut = new CreateProjectController(createProjectUseCase)

    return {
      sut,
      postgresCreateProjectRepositoryStub,
      postgresGetProjectByNameRepositoryStub,
    }
  }

  it("should return 201 if project is created", async () => {
    const { sut } = makeSut()

    const response = await sut.execute({
      httpRequest: project,
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toBe(project)
  })

  it("should return 400 if project name already exists", async () => {
    const { sut, postgresGetProjectByNameRepositoryStub } = makeSut()

    vitest
      .spyOn(postgresGetProjectByNameRepositoryStub, "execute")
      .mockResolvedValueOnce(project)

    const response = await sut.execute({
      httpRequest: project,
    })

    expect(response.statusCode).toBe(400)
  })

  it("should return 500 if any error occurs", async () => {
    const { sut, postgresCreateProjectRepositoryStub } = makeSut()

    vitest
      .spyOn(postgresCreateProjectRepositoryStub, "execute")
      .mockRejectedValueOnce(new Error())

    const response = await sut.execute({
      httpRequest: project,
    })

    expect(response.statusCode).toBe(500)
  })
})
