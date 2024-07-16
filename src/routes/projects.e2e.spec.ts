import { describe, it, expect } from "vitest"

import request from "supertest"
import { app } from "../app"

import { faker } from "@faker-js/faker"

describe("Projects routes E2E tests", () => {
  it("GET /api/project/name should return 200 when project is found", async () => {
    await request(app).post("/api/user").send({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: "teste@teste.com",
      password: "12345678",
    })

    const response = await request(app).post("/api/user/auth").send({
      email: "teste@teste.com",
      password: "12345678",
    })

    const { id, token } = response.body

    const { body } = await request(app)
      .post("/api/project")
      .send({
        name: faker.lorem.word(),
        description: faker.lorem.words(),
        imagesUrl: [faker.internet.url()],
        repositoryUrl: faker.internet.url(),
        projectUrl: faker.internet.url(),
        technologies: [faker.lorem.word()],
        userId: id,
      })
      .set("Authorization", `Bearer ${token}`)

    const name = body.name

    const _response = await request(app)
      .get("/api/project/name")
      .send({
        name,
      })
      .set("Authorization", `Bearer ${token}`)

    expect(_response.status).toBe(200)
    expect(_response.body.name).toBe(name)
  })

  it("GET /api/project/:id should return 200 when project is found", async () => {
    await request(app).post("/api/user").send({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: "teste@teste.com",
      password: "12345678",
    })

    const response = await request(app).post("/api/user/auth").send({
      email: "teste@teste.com",
      password: "12345678",
    })

    const { id, token } = response.body

    const { body } = await request(app)
      .post("/api/project")
      .send({
        name: faker.lorem.word(),
        description: faker.lorem.words(),
        imagesUrl: [faker.internet.url()],
        repositoryUrl: faker.internet.url(),
        projectUrl: faker.internet.url(),
        technologies: [faker.lorem.word()],
        userId: id,
      })
      .set("Authorization", `Bearer ${token}`)

    const projectId = body.id

    const _response = await request(app)
      .get(`/api/project/${projectId}`)
      .set("Authorization", `Bearer ${token}`)

    expect(_response.status).toBe(200)
  })
})
