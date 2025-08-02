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
exports.UpdateProjectController = void 0;
const errors_1 = require("../../errors");
const zod_1 = require("zod");
const projects_1 = require("../../schemas/projects");
const validation_id_1 = require("../../helpers/validation-id");
class UpdateProjectController {
    constructor(updateProjectUseCase) {
        this.updateProjectUseCase = updateProjectUseCase;
        this.updateProjectUseCase = updateProjectUseCase;
    }
    execute(updateParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield projects_1.updateAndDeleteProjectSchema.parseAsync(updateParams);
                const userIdIsValid = (0, validation_id_1.checkIfIdIsValid)(updateParams.userId);
                const projectIdIsValid = (0, validation_id_1.checkIfIdIsValid)(updateParams.projectId);
                if (!userIdIsValid || !projectIdIsValid) {
                    return (0, errors_1.badRequest)("ID provided is not a valid UUID. Please provide a valid UUID.");
                }
                if (!updateParams.updateParams) {
                    return (0, errors_1.badRequest)("Please provide the fields to update the project.");
                }
                const updatedProject = yield this.updateProjectUseCase.execute(updateParams);
                return {
                    statusCode: 200,
                    body: updatedProject,
                };
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    return (0, errors_1.badRequest)(error.errors[0].message);
                }
                if (error instanceof errors_1.ProjectNotFoundError) {
                    return (0, errors_1.notFound)(error.message);
                }
                if (error instanceof errors_1.UserUnauthorizedError) {
                    return (0, errors_1.unauthorized)(error.message);
                }
                if (error instanceof errors_1.UserNotFoundError) {
                    return (0, errors_1.notFound)(error.message);
                }
                if (error instanceof errors_1.ProjectNameAlreadyExistsError) {
                    return (0, errors_1.conflict)(error.message);
                }
                console.log(error);
                return (0, errors_1.internalServerError)("Internal server error");
            }
        });
    }
}
exports.UpdateProjectController = UpdateProjectController;
