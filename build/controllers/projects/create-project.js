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
exports.CreateProjectController = void 0;
const zod_1 = require("zod");
const errors_1 = require("../../errors");
const project_1 = require("../../errors/project");
const projects_1 = require("../../schemas/projects");
class CreateProjectController {
    constructor(createProjectUseCase) {
        this.createProjectUseCase = createProjectUseCase;
        this.createProjectUseCase = createProjectUseCase;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ httpRequest }) {
            try {
                yield projects_1.createProjectsSchema.parseAsync(httpRequest);
                const project = yield this.createProjectUseCase.execute({
                    params: httpRequest,
                });
                return {
                    statusCode: 201,
                    body: project,
                };
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    return (0, errors_1.badRequest)(error.errors[0].message);
                }
                if (error instanceof project_1.ProjectNameAlreadyExistsError) {
                    return (0, errors_1.badRequest)(error.message);
                }
                console.log(error);
                return (0, errors_1.internalServerError)("Internal server error");
            }
        });
    }
}
exports.CreateProjectController = CreateProjectController;
