import { describe, it, expect, vitest } from "vitest"

import { GetProjectByIdUseCase } from "./get-project-by-id"

import { faker } from "@faker-js/faker"
import { ProjectNotFoundError } from "../../errors"

describe("Get Project By Id UseCase", () => {
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

  class PostgresGetProjectByIdRepositoryStub {
    async execute() {
      return project
    }
  }

  const makeSut = () => {
    const postgresGetProjectByIdRepositoryStub =
      new PostgresGetProjectByIdRepositoryStub()

    const sut = new GetProjectByIdUseCase(postgresGetProjectByIdRepositoryStub)

    return {
      sut,
      postgresGetProjectByIdRepositoryStub,
    }
  }

  it("should successfully get a project by id", async () => {
    const { sut } = makeSut()

    const result = await sut.execute(project.id)

    expect(result).not.toBeNull()
    expect(result).toEqual(project)
  })

  it("should throw ProjectNotFoundError if project does not exist", async () => {
    const { sut, postgresGetProjectByIdRepositoryStub } = makeSut()

    vitest
      .spyOn(postgresGetProjectByIdRepositoryStub, "execute")
      .mockRejectedValueOnce(new ProjectNotFoundError())

    const result = sut.execute(project.id)

    await expect(result).rejects.toThrow(new ProjectNotFoundError())
  })
})
