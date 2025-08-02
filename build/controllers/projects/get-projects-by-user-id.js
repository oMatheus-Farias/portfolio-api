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
exports.GetProjectsByUserIdController = void 0;
const errors_1 = require("../../errors");
const zod_1 = require("zod");
const projects_1 = require("../../schemas/projects");
const validation_id_1 = require("../../helpers/validation-id");
class GetProjectsByUserIdController {
    constructor(getProjectsByUserIdUseCase) {
        this.getProjectsByUserIdUseCase = getProjectsByUserIdUseCase;
        this.getProjectsByUserIdUseCase = getProjectsByUserIdUseCase;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield projects_1.getByIdSchema.parseAsync({ id: userId });
                const isIdValid = (0, validation_id_1.checkIfIdIsValid)(userId);
                if (!isIdValid) {
                    return (0, errors_1.badRequest)("The provided id is not valid. Please provide a valid id.");
                }
                const projects = yield this.getProjectsByUserIdUseCase.execute(userId);
                return {
                    statusCode: 200,
                    body: projects,
                };
            }
            catch (error) {
                if (error instanceof errors_1.UserNotFoundError) {
                    return (0, errors_1.notFound)(error.message);
                }
                if (error instanceof zod_1.ZodError) {
                    return (0, errors_1.badRequest)(error.errors[0].message);
                }
                console.log(error);
                return (0, errors_1.internalServerError)("Internal server error");
            }
        });
    }
}
exports.GetProjectsByUserIdController = GetProjectsByUserIdController;
