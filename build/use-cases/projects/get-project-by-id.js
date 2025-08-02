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
exports.GetProjectByIdUseCase = void 0;
const project_1 = require("../../errors/project");
class GetProjectByIdUseCase {
    constructor(postgresGetProjectByIdRepository) {
        this.postgresGetProjectByIdRepository = postgresGetProjectByIdRepository;
        this.postgresGetProjectByIdRepository = postgresGetProjectByIdRepository;
    }
    execute(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.postgresGetProjectByIdRepository.execute(projectId);
            if (!project) {
                throw new project_1.ProjectNotFoundError();
            }
            return project;
        });
    }
}
exports.GetProjectByIdUseCase = GetProjectByIdUseCase;
