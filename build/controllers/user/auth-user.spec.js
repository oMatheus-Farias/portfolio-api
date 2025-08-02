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
const use_cases_1 = require("../../use-cases");
const faker_1 = require("@faker-js/faker");
(0, vitest_1.describe)("Auth User Controller", () => {
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
        const authUserUseCaseStub = new use_cases_1.AuthUserUseCase(postgresGetUserByEmailRepositoryStub, passwordCompareAdapterStub, signTokenStub);
        const sut = new auth_user_1.AuthUserController(authUserUseCaseStub);
        return {
            sut,
            authUserUseCaseStub,
        };
    };
    (0, vitest_1.it)("should return 200 with auth user", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const response = yield sut.execute(user.email, user.password);
        (0, vitest_1.expect)(response).toEqual({
            statusCode: 200,
            body: Object.assign(Object.assign({}, user), { password: undefined, token: vitest_1.expect.any(String) }),
        });
    }));
});
