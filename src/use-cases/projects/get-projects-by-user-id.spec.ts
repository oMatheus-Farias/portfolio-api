import { describe, it, expect, vitest } from "vitest"

import { GetProjectsByUserIdUseCase } from "./get-projects-by-user-id"

import { faker } from "@faker-js/faker"
import { UserNotFoundError } from "../../errors"

describe("Get Projects By User Id UseCase", () => {
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

  class PostgresGetProjectsByUserIdRepositoryStub {
    async execute() {
      return [project]
    }
  }

  class PostgresGetUserByIdRepositoryStub {
    async execute() {
      return user
    }
  }

  const makeSut = () => {
    const postgresGetProjectsByUserIdRepositoryStub =
      new PostgresGetProjectsByUserIdRepositoryStub()

    const postgresGetUserByIdRepositoryStub =
      new PostgresGetUserByIdRepositoryStub()

    const sut = new GetProjectsByUserIdUseCase(
      postgresGetProjectsByUserIdRepositoryStub,
      postgresGetUserByIdRepositoryStub,
    )

    return {
      sut,
      postgresGetProjectsByUserIdRepositoryStub,
      postgresGetUserByIdRepositoryStub,
    }
  }

  it("should successfully get projects by user id", async () => {
    const { sut } = makeSut()

    const result = await sut.execute(user.id)

    expect(result).not.toBeNull()
    expect(result).toEqual([project])
  })

  it("should throw UserNotFoundError if user does not exist", async () => {
    const { sut, postgresGetUserByIdRepositoryStub } = makeSut()

    vitest
      .spyOn(postgresGetUserByIdRepositoryStub, "execute")
      .mockRejectedValueOnce(new UserNotFoundError())

    const result = sut.execute(user.id)

    await expect(result).rejects.toThrow(new UserNotFoundError())
  })

  it("should return an empty array if user has no projects", async () => {
    const { sut, postgresGetProjectsByUserIdRepositoryStub } = makeSut()

    vitest
      .spyOn(postgresGetProjectsByUserIdRepositoryStub, "execute")
      .mockResolvedValueOnce([])

    const result = await sut.execute(user.id)

    expect(result).toEqual([])
  })
})
