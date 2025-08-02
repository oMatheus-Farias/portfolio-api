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
const update_project_1 = require("./update-project");
const faker_1 = require("@faker-js/faker");
const errors_1 = require("../../errors");
(0, vitest_1.describe)("Update Project UseCase", () => {
    const user = {
        id: faker_1.faker.string.uuid(),
        firstName: faker_1.faker.person.firstName(),
        lastName: faker_1.faker.person.lastName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password(),
    };
    const project = {
        id: faker_1.faker.string.uuid(),
        name: "Name",
        description: faker_1.faker.lorem.paragraph(),
        imagesUrl: [faker_1.faker.internet.url()],
        repositoryUrl: faker_1.faker.internet.url(),
        projectUrl: faker_1.faker.internet.url(),
        technologies: [faker_1.faker.lorem.word()],
        userId: user.id,
        createdAt: faker_1.faker.date.recent(),
        updatedAt: faker_1.faker.date.recent(),
    };
    class PostgresUpdateProjectRepositoryStub {
        execute(updateParams) {
            return __awaiter(this, void 0, void 0, function* () {
                const { name } = updateParams.updateParams;
                return Object.assign(Object.assign({}, project), { name: name || "" });
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
    class PostgresGetUserByIdRepositoryStub {
        execute() {
            return __awaiter(this, void 0, void 0, function* () {
                return user;
            });
        }
    }
    class PostgresGetProjectsByUserIdRepositoryStub {
        execute() {
            return __awaiter(this, void 0, void 0, function* () {
                return [project];
            });
        }
    }
    const makeSut = () => {
        const postgresUpdateProjectRepositoryStub = new PostgresUpdateProjectRepositoryStub();
        const postgresGetProjectByIdRepositoryStub = new PostgresGetProjectByIdRepositoryStub();
        const postgresGetUserByIdRepositoryStub = new PostgresGetUserByIdRepositoryStub();
        const postgresGetProjectsByUserIdRepositoryStub = new PostgresGetProjectsByUserIdRepositoryStub();
        const sut = new update_project_1.UpdateProjectUseCase(postgresUpdateProjectRepositoryStub, postgresGetProjectByIdRepositoryStub, postgresGetUserByIdRepositoryStub, postgresGetProjectsByUserIdRepositoryStub);
        return {
            sut,
            postgresUpdateProjectRepositoryStub,
            postgresGetProjectByIdRepositoryStub,
            postgresGetUserByIdRepositoryStub,
            postgresGetProjectsByUserIdRepositoryStub,
        };
    };
    (0, vitest_1.it)("should successfully update project", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute({
            userId: project.userId,
            projectId: project.id,
            updateParams: {
                name: "New Name",
            },
        });
        (0, vitest_1.expect)(result).not.toBeNull();
        (0, vitest_1.expect)(result.name).toEqual("New Name");
    }));
    (0, vitest_1.it)("should throw ProjectNotFoundError if project does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetProjectByIdRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetProjectByIdRepositoryStub, "execute")
            .mockRejectedValueOnce(new errors_1.ProjectNotFoundError());
        const result = sut.execute({
            userId: project.userId,
            projectId: project.id,
            updateParams: {
                name: "New Name",
            },
        });
        yield (0, vitest_1.expect)(result).rejects.toThrow(new errors_1.ProjectNotFoundError());
    }));
    (0, vitest_1.it)("should throw UserNotFoundError if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetUserByIdRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetUserByIdRepositoryStub, "execute")
            .mockRejectedValueOnce(new errors_1.UserNotFoundError());
        const result = sut.execute({
            userId: project.userId,
            projectId: project.id,
            updateParams: {
                name: "New Name",
            },
        });
        yield (0, vitest_1.expect)(result).rejects.toThrow(new errors_1.UserNotFoundError());
    }));
    (0, vitest_1.it)("should throw UserUnauthorizedError if user is not the owner of the project", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = sut.execute({
            userId: faker_1.faker.string.uuid(),
            projectId: project.id,
            updateParams: {
                name: "New Name",
            },
        });
        yield (0, vitest_1.expect)(result).rejects.toThrow(new errors_1.UserUnauthorizedError());
    }));
    (0, vitest_1.it)("should throw ProjectNameAlreadyExistsError if project name already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = sut.execute({
            userId: project.userId,
            projectId: project.id,
            updateParams: {
                name: project.name,
            },
        });
        yield (0, vitest_1.expect)(result).rejects.toThrow(new errors_1.ProjectNameAlreadyExistsError(project.name));
    }));
});
