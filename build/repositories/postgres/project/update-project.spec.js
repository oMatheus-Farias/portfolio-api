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
const update_project_1 = require("./update-project");
const faker_1 = require("@faker-js/faker");
(0, vitest_1.describe)("Postgres Update Project Repository", () => {
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
        const sut = new update_project_1.PostgresUpdateProjectRepository();
        return {
            sut,
        };
    };
    (0, vitest_1.it)("should update project on database", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        yield app_1.prisma.user.create({
            data: createUserParams,
        });
        yield app_1.prisma.projects.create({
            data: createProjectParams,
        });
        const updatedProject = {
            name: faker_1.faker.commerce.productName(),
            description: faker_1.faker.lorem.paragraph(),
            imagesUrl: [faker_1.faker.internet.url()],
            repositoryUrl: faker_1.faker.internet.url(),
            projectUrl: faker_1.faker.internet.url(),
            technologies: [faker_1.faker.lorem.word()],
        };
        const result = yield sut.execute({
            userId: createProjectParams.userId,
            projectId: createProjectParams.id,
            updateParams: updatedProject,
        });
        (0, vitest_1.expect)(result).not.toBeUndefined();
        (0, vitest_1.expect)(result.name).toBe(updatedProject.name);
        (0, vitest_1.expect)(result.description).toBe(updatedProject.description);
        (0, vitest_1.expect)(result.imagesUrl).toStrictEqual(updatedProject.imagesUrl);
    }));
});
