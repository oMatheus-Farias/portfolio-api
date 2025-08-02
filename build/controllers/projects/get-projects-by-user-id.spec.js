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
const get_projects_by_user_id_1 = require("./get-projects-by-user-id");
const use_cases_1 = require("../../use-cases");
const faker_1 = require("@faker-js/faker");
(0, vitest_1.describe)("Get Projects By User Id Controller", () => {
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
    class PostgresGetProjectsByUserIdRepositoryStub {
        execute() {
            return __awaiter(this, void 0, void 0, function* () {
                return [project];
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
    const makeSut = () => {
        const postgresGetProjectsByUserIdRepositoryStub = new PostgresGetProjectsByUserIdRepositoryStub();
        const postgresGetUserByIdRepositoryStub = new PostgresGetUserByIdRepositoryStub();
        const getProjectsByUserIdUseCase = new use_cases_1.GetProjectsByUserIdUseCase(postgresGetProjectsByUserIdRepositoryStub, postgresGetUserByIdRepositoryStub);
        const sut = new get_projects_by_user_id_1.GetProjectsByUserIdController(getProjectsByUserIdUseCase);
        return {
            sut,
            postgresGetProjectsByUserIdRepositoryStub,
            postgresGetUserByIdRepositoryStub,
        };
    };
    (0, vitest_1.it)("should return 200 if projects are found", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute(user.id);
        (0, vitest_1.expect)(result).toEqual({
            statusCode: 200,
            body: [project],
        });
    }));
    (0, vitest_1.it)("should return 400 if user id missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute("");
        (0, vitest_1.expect)(result.statusCode).toBe(400);
    }));
    (0, vitest_1.it)("should return 400 if user id invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute("invalid_id");
        (0, vitest_1.expect)(result.statusCode).toBe(400);
    }));
    (0, vitest_1.it)("should return 404 if user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetUserByIdRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetUserByIdRepositoryStub, "execute")
            .mockResolvedValueOnce(null);
        const result = yield sut.execute(user.id);
        (0, vitest_1.expect)(result.statusCode).toBe(404);
    }));
    (0, vitest_1.it)("should return 500 if any error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetProjectsByUserIdRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetProjectsByUserIdRepositoryStub, "execute")
            .mockRejectedValueOnce(new Error());
        const result = yield sut.execute(user.id);
        (0, vitest_1.expect)(result.statusCode).toBe(500);
    }));
});
