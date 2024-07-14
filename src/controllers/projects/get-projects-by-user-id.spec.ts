import { describe, it, expect, vitest } from "vitest"

import { GetProjectsByUserIdController } from "./get-projects-by-user-id"
import { GetProjectsByUserIdUseCase } from "../../use-cases"

import { faker } from "@faker-js/faker"

describe("Get Projects By User Id Controller", () => {
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

    const getProjectsByUserIdUseCase = new GetProjectsByUserIdUseCase(
      postgresGetProjectsByUserIdRepositoryStub,
      postgresGetUserByIdRepositoryStub,
    )

    const sut = new GetProjectsByUserIdController(getProjectsByUserIdUseCase)

    return {
      sut,
      postgresGetProjectsByUserIdRepositoryStub,
      postgresGetUserByIdRepositoryStub,
    }
  }

  it("should return 200 if projects are found", async () => {
    const { sut } = makeSut()

    const result = await sut.execute(user.id)

    expect(result).toEqual({
      statusCode: 200,
      body: [project],
    })
  })
})
