import { describe, it, expect } from "vitest"

import request from "supertest"
import { app } from "../app"

import { faker } from "@faker-js/faker"

describe("Projects routes E2E tests", () => {
  it("GET /api/project/name/:name should return 200 when project is found", async () => {
    await request(app).post("/api/user").send({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: "teste1@teste.com",
      password: "12345678",
    })

    const response = await request(app).post("/api/user/auth").send({
      email: "teste1@teste.com",
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
      .get(`/api/project/name/${name}`)
      .set("Authorization", `Bearer ${token}`)

    expect(_response.status).toBe(200)
    expect(_response.body.name).toBe(name)
  })

  it("GET /api/project/:id should return 200 when project is found", async () => {
    await request(app).post("/api/user").send({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: "teste2@teste.com",
      password: "12345678",
    })

    const response = await request(app).post("/api/user/auth").send({
      email: "teste2@teste.com",
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

  it("GET /api/projects/:userId should return 200 when projects is found", async () => {
    await request(app).post("/api/user").send({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: "teste3@teste.com",
      password: "12345678",
    })

    const response = await request(app).post("/api/user/auth").send({
      email: "teste3@teste.com",
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

    const userId = body.userId

    const _response = await request(app)
      .get(`/api/projects/${userId}`)
      .set("Authorization", `Bearer ${token}`)

    expect(_response.status).toBe(200)
  })

  it("POST /api/project should return 201 when project is created", async () => {
    const teste = await request(app).post("/api/user").send({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: "teste4@teste.com",
      password: "12345678",
    })

    const response = await request(app).post("/api/user/auth").send({
      email: "teste4@teste.com",
      password: "12345678",
    })

    const { id, token } = response.body

    const _response = await request(app)
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

    expect(_response.status).toBe(201)
  })

  it("PATCH /api/project/:projectId should return 200 when project is updated", async () => {
    await request(app).post("/api/user").send({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: "teste5@teste.com",
      password: "12345678",
    })

    const response = await request(app).post("/api/user/auth").send({
      email: "teste5@teste.com",
      password: "12345678",
    })

    const { id, token } = response.body

    const _response = await request(app)
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

    const projectId = _response.body.id

    const _response2 = await request(app)
      .patch(`/api/project/${projectId}`)
      .send({
        userId: id,
        name: faker.lorem.word(),
        description: faker.lorem.words(),
        imagesUrl: [faker.internet.url()],
        repositoryUrl: faker.internet.url(),
        projectUrl: faker.internet.url(),
        technologies: [faker.lorem.word()],
      })
      .set("Authorization", `Bearer ${token}`)

    expect(_response2.status).toBe(200)
  })

  it("DELETE /api/project/delete/:projectId should return 200 when project is deleted", async () => {
    await request(app).post("/api/user").send({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: "teste6@teste.com",
      password: "12345678",
    })

    const response = await request(app).post("/api/user/auth").send({
      email: "teste6@teste.com",
      password: "12345678",
    })

    const { id, token } = response.body

    const _response = await request(app)
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

    const projectId = _response.body.id

    const _response2 = await request(app)
      .delete(`/api/project/delete/${projectId}`)
      .send({
        userId: id,
      })
      .set("Authorization", `Bearer ${token}`)

    expect(_response2.status).toBe(200)
  })
})
