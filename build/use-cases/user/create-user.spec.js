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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const create_user_1 = require("./create-user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const faker_1 = require("@faker-js/faker");
const errors_1 = require("../../errors");
(0, vitest_1.describe)("Create User UseCase", () => {
    const user = {
        id: faker_1.faker.string.uuid(),
        firstName: faker_1.faker.person.firstName(),
        lastName: faker_1.faker.person.lastName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password(),
    };
    class PostgresCreateUserRepositoryStub {
        execute(_user) {
            return __awaiter(this, void 0, void 0, function* () {
                return _user;
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
        execute(password) {
            return __awaiter(this, void 0, void 0, function* () {
                return bcrypt_1.default.hash(password, 10);
            });
        }
    }
    const makeSut = () => {
        const postgresCreateUserRepositoryStub = new PostgresCreateUserRepositoryStub();
        const postgresGetUserByEmailRepositoryStub = new PostgresGetUserByEmailRepositoryStub();
        const passwordHasherAdapterStub = new PasswordHasherAdapterStub();
        const sut = new create_user_1.CreateUserUseCase(postgresCreateUserRepositoryStub, postgresGetUserByEmailRepositoryStub, passwordHasherAdapterStub);
        return {
            sut,
            postgresCreateUserRepositoryStub,
            postgresGetUserByEmailRepositoryStub,
            passwordHasherAdapterStub,
        };
    };
    (0, vitest_1.it)("should successfully create a user", () => {
        const { sut } = makeSut();
        const response = sut.execute({ params: user });
        (0, vitest_1.expect)(response).toBeTruthy();
    });
    (0, vitest_1.it)("should throw an EmailAlreadyExistsError if the email already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetUserByEmailRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetUserByEmailRepositoryStub, "execute")
            .mockResolvedValueOnce(user);
        const response = sut.execute({ params: user });
        yield (0, vitest_1.expect)(response).rejects.toThrow(new errors_1.EmailAlreadyExistsError(user.email));
    }));
    (0, vitest_1.it)("should hasher the password before creating the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, passwordHasherAdapterStub } = makeSut();
        const spy = vitest_1.vitest
            .spyOn(passwordHasherAdapterStub, "execute")
            .mockResolvedValueOnce(user.password);
        yield sut.execute({ params: user });
        (0, vitest_1.expect)(spy).toHaveBeenCalledWith(user.password);
    }));
});
