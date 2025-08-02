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
const app_1 = require("../../../app");
const get_user_by_email_1 = require("./get-user-by-email");
const faker_1 = require("@faker-js/faker");
(0, vitest_1.describe)("Postgres Get User By Email Repository", () => {
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
        const sut = new get_user_by_email_1.PostgresGetUserByEmailRepository();
        return {
            sut,
        };
    };
    (0, vitest_1.it)("should get user by email on database", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const user = yield app_1.prisma.user.create({
            data: createUserParams,
        });
        const response = yield sut.execute(user.email);
        (0, vitest_1.expect)(response).not.toBeUndefined();
        (0, vitest_1.expect)(response).toStrictEqual(user);
    }));
});
