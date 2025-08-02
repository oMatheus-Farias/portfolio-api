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
const faker_1 = require("@faker-js/faker");
const errors_1 = require("../../errors");
(0, vitest_1.describe)("Create Project UseCase", () => {
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
        const sut = new create_project_1.CreateProjectUseCase(postgresCreateProjectRepositoryStub, postgresGetProjectByNameRepositoryStub);
        return {
            sut,
            postgresCreateProjectRepositoryStub,
            postgresGetProjectByNameRepositoryStub,
        };
    };
    (0, vitest_1.it)("should successfully create a project", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute({ params: project });
        (0, vitest_1.expect)(result).not.toBeNull();
        (0, vitest_1.expect)(result).toEqual(project);
    }));
    (0, vitest_1.it)("should throw ProjectNameAlreadyExistsError if project name already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetProjectByNameRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetProjectByNameRepositoryStub, "execute")
            .mockRejectedValueOnce(new errors_1.ProjectNameAlreadyExistsError(project.name));
        const result = sut.execute({ params: project });
        yield (0, vitest_1.expect)(result).rejects.toThrowError(new errors_1.ProjectNameAlreadyExistsError(project.name));
    }));
});
