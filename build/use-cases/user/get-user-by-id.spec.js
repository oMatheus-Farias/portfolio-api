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
const get_user_by_id_1 = require("./get-user-by-id");
const faker_1 = require("@faker-js/faker");
const errors_1 = require("../../errors");
(0, vitest_1.describe)("Get User By Id UseCase", () => {
    const user = {
        id: faker_1.faker.string.uuid(),
        firstName: faker_1.faker.person.firstName(),
        lastName: faker_1.faker.person.lastName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password(),
    };
    class PostgresGetUserByIdRepositoryStub {
        execute() {
            return __awaiter(this, void 0, void 0, function* () {
                return user;
            });
        }
    }
    const makeSut = () => {
        const postgresGetUserByIdRepositoryStub = new PostgresGetUserByIdRepositoryStub();
        const sut = new get_user_by_id_1.GetUserByIdUseCase(postgresGetUserByIdRepositoryStub);
        return {
            sut,
            postgresGetUserByIdRepositoryStub,
        };
    };
    (0, vitest_1.it)("should successfully get a user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.execute(user.id);
        (0, vitest_1.expect)(result).not.toBeNull();
        (0, vitest_1.expect)(result).toEqual(user);
    }));
    (0, vitest_1.it)("should throw UserNotFoundError if user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, postgresGetUserByIdRepositoryStub } = makeSut();
        vitest_1.vitest
            .spyOn(postgresGetUserByIdRepositoryStub, "execute")
            .mockRejectedValueOnce(new errors_1.UserNotFoundError());
        const result = sut.execute(user.id);
        yield (0, vitest_1.expect)(result).rejects.toThrowError(new errors_1.UserNotFoundError());
    }));
});
