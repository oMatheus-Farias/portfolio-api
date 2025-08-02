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
exports.DeleteProjectController = void 0;
const errors_1 = require("../../errors");
const zod_1 = require("zod");
const validation_id_1 = require("../../helpers/validation-id");
const projects_1 = require("../../schemas/projects");
class DeleteProjectController {
    constructor(deleteProjectUseCase) {
        this.deleteProjectUseCase = deleteProjectUseCase;
        this.deleteProjectUseCase = deleteProjectUseCase;
    }
    execute(projectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield projects_1.updateAndDeleteProjectSchema.parseAsync({ projectId, userId });
                const projectIdIsValid = (0, validation_id_1.checkIfIdIsValid)(projectId);
                const userIdIsValid = (0, validation_id_1.checkIfIdIsValid)(userId);
                if (!projectIdIsValid) {
                    return (0, errors_1.notFound)("Project ID is not valid. Please provide a valid project ID.");
                }
                if (!userIdIsValid) {
                    return (0, errors_1.notFound)("User ID is not valid. Please provide a valid user ID.");
                }
                const projectDeleted = yield this.deleteProjectUseCase.execute(projectId, userId);
                return {
                    statusCode: 200,
                    body: projectDeleted,
                };
            }
            catch (error) {
                if (error instanceof errors_1.ProjectNotFoundError) {
                    return (0, errors_1.notFound)(error.message);
                }
                if (error instanceof errors_1.UserUnauthorizedError) {
                    return (0, errors_1.unauthorized)(error.message);
                }
                if (error instanceof zod_1.ZodError) {
                    return (0, errors_1.badRequest)(error.errors[0].message);
                }
                console.log(error);
                return (0, errors_1.internalServerError)("Internal server error.");
            }
        });
    }
}
exports.DeleteProjectController = DeleteProjectController;
