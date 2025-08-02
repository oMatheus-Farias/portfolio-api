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
const auth_user_1 = require("./auth-user");
const faker_1 = require("@faker-js/faker");
const errors_1 = require("../../errors");
(0, vitest_1.describe)("Auth User UseCase", () => {
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
    class PasswordCompareAdapterStub {
        execute() {
            return __awaiter(this, void 0, void 0, function* () {
                return true;
            });
        }
    }
    class SignTokenStub {
        execute() {
            return faker_1.faker.string.uuid();
        }
    }
    const makeSut = () => {
        const postgresGetUserByEmailRepositoryStub = new PostgresGetUserByEmailRepositoryStub();
        const passwordCompareAdapterStub = new PasswordCompareAdapterStub();
        const signTokenStub = new SignTokenStub();
        const sut = new auth_user_1.AuthUserUseCase(postgresGetUserByEmailRepositoryStub, passwordCompareAdapterStub, signTokenStub);
        return {
            sut,
            postgresGetUserByEmailRepositoryStub,
            passwordCompareAdapterStub,
            signTokenStub,
        };
    };
    (0, vitest_1.it)("should successfully authenticate a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute(user.email, user.password);
        (0, vitest_1.expect)(result).not.toBe(null);
    }));
    (0, vitest_1.it)("should token is returned when user is authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute(user.email, user.password);
        const userAuth = Object.assign(Object.assign({}, user), { password: undefined, token: result.token });
        (0, vitest_1.expect)(result).toEqual(userAuth);
        (0, vitest_1.expect)(result.token).not.toBe(null);
    }));
    (0, vitest_1.it)("should throw UserNotFoundError if user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetUserByEmailRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetUserByEmailRepositoryStub, "execute")
            .mockResolvedValueOnce(null);
        const result = sut.execute(user.email, user.password);
        yield (0, vitest_1.expect)(result).rejects.toThrow(new errors_1.UserNotFoundError(user.email));
    }));
    (0, vitest_1.it)("should throw UserNotFoundError if password not match", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, passwordCompareAdapterStub } = makeSut();
        vitest_1.vitest
            .spyOn(passwordCompareAdapterStub, "execute")
            .mockResolvedValueOnce(false);
        const result = sut.execute(user.email, user.password);
        yield (0, vitest_1.expect)(result).rejects.toThrow(new errors_1.UserNotFoundError());
    }));
});
