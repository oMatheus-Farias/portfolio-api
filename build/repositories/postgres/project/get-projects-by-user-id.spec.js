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
const get_projects_by_user_id_1 = require("./get-projects-by-user-id");
const faker_1 = require("@faker-js/faker");
(0, vitest_1.describe)("Postgres Get Project By Id Repository", () => {
    const createUserParams = {
        id: faker_1.faker.string.uuid(),
        firstName: faker_1.faker.person.firstName(),
        lastName: faker_1.faker.person.lastName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password({
            length: 8,
        }),
    };
    const createProjectParams = {
        id: faker_1.faker.string.uuid(),
        name: faker_1.faker.commerce.productName(),
        description: faker_1.faker.lorem.paragraph(),
        imagesUrl: [faker_1.faker.internet.url()],
        repositoryUrl: faker_1.faker.internet.url(),
        projectUrl: faker_1.faker.internet.url(),
        technologies: [faker_1.faker.lorem.word()],
        userId: createUserParams.id,
        createdAt: faker_1.faker.date.recent(),
        updatedAt: faker_1.faker.date.recent(),
    };
    const makeSut = () => {
        const sut = new get_projects_by_user_id_1.PostgresGetProjectsByUserIdRepository();
        return {
            sut,
        };
    };
    (0, vitest_1.it)("should get projects by user id on database", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        yield app_1.prisma.user.create({
            data: createUserParams,
        });
        yield app_1.prisma.projects.create({
            data: createProjectParams,
        });
        const result = yield sut.execute(createProjectParams.userId);
        (0, vitest_1.expect)(result).not.toBeUndefined();
        (0, vitest_1.expect)(result[0].name).toBe(createProjectParams.name);
        (0, vitest_1.expect)(result[0].description).toBe(createProjectParams.description);
        (0, vitest_1.expect)(result[0].imagesUrl).toStrictEqual(createProjectParams.imagesUrl);
        (0, vitest_1.expect)(result[0].repositoryUrl).toBe(createProjectParams.repositoryUrl);
        (0, vitest_1.expect)(result[0].projectUrl).toBe(createProjectParams.projectUrl);
        (0, vitest_1.expect)(result[0].technologies).toStrictEqual(createProjectParams.technologies);
        (0, vitest_1.expect)(result[0].userId).toBe(createProjectParams.userId);
    }));
});
