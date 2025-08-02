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
const faker_1 = require("@faker-js/faker");
const errors_1 = require("../../errors");
(0, vitest_1.describe)("Get User By Email UseCase", () => {
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
        const sut = new get_user_by_email_1.GetUserByEmailUseCase(postgresGetUserByEmailRepositoryStub);
        return {
            sut,
            postgresGetUserByEmailRepositoryStub,
        };
    };
    (0, vitest_1.it)("should successfully get a user by email", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute(user.email);
        (0, vitest_1.expect)(result).not.toBeNull();
        (0, vitest_1.expect)(result).toEqual(user);
    }));
    (0, vitest_1.it)("should throw UserNotFoundError if user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetUserByEmailRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetUserByEmailRepositoryStub, "execute")
            .mockResolvedValueOnce(null);
        const result = sut.execute(user.email);
        yield (0, vitest_1.expect)(result).rejects.toThrowError(new errors_1.UserNotFoundError(user.email));
    }));
});
