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
(0, vitest_1.describe)("User routes E2E tests", () => {
    (0, vitest_1.it)("GET /api/user/:email should return 200 when user is found", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(app_1.app)
            .post("/api/user")
            .send({
            firstName: faker_1.faker.person.firstName(),
            lastName: faker_1.faker.person.lastName(),
            email: faker_1.faker.internet.email(),
            password: faker_1.faker.internet.password({
                length: 8,
            }),
        });
        const email = body.email;
        const response = yield (0, supertest_1.default)(app_1.app).get(`/api/user/${email}`);
        (0, vitest_1.expect)(response.status).toBe(200);
    }));
    (0, vitest_1.it)("GET /api/user/id/:userId should return 200 when user is found", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).post("/api/user").send({
            firstName: faker_1.faker.person.firstName(),
            lastName: faker_1.faker.person.lastName(),
            email: "teste@teste.com",
            password: "12345678",
        });
        const response = yield (0, supertest_1.default)(app_1.app).post("/api/user/auth").send({
            email: "teste@teste.com",
            password: "12345678",
        });
        const { token, id: userId } = response.body;
        const _response = yield (0, supertest_1.default)(app_1.app)
            .get(`/api/user/id/${userId}`)
            .set("Authorization", `Bearer ${token}`);
        (0, vitest_1.expect)(_response.status).toBe(200);
    }));
    (0, vitest_1.it)("POST /api/user should return 201 when user is created", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post("/api/user")
            .send({
            firstName: faker_1.faker.person.firstName(),
            lastName: faker_1.faker.person.lastName(),
            email: faker_1.faker.internet.email(),
            password: faker_1.faker.internet.password({
                length: 8,
            }),
        });
        (0, vitest_1.expect)(response.status).toBe(201);
    }));
    (0, vitest_1.it)("POST /api/user/auth should return 200 when user is authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).post("/api/user").send({
            firstName: faker_1.faker.person.firstName(),
            lastName: faker_1.faker.person.lastName(),
            email: "teste@teste.com",
            password: "12345678",
        });
        const response = yield (0, supertest_1.default)(app_1.app).post("/api/user/auth").send({
            email: "teste@teste.com",
            password: "12345678",
        });
        (0, vitest_1.expect)(response.status).toBe(200);
    }));
});
