import { describe, it, expect, vitest } from "vitest"

import { UpdateProjectUseCase } from "./update-project"

import { faker } from "@faker-js/faker"
import { UpdateProjectParams } from "../../@types/update-project"

import {
  ProjectNameAlreadyExistsError,
  ProjectNotFoundError,
  UserNotFoundError,
  UserUnauthorizedError,
} from "../../errors"

describe("Update Project UseCase", () => {
  const user = {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  const project = {
    id: faker.string.uuid(),
    name: "Name",
    description: faker.lorem.paragraph(),
    imagesUrl: [faker.internet.url()],
    repositoryUrl: faker.internet.url(),
    projectUrl: faker.internet.url(),
    technologies: [faker.lorem.word()],
    userId: user.id,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
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

    const sut = new UpdateProjectUseCase(
      postgresUpdateProjectRepositoryStub,
      postgresGetProjectByIdRepositoryStub,
      postgresGetUserByIdRepositoryStub,
      postgresGetProjectsByUserIdRepositoryStub,
    )

    return {
      sut,
      postgresUpdateProjectRepositoryStub,
      postgresGetProjectByIdRepositoryStub,
      postgresGetUserByIdRepositoryStub,
      postgresGetProjectsByUserIdRepositoryStub,
    }
  }

  it("should successfully update project", async () => {
    const { sut } = makeSut()

    const result = await sut.execute({
      userId: project.userId,
      projectId: project.id,
      updateParams: {
        name: "New Name",
      },
    })

    expect(result).not.toBeNull()
    expect(result.name).toEqual("New Name")
  })

  it("should throw ProjectNotFoundError if project does not exist", async () => {
    const { sut, postgresGetProjectByIdRepositoryStub } = makeSut()

    vitest
      .spyOn(postgresGetProjectByIdRepositoryStub, "execute")
      .mockRejectedValueOnce(new ProjectNotFoundError())

    const result = sut.execute({
      userId: project.userId,
      projectId: project.id,
      updateParams: {
        name: "New Name",
      },
    })

    await expect(result).rejects.toThrow(new ProjectNotFoundError())
  })

  it("should throw UserNotFoundError if user does not exist", async () => {
    const { sut, postgresGetUserByIdRepositoryStub } = makeSut()

    vitest
      .spyOn(postgresGetUserByIdRepositoryStub, "execute")
      .mockRejectedValueOnce(new UserNotFoundError())

    const result = sut.execute({
      userId: project.userId,
      projectId: project.id,
      updateParams: {
        name: "New Name",
      },
    })

    await expect(result).rejects.toThrow(new UserNotFoundError())
  })

  it("should throw UserUnauthorizedError if user is not the owner of the project", async () => {
    const { sut } = makeSut()

    const result = sut.execute({
      userId: faker.string.uuid(),
      projectId: project.id,
      updateParams: {
        name: "New Name",
      },
    })

    await expect(result).rejects.toThrow(new UserUnauthorizedError())
  })

  it("should throw ProjectNameAlreadyExistsError if project name already exists", async () => {
    const { sut } = makeSut()

    const result = sut.execute({
      userId: project.userId,
      projectId: project.id,
      updateParams: {
        name: project.name,
      },
    })

    await expect(result).rejects.toThrow(
      new ProjectNameAlreadyExistsError(project.name),
    )
  })
})
