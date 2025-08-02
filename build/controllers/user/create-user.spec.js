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
const create_user_1 = require("./create-user");
const use_cases_1 = require("../../use-cases");
const faker_1 = require("@faker-js/faker");
const errors_1 = require("../../errors");
(0, vitest_1.describe)("Create User Controller", () => {
    const user = {
        id: faker_1.faker.string.uuid(),
        firstName: faker_1.faker.person.firstName(),
        lastName: faker_1.faker.person.lastName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password(),
    };
    class PostgresCreateUserRepositoryStub {
        execute() {
            return __awaiter(this, void 0, void 0, function* () {
                return user;
            });
        }
    }
    class PostgresGetUserByEmailRepositoryStub {
        execute() {
            return __awaiter(this, void 0, void 0, function* () {
                return null;
            });
        }
    }
    class PasswordHasherAdapterStub {
        execute() {
            return __awaiter(this, void 0, void 0, function* () {
                return faker_1.faker.string.uuid();
            });
        }
    }
    const makeSut = () => {
        const postgresCreateUserRepositoryStub = new PostgresCreateUserRepositoryStub();
        const postgresGetUserByEmailRepositoryStub = new PostgresGetUserByEmailRepositoryStub();
        const passwordHasherAdapterStub = new PasswordHasherAdapterStub();
        const createUserUseCaseStub = new use_cases_1.CreateUserUseCase(postgresCreateUserRepositoryStub, postgresGetUserByEmailRepositoryStub, passwordHasherAdapterStub);
        const sut = new create_user_1.CreateUserController(createUserUseCaseStub);
        return {
            sut,
            createUserUseCaseStub,
        };
    };
    (0, vitest_1.it)("should return 201 with created user", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const response = yield sut.execute({ httRequest: user });
        (0, vitest_1.expect)(response).toEqual({
            statusCode: 201,
            body: user,
        });
    }));
    (0, vitest_1.it)("should return error 400 if missing fields", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute({
            httRequest: null,
        });
        (0, vitest_1.expect)(result.statusCode).toBe(400);
    }));
    (0, vitest_1.it)("should return error 400 if email already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, createUserUseCaseStub } = makeSut();
        vitest_1.vitest
            .spyOn(createUserUseCaseStub, "execute")
            .mockRejectedValueOnce(new errors_1.EmailAlreadyExistsError(user.email));
        const result = yield sut.execute({
            httRequest: user,
        });
        (0, vitest_1.expect)(result.statusCode).toBe(400);
    }));
});
