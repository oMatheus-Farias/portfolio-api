"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetUserByIdController = exports.makeAuthUserController = exports.makeGetUserByEmailController = exports.makeCreateUserController = void 0;
const adapters_1 = require("../../adapters");
const controllers_1 = require("../../controllers");
const postgres_1 = require("../../repositories/postgres");
const use_cases_1 = require("../../use-cases");
const makeCreateUserController = () => {
    const createUserRepository = new postgres_1.PostgresCreateUserRepository();
    const postgresGetUserByEmailRepository = new postgres_1.PostgresGetUserByEmailRepository();
    const passwordHasherAdapter = new adapters_1.PasswordHasherAdapter();
    const createUserUseCase = new use_cases_1.CreateUserUseCase(createUserRepository, postgresGetUserByEmailRepository, passwordHasherAdapter);
    const createUserController = new controllers_1.CreateUserController(createUserUseCase);
    return createUserController;
};
exports.makeCreateUserController = makeCreateUserController;
const makeGetUserByEmailController = () => {
    const postgresGetUserByEmailRepository = new postgres_1.PostgresGetUserByEmailRepository();
    const getUserByEmailUseCase = new use_cases_1.GetUserByEmailUseCase(postgresGetUserByEmailRepository);
    const getUserByEmailController = new controllers_1.GetUserByEmailController(getUserByEmailUseCase);
    return getUserByEmailController;
};
exports.makeGetUserByEmailController = makeGetUserByEmailController;
const makeAuthUserController = () => {
    const postgresGetUserByEmailRepository = new postgres_1.PostgresGetUserByEmailRepository();
    const passwordCompareAdapter = new adapters_1.PasswordCompareAdapter();
    const signToken = new adapters_1.SignToken();
    const authUserUseCase = new use_cases_1.AuthUserUseCase(postgresGetUserByEmailRepository, passwordCompareAdapter, signToken);
    const authUserController = new controllers_1.AuthUserController(authUserUseCase);
    return authUserController;
};
exports.makeAuthUserController = makeAuthUserController;
const makeGetUserByIdController = () => {
    const postgresGetUserByIdRepository = new postgres_1.PostgresGetUserByIdRepository();
    const getUserByIdUseCase = new use_cases_1.GetUserByIdUseCase(postgresGetUserByIdRepository);
    const getUserByIdController = new controllers_1.GetUserByIdController(getUserByIdUseCase);
    return getUserByIdController;
};
exports.makeGetUserByIdController = makeGetUserByIdController;
