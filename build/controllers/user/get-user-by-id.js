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
exports.GetUserByIdController = void 0;
const zod_1 = require("zod");
const errors_1 = require("../../errors");
const validation_id_1 = require("../../helpers/validation-id");
const schemas_1 = require("../../schemas");
class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase;
        this.getUserByIdUseCase = getUserByIdUseCase;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schemas_1.getUserByIdSchema.parseAsync({ userId });
                const idIsValid = (0, validation_id_1.checkIfIdIsValid)(userId);
                if (!idIsValid) {
                    return (0, errors_1.badRequest)("Invalid user ID.");
                }
                const user = yield this.getUserByIdUseCase.execute(userId);
                return {
                    statusCode: 200,
                    body: user,
                };
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    return (0, errors_1.badRequest)(error.errors[0].message);
                }
                if (error instanceof errors_1.UserNotFoundError) {
                    return (0, errors_1.notFound)(error.message);
                }
                console.log(error);
                return (0, errors_1.internalServerError)("Internal server error.");
            }
        });
    }
}
exports.GetUserByIdController = GetUserByIdController;
