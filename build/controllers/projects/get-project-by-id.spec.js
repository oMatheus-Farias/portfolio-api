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
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const get_project_by_id_1 = require("./get-project-by-id");
const get_project_by_id_2 = require("../../use-cases/projects/get-project-by-id");
const faker_1 = require("@faker-js/faker");
(0, vitest_1.describe)("Get Project By Id Controller", () => {
    const project = {
        id: faker_1.faker.string.uuid(),
        name: faker_1.faker.person.firstName(),
        description: faker_1.faker.lorem.paragraph(),
        imagesUrl: [faker_1.faker.internet.url()],
        repositoryUrl: faker_1.faker.internet.url(),
        projectUrl: faker_1.faker.internet.url(),
        technologies: [faker_1.faker.lorem.word()],
        userId: faker_1.faker.string.uuid(),
        createdAt: faker_1.faker.date.recent(),
        updatedAt: faker_1.faker.date.recent(),
    };
    class PostgresGetProjectByIdRepositoryStub {
        execute() {
            return __awaiter(this, void 0, void 0, function* () {
                return project;
            });
        }
    }
    const makeSut = () => {
        const postgresGetProjectByIdRepositoryStub = new PostgresGetProjectByIdRepositoryStub();
        const getProjectByIdUseCase = new get_project_by_id_2.GetProjectByIdUseCase(postgresGetProjectByIdRepositoryStub);
        const sut = new get_project_by_id_1.GetProjectByIdController(getProjectByIdUseCase);
        return {
            sut,
            postgresGetProjectByIdRepositoryStub,
        };
    };
    (0, vitest_1.it)("should return 200 if project is found", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute(project.id);
        (0, vitest_1.expect)(result).toEqual({
            statusCode: 200,
            body: project,
        });
    }));
    (0, vitest_1.it)("should return 400 if project id is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute("invalid-id");
        (0, vitest_1.expect)(result.statusCode).toBe(400);
    }));
    (0, vitest_1.it)("should return 400 if project id is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute("");
        (0, vitest_1.expect)(result.statusCode).toBe(400);
    }));
    (0, vitest_1.it)("should return 404 if project is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetProjectByIdRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetProjectByIdRepositoryStub, "execute")
            .mockResolvedValueOnce(null);
        const result = yield sut.execute(project.id);
        (0, vitest_1.expect)(result.statusCode).toBe(404);
    }));
    (0, vitest_1.it)("should return 500 if any error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetProjectByIdRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetProjectByIdRepositoryStub, "execute")
            .mockRejectedValueOnce(new Error());
        const result = yield sut.execute(project.id);
        (0, vitest_1.expect)(result.statusCode).toBe(500);
    }));
});
