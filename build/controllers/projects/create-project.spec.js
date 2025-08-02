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
const create_project_1 = require("./create-project");
const use_cases_1 = require("../../use-cases");
const faker_1 = require("@faker-js/faker");
(0, vitest_1.describe)("Create Project Controller", () => {
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
    class PostgresCreateProjectRepositoryStub {
        execute() {
            return __awaiter(this, void 0, void 0, function* () {
                return project;
            });
        }
    }
    class PostgresGetProjectByNameRepositoryStub {
        execute() {
            return __awaiter(this, void 0, void 0, function* () {
                return null;
            });
        }
    }
    const makeSut = () => {
        const postgresCreateProjectRepositoryStub = new PostgresCreateProjectRepositoryStub();
        const postgresGetProjectByNameRepositoryStub = new PostgresGetProjectByNameRepositoryStub();
        const createProjectUseCase = new use_cases_1.CreateProjectUseCase(postgresCreateProjectRepositoryStub, postgresGetProjectByNameRepositoryStub);
        const sut = new create_project_1.CreateProjectController(createProjectUseCase);
        return {
            sut,
            postgresCreateProjectRepositoryStub,
            postgresGetProjectByNameRepositoryStub,
        };
    };
    (0, vitest_1.it)("should return 201 if project is created", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const response = yield sut.execute({
            httpRequest: project,
        });
        (0, vitest_1.expect)(response.statusCode).toBe(201);
        (0, vitest_1.expect)(response.body).toBe(project);
    }));
    (0, vitest_1.it)("should return 400 if project name already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetProjectByNameRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetProjectByNameRepositoryStub, "execute")
            .mockResolvedValueOnce(project);
        const response = yield sut.execute({
            httpRequest: project,
        });
        (0, vitest_1.expect)(response.statusCode).toBe(400);
    }));
    (0, vitest_1.it)("should return 400 if any validation error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const response = yield sut.execute({
            httpRequest: Object.assign(Object.assign({}, project), { name: "" }),
        });
        (0, vitest_1.expect)(response.statusCode).toBe(400);
    }));
    (0, vitest_1.it)("should return 500 if any error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresCreateProjectRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresCreateProjectRepositoryStub, "execute")
            .mockRejectedValueOnce(new Error());
        const response = yield sut.execute({
            httpRequest: project,
        });
        (0, vitest_1.expect)(response.statusCode).toBe(500);
    }));
});
