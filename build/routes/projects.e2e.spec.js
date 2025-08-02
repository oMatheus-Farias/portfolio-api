"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const faker_1 = require("@faker-js/faker");
(0, vitest_1.describe)("Projects routes E2E tests", () => {
    (0, vitest_1.it)("GET /api/project/name/:name should return 200 when project is found", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).post("/api/user").send({
            firstName: faker_1.faker.person.firstName(),
            lastName: faker_1.faker.person.lastName(),
            email: "teste1@teste.com",
            password: "12345678",
        });
        const response = yield (0, supertest_1.default)(app_1.app).post("/api/user/auth").send({
            email: "teste1@teste.com",
            password: "12345678",
        });
        const { id, token } = response.body;
        const { body } = yield (0, supertest_1.default)(app_1.app)
            .post("/api/project")
            .send({
            name: faker_1.faker.lorem.word(),
            description: faker_1.faker.lorem.words(),
            imagesUrl: [faker_1.faker.internet.url()],
            repositoryUrl: faker_1.faker.internet.url(),
            projectUrl: faker_1.faker.internet.url(),
            technologies: [faker_1.faker.lorem.word()],
            userId: id,
        })
            .set("Authorization", `Bearer ${token}`);
        const name = body.name;
        const _response = yield (0, supertest_1.default)(app_1.app)
            .get(`/api/project/name/${name}`)
            .set("Authorization", `Bearer ${token}`);
        (0, vitest_1.expect)(_response.status).toBe(200);
        (0, vitest_1.expect)(_response.body.name).toBe(name);
    }));
    (0, vitest_1.it)("GET /api/project/:id should return 200 when project is found", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).post("/api/user").send({
            firstName: faker_1.faker.person.firstName(),
            lastName: faker_1.faker.person.lastName(),
            email: "teste2@teste.com",
            password: "12345678",
        });
        const response = yield (0, supertest_1.default)(app_1.app).post("/api/user/auth").send({
            email: "teste2@teste.com",
            password: "12345678",
        });
        const { id, token } = response.body;
        const { body } = yield (0, supertest_1.default)(app_1.app)
            .post("/api/project")
            .send({
            name: faker_1.faker.lorem.word(),
            description: faker_1.faker.lorem.words(),
            imagesUrl: [faker_1.faker.internet.url()],
            repositoryUrl: faker_1.faker.internet.url(),
            projectUrl: faker_1.faker.internet.url(),
            technologies: [faker_1.faker.lorem.word()],
            userId: id,
        })
            .set("Authorization", `Bearer ${token}`);
        const projectId = body.id;
        const _response = yield (0, supertest_1.default)(app_1.app)
            .get(`/api/project/${projectId}`)
            .set("Authorization", `Bearer ${token}`);
        (0, vitest_1.expect)(_response.status).toBe(200);
    }));
    (0, vitest_1.it)("GET /api/projects/:userId should return 200 when projects is found", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).post("/api/user").send({
            firstName: faker_1.faker.person.firstName(),
            lastName: faker_1.faker.person.lastName(),
            email: "teste3@teste.com",
            password: "12345678",
        });
        const response = yield (0, supertest_1.default)(app_1.app).post("/api/user/auth").send({
            email: "teste3@teste.com",
            password: "12345678",
        });
        const { id, token } = response.body;
        const { body } = yield (0, supertest_1.default)(app_1.app)
            .post("/api/project")
            .send({
            name: faker_1.faker.lorem.word(),
            description: faker_1.faker.lorem.words(),
            imagesUrl: [faker_1.faker.internet.url()],
            repositoryUrl: faker_1.faker.internet.url(),
            projectUrl: faker_1.faker.internet.url(),
            technologies: [faker_1.faker.lorem.word()],
            userId: id,
        })
            .set("Authorization", `Bearer ${token}`);
        const userId = body.userId;
        const _response = yield (0, supertest_1.default)(app_1.app)
            .get(`/api/projects/${userId}`)
            .set("Authorization", `Bearer ${token}`);
        (0, vitest_1.expect)(_response.status).toBe(200);
    }));
    (0, vitest_1.it)("POST /api/project should return 201 when project is created", () => __awaiter(void 0, void 0, void 0, function* () {
        const teste = yield (0, supertest_1.default)(app_1.app).post("/api/user").send({
            firstName: faker_1.faker.person.firstName(),
            lastName: faker_1.faker.person.lastName(),
            email: "teste4@teste.com",
            password: "12345678",
        });
        const response = yield (0, supertest_1.default)(app_1.app).post("/api/user/auth").send({
            email: "teste4@teste.com",
            password: "12345678",
        });
        const { id, token } = response.body;
        const _response = yield (0, supertest_1.default)(app_1.app)
            .post("/api/project")
            .send({
            name: faker_1.faker.lorem.word(),
            description: faker_1.faker.lorem.words(),
            imagesUrl: [faker_1.faker.internet.url()],
            repositoryUrl: faker_1.faker.internet.url(),
            projectUrl: faker_1.faker.internet.url(),
            technologies: [faker_1.faker.lorem.word()],
            userId: id,
        })
            .set("Authorization", `Bearer ${token}`);
        (0, vitest_1.expect)(_response.status).toBe(201);
    }));
    (0, vitest_1.it)("PATCH /api/project/:projectId should return 200 when project is updated", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).post("/api/user").send({
            firstName: faker_1.faker.person.firstName(),
            lastName: faker_1.faker.person.lastName(),
            email: "teste5@teste.com",
            password: "12345678",
        });
        const response = yield (0, supertest_1.default)(app_1.app).post("/api/user/auth").send({
            email: "teste5@teste.com",
            password: "12345678",
        });
        const { id, token } = response.body;
        const _response = yield (0, supertest_1.default)(app_1.app)
            .post("/api/project")
            .send({
            name: faker_1.faker.lorem.word(),
            description: faker_1.faker.lorem.words(),
            imagesUrl: [faker_1.faker.internet.url()],
            repositoryUrl: faker_1.faker.internet.url(),
            projectUrl: faker_1.faker.internet.url(),
            technologies: [faker_1.faker.lorem.word()],
            userId: id,
        })
            .set("Authorization", `Bearer ${token}`);
        const projectId = _response.body.id;
        const _response2 = yield (0, supertest_1.default)(app_1.app)
            .patch(`/api/project/${projectId}`)
            .send({
            userId: id,
            name: faker_1.faker.lorem.word(),
            description: faker_1.faker.lorem.words(),
            imagesUrl: [faker_1.faker.internet.url()],
            repositoryUrl: faker_1.faker.internet.url(),
            projectUrl: faker_1.faker.internet.url(),
            technologies: [faker_1.faker.lorem.word()],
        })
            .set("Authorization", `Bearer ${token}`);
        (0, vitest_1.expect)(_response2.status).toBe(200);
    }));
    (0, vitest_1.it)("DELETE /api/project/delete/:projectId should return 200 when project is deleted", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).post("/api/user").send({
            firstName: faker_1.faker.person.firstName(),
            lastName: faker_1.faker.person.lastName(),
            email: "teste6@teste.com",
            password: "12345678",
        });
        const response = yield (0, supertest_1.default)(app_1.app).post("/api/user/auth").send({
            email: "teste6@teste.com",
            password: "12345678",
        });
        const { id, token } = response.body;
        const _response = yield (0, supertest_1.default)(app_1.app)
            .post("/api/project")
            .send({
            name: faker_1.faker.lorem.word(),
            description: faker_1.faker.lorem.words(),
            imagesUrl: [faker_1.faker.internet.url()],
            repositoryUrl: faker_1.faker.internet.url(),
            projectUrl: faker_1.faker.internet.url(),
            technologies: [faker_1.faker.lorem.word()],
            userId: id,
        })
            .set("Authorization", `Bearer ${token}`);
        const projectId = _response.body.id;
        const _response2 = yield (0, supertest_1.default)(app_1.app)
            .delete(`/api/project/delete/${projectId}`)
            .send({
            userId: id,
        })
            .set("Authorization", `Bearer ${token}`);
        (0, vitest_1.expect)(_response2.status).toBe(200);
    }));
});
