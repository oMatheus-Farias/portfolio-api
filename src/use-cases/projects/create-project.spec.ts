import { describe, it, expect, vitest } from "vitest"

import { CreateProjectUseCase } from "./create-project"

import { faker } from "@faker-js/faker"
import { ProjectNameAlreadyExistsError } from "../../errors"

describe("Create Project UseCase", () => {
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

    const sut = new CreateProjectUseCase(
      postgresCreateProjectRepositoryStub,
      postgresGetProjectByNameRepositoryStub,
    )

    return {
      sut,
      postgresCreateProjectRepositoryStub,
      postgresGetProjectByNameRepositoryStub,
    }
  }

  it("should successfully create a project", async () => {
    const { sut } = makeSut()

    const result = await sut.execute({ params: project })

    expect(result).not.toBeNull()
    expect(result).toEqual(project)
  })

  it("should throw ProjectNameAlreadyExistsError if project name already exists", async () => {
    const { sut, postgresGetProjectByNameRepositoryStub } = makeSut()

    vitest
      .spyOn(postgresGetProjectByNameRepositoryStub, "execute")
      .mockRejectedValueOnce(new ProjectNameAlreadyExistsError(project.name))

    const result = sut.execute({ params: project })

    await expect(result).rejects.toThrowError(
      new ProjectNameAlreadyExistsError(project.name),
    )
  })
})
