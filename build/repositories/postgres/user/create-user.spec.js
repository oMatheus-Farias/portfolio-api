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
const faker_1 = require("@faker-js/faker");
(0, vitest_1.describe)("Postgres Create User Repository", () => {
    const createUserParams = {
        id: faker_1.faker.string.uuid(),
        firstName: faker_1.faker.person.firstName(),
        lastName: faker_1.faker.person.lastName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password({
            length: 8,
        }),
    };
    const makeSut = () => {
        const sut = new create_user_1.PostgresCreateUserRepository();
        return {
            sut,
        };
    };
    (0, vitest_1.it)("should create a user on dstabase", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const user = yield sut.execute({ params: createUserParams });
        (0, vitest_1.expect)(user).not.toBeUndefined();
        (0, vitest_1.expect)(user.firstName).toBe(createUserParams.firstName);
        (0, vitest_1.expect)(user.lastName).toBe(createUserParams.lastName);
        (0, vitest_1.expect)(user.email).toBe(createUserParams.email);
        (0, vitest_1.expect)(user.password).toBe(createUserParams.password);
    }));
});
