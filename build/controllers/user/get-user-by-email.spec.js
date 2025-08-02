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
const get_user_by_email_1 = require("./get-user-by-email");
const use_cases_1 = require("../../use-cases");
const errors_1 = require("../../errors");
const faker_1 = require("@faker-js/faker");
(0, vitest_1.describe)("Get User By Email Controller", () => {
    const user = {
        id: faker_1.faker.string.uuid(),
        firstName: faker_1.faker.person.firstName(),
        lastName: faker_1.faker.person.lastName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password(),
    };
    class PostgresGetUserByEmailRepositoryStub {
        execute() {
            return __awaiter(this, void 0, void 0, function* () {
                return user;
            });
        }
    }
    const makeSut = () => {
        const postgresGetUserByEmailRepositoryStub = new PostgresGetUserByEmailRepositoryStub();
        const getUserByEmailUseCaseStub = new use_cases_1.GetUserByEmailUseCase(postgresGetUserByEmailRepositoryStub);
        const sut = new get_user_by_email_1.GetUserByEmailController(getUserByEmailUseCaseStub);
        return {
            sut,
            getUserByEmailUseCaseStub,
        };
    };
    (0, vitest_1.it)("should return 200 with user by email", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute(user.email);
        (0, vitest_1.expect)(result).toEqual({
            statusCode: 200,
            body: user,
        });
    }));
    (0, vitest_1.it)("should return 400 if email is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute("invalid_email");
        (0, vitest_1.expect)(result.statusCode).toBe(400);
    }));
    (0, vitest_1.it)("should return 400 if email is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute("");
        (0, vitest_1.expect)(result.statusCode).toBe(400);
    }));
    (0, vitest_1.it)("should return 404 if user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, getUserByEmailUseCaseStub } = makeSut();
        vitest_1.vitest
            .spyOn(getUserByEmailUseCaseStub, "execute")
            .mockRejectedValueOnce(new errors_1.UserNotFoundError());
        const result = yield sut.execute(user.email);
        (0, vitest_1.expect)(result.statusCode).toBe(404);
    }));
});
