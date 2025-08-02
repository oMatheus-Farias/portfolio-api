"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteProjectController = exports.makeUpdateProjectController = exports.makeGetProjectsByUserIdController = exports.makeGetProjectByIdController = exports.makeGetProjectByNameController = exports.makeCreateProjectController = void 0;
const controllers_1 = require("../../controllers");
const delete_project_1 = require("../../controllers/projects/delete-project");
const postgres_1 = require("../../repositories/postgres");
const use_cases_1 = require("../../use-cases");
const makeCreateProjectController = () => {
    const postgresCreateProjectRepository = new postgres_1.PostgresCreateProjectRepository();
    const postgresGetProjectByNameRepository = new postgres_1.PostgresGetProjectByNameRepository();
    const createProjectUseCase = new use_cases_1.CreateProjectUseCase(postgresCreateProjectRepository, postgresGetProjectByNameRepository);
    const createProjectController = new controllers_1.CreateProjectController(createProjectUseCase);
    return createProjectController;
};
exports.makeCreateProjectController = makeCreateProjectController;
const makeGetProjectByNameController = () => {
    const postgresGetProjectByNameRepository = new postgres_1.PostgresGetProjectByNameRepository();
    const getProjectByNameUseCase = new use_cases_1.GetProjectByNameUseCase(postgresGetProjectByNameRepository);
    const getProjectByNameController = new controllers_1.GetProjectByNameController(getProjectByNameUseCase);
    return getProjectByNameController;
};
exports.makeGetProjectByNameController = makeGetProjectByNameController;
const makeGetProjectByIdController = () => {
    const postgresGetProjectByIdRepository = new postgres_1.PostgresGetProjectByIdRepository();
    const getProjectByIdUseCase = new use_cases_1.GetProjectByIdUseCase(postgresGetProjectByIdRepository);
    const getProjectByIdController = new controllers_1.GetProjectByIdController(getProjectByIdUseCase);
    return getProjectByIdController;
};
exports.makeGetProjectByIdController = makeGetProjectByIdController;
const makeGetProjectsByUserIdController = () => {
    const postgresGetProjectsByUserIdRepository = new postgres_1.PostgresGetProjectsByUserIdRepository();
    const postgresGetUserByIdRepository = new postgres_1.PostgresGetUserByIdRepository();
    const getProjectsByUserIdUseCase = new use_cases_1.GetProjectsByUserIdUseCase(postgresGetProjectsByUserIdRepository, postgresGetUserByIdRepository);
    const getProjectsByUserIdController = new controllers_1.GetProjectsByUserIdController(getProjectsByUserIdUseCase);
    return getProjectsByUserIdController;
};
exports.makeGetProjectsByUserIdController = makeGetProjectsByUserIdController;
const makeUpdateProjectController = () => {
    const postgresUpdateProjectRepository = new postgres_1.PostgresUpdateProjectRepository();
    const postgresGetProjectByIdRepository = new postgres_1.PostgresGetProjectByIdRepository();
    const postgresGetUserByIdRepository = new postgres_1.PostgresGetUserByIdRepository();
    const postgresGetProjectByUserIdRepository = new postgres_1.PostgresGetProjectsByUserIdRepository();
    const updateProjectUseCase = new use_cases_1.UpdateProjectUseCase(postgresUpdateProjectRepository, postgresGetProjectByIdRepository, postgresGetUserByIdRepository, postgresGetProjectByUserIdRepository);
    const updateProjectController = new controllers_1.UpdateProjectController(updateProjectUseCase);
    return updateProjectController;
};
exports.makeUpdateProjectController = makeUpdateProjectController;
const makeDeleteProjectController = () => {
    const postgresDeleteProjectRepository = new postgres_1.PostgresDeleteProjectRepository();
    const postgresGetProjectByIdRepository = new postgres_1.PostgresGetProjectByIdRepository();
    const deleteProjectUseCase = new use_cases_1.DeleteProjectUseCase(postgresDeleteProjectRepository, postgresGetProjectByIdRepository);
    const deleteProjectController = new delete_project_1.DeleteProjectController(deleteProjectUseCase);
    return deleteProjectController;
};
exports.makeDeleteProjectController = makeDeleteProjectController;
