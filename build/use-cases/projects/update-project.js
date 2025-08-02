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
exports.UpdateProjectUseCase = void 0;
const errors_1 = require("../../errors");
const check_project_exists_1 = require("../../helpers/check-project-exists");
class UpdateProjectUseCase {
    constructor(postgresUpdateProjectRepository, postgresGetProjectByIdRepository, postgresGetUserByIdRepository, postgresGetProjectsByUserIdRepository) {
        this.postgresUpdateProjectRepository = postgresUpdateProjectRepository;
        this.postgresGetProjectByIdRepository = postgresGetProjectByIdRepository;
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
        this.postgresGetProjectsByUserIdRepository = postgresGetProjectsByUserIdRepository;
        this.postgresUpdateProjectRepository = postgresUpdateProjectRepository;
        this.postgresGetProjectByIdRepository = postgresGetProjectByIdRepository;
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
        this.postgresGetProjectsByUserIdRepository =
            postgresGetProjectsByUserIdRepository;
    }
    execute(updateParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectAlreadyExists = yield this.postgresGetProjectByIdRepository.execute(updateParams.projectId);
            if (!projectAlreadyExists) {
                throw new errors_1.ProjectNotFoundError();
            }
            const userAlreadyExists = yield this.postgresGetUserByIdRepository.execute(updateParams.userId);
            const userAuthenticated = projectAlreadyExists.userId === updateParams.userId;
            if (!userAlreadyExists) {
                throw new errors_1.UserNotFoundError();
            }
            if (!userAuthenticated) {
                throw new errors_1.UserUnauthorizedError();
            }
            const registeredProjects = yield this.postgresGetProjectsByUserIdRepository.execute(updateParams.userId);
            const projectAlreadyExistsWithSameName = (0, check_project_exists_1.checkProjectExists)({
                project: registeredProjects,
            }, updateParams.updateParams.name);
            if (projectAlreadyExistsWithSameName) {
                throw new errors_1.ProjectNameAlreadyExistsError(updateParams.updateParams.name);
            }
            const updatedProject = yield this.postgresUpdateProjectRepository.execute(updateParams);
            return updatedProject;
        });
    }
}
exports.UpdateProjectUseCase = UpdateProjectUseCase;
