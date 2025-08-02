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
const faker_1 = require("@faker-js/faker");
const errors_1 = require("../../errors");
(0, vitest_1.describe)("Get Projects By User Id UseCase", () => {
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
        const sut = new get_projects_by_user_id_1.GetProjectsByUserIdUseCase(postgresGetProjectsByUserIdRepositoryStub, postgresGetUserByIdRepositoryStub);
        return {
            sut,
            postgresGetProjectsByUserIdRepositoryStub,
            postgresGetUserByIdRepositoryStub,
        };
    };
    (0, vitest_1.it)("should successfully get projects by user id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute(user.id);
        (0, vitest_1.expect)(result).not.toBeNull();
        (0, vitest_1.expect)(result).toEqual([project]);
    }));
    (0, vitest_1.it)("should throw UserNotFoundError if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetUserByIdRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetUserByIdRepositoryStub, "execute")
            .mockRejectedValueOnce(new errors_1.UserNotFoundError());
        const result = sut.execute(user.id);
        yield (0, vitest_1.expect)(result).rejects.toThrow(new errors_1.UserNotFoundError());
    }));
    (0, vitest_1.it)("should return an empty array if user has no projects", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetProjectsByUserIdRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetProjectsByUserIdRepositoryStub, "execute")
            .mockResolvedValueOnce([]);
        const result = yield sut.execute(user.id);
        (0, vitest_1.expect)(result).toEqual([]);
    }));
});
