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
const delete_project_1 = require("./delete-project");
const faker_1 = require("@faker-js/faker");
const errors_1 = require("../../errors");
(0, vitest_1.describe)("Delete Project UseCase", () => {
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
    class PostgresDeleteProjectRepositoryStub {
        execute() {
            return __awaiter(this, void 0, void 0, function* () {
                return project;
            });
        }
    }
    class PostgresGetProjectByIdRepositoryStub {
        execute() {
            return __awaiter(this, void 0, void 0, function* () {
                return project;
            });
        }
    }
    const makeSut = () => {
        const postgresDeleteProjectRepositoryStub = new PostgresDeleteProjectRepositoryStub();
        const postgresGetProjectByIdRepositoryStub = new PostgresGetProjectByIdRepositoryStub();
        const sut = new delete_project_1.DeleteProjectUseCase(postgresDeleteProjectRepositoryStub, postgresGetProjectByIdRepositoryStub);
        return {
            sut,
            postgresDeleteProjectRepositoryStub,
            postgresGetProjectByIdRepositoryStub,
        };
    };
    (0, vitest_1.it)("should successfully delete a project", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute(project.id, project.userId);
        (0, vitest_1.expect)(result).not.toBeNull();
        (0, vitest_1.expect)(result).toEqual(project);
    }));
    (0, vitest_1.it)("should throw ProjectNotFoundError if project does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetProjectByIdRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetProjectByIdRepositoryStub, "execute")
            .mockRejectedValueOnce(new errors_1.ProjectNotFoundError());
        const result = sut.execute(project.id, project.userId);
        yield (0, vitest_1.expect)(result).rejects.toThrow(new errors_1.ProjectNotFoundError());
    }));
    (0, vitest_1.it)("should throw UserUnauthorizedError if user is not authorized", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetProjectByIdRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetProjectByIdRepositoryStub, "execute")
            .mockResolvedValueOnce(Object.assign(Object.assign({}, project), { userId: faker_1.faker.string.uuid() }));
        const result = sut.execute(project.id, project.userId);
        yield (0, vitest_1.expect)(result).rejects.toThrow(new errors_1.UserUnauthorizedError());
    }));
});
