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
const index_1 = require("../../use-cases/index");
const faker_1 = require("@faker-js/faker");
(0, vitest_1.describe)("Update Project Controller", () => {
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
    const user = {
        id: faker_1.faker.string.uuid(),
        firstName: faker_1.faker.person.firstName(),
        lastName: faker_1.faker.person.lastName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password(),
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
        const updateProjectUseCase = new index_1.UpdateProjectUseCase(postgresUpdateProjectRepositoryStub, postgresGetProjectByIdRepositoryStub, postgresGetUserByIdRepositoryStub, postgresGetProjectsByUserIdRepositoryStub);
        const sut = new update_project_1.UpdateProjectController(updateProjectUseCase);
        return {
            sut,
            postgresUpdateProjectRepositoryStub,
            postgresGetProjectByIdRepositoryStub,
            postgresGetUserByIdRepositoryStub,
            postgresGetProjectsByUserIdRepositoryStub,
        };
    };
    (0, vitest_1.it)("should return 200 if project is updated", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute({
            projectId: project.id,
            userId: project.userId,
            updateParams: {
                name: "new name",
            },
        });
        (0, vitest_1.expect)(result.statusCode).toBe(200);
        (0, vitest_1.expect)(result.body).toEqual(Object.assign(Object.assign({}, project), { name: "new name" }));
    }));
    (0, vitest_1.it)("should return 400 if update params missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute({
            projectId: project.id,
            userId: project.userId,
            updateParams: null,
        });
        (0, vitest_1.expect)(result.statusCode).toBe(400);
    }));
    (0, vitest_1.it)("should return 400 if project id missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute({
            projectId: "",
            userId: project.userId,
            updateParams: {
                name: "new name",
            },
        });
        (0, vitest_1.expect)(result.statusCode).toBe(400);
    }));
    (0, vitest_1.it)("should return 400 if user id missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute({
            projectId: project.id,
            userId: "",
            updateParams: {
                name: "new name",
            },
        });
        (0, vitest_1.expect)(result.statusCode).toBe(400);
    }));
    (0, vitest_1.it)("should return 400 if project id invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute({
            projectId: "invalid_id",
            userId: project.userId,
            updateParams: {
                name: "new name",
            },
        });
        (0, vitest_1.expect)(result.statusCode).toBe(400);
    }));
    (0, vitest_1.it)("should return 400 if user id invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute({
            projectId: project.id,
            userId: "invalid_id",
            updateParams: {
                name: "new name",
            },
        });
        (0, vitest_1.expect)(result.statusCode).toBe(400);
    }));
    (0, vitest_1.it)("should return 401 if user unauthorized", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute({
            projectId: project.id,
            userId: faker_1.faker.string.uuid(),
            updateParams: {
                name: "new name",
            },
        });
        (0, vitest_1.expect)(result.statusCode).toBe(401);
    }));
    (0, vitest_1.it)("should return 404 if project not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetProjectByIdRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetProjectByIdRepositoryStub, "execute")
            .mockResolvedValueOnce(null);
        const result = yield sut.execute({
            projectId: project.id,
            userId: project.userId,
            updateParams: {
                name: "new name",
            },
        });
        (0, vitest_1.expect)(result.statusCode).toBe(404);
    }));
    (0, vitest_1.it)("should return 404 if user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetUserByIdRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetUserByIdRepositoryStub, "execute")
            .mockResolvedValueOnce(null);
        const result = yield sut.execute({
            projectId: project.id,
            userId: project.userId,
            updateParams: {
                name: "new name",
            },
        });
        (0, vitest_1.expect)(result.statusCode).toBe(404);
    }));
    (0, vitest_1.it)("should return 409 if project name already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute({
            projectId: project.id,
            userId: project.userId,
            updateParams: {
                name: project.name,
            },
        });
        (0, vitest_1.expect)(result.statusCode).toBe(409);
    }));
    (0, vitest_1.it)("should return 500 if any error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresUpdateProjectRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresUpdateProjectRepositoryStub, "execute")
            .mockRejectedValueOnce(new Error());
        const result = yield sut.execute({
            projectId: project.id,
            userId: project.userId,
            updateParams: {
                name: "new name",
            },
        });
        (0, vitest_1.expect)(result.statusCode).toBe(500);
    }));
});
