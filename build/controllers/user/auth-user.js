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
exports.AuthUserController = void 0;
const zod_1 = require("zod");
const errors_1 = require("../../errors");
const schemas_1 = require("../../schemas");
class AuthUserController {
    constructor(authUserUseCase) {
        this.authUserUseCase = authUserUseCase;
        this.authUserUseCase = authUserUseCase;
    }
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schemas_1.authUserSchema.parseAsync({ email, password });
                const authUser = yield this.authUserUseCase.execute(email, password);
                return {
                    statusCode: 200,
                    body: authUser,
                };
            }
            catch (error) {
                if (error instanceof errors_1.UserNotFoundError) {
                    return (0, errors_1.notFound)(error.message);
                }
                if (error instanceof zod_1.ZodError) {
                    return (0, errors_1.badRequest)(error.errors[0].message);
                }
                console.error(error);
                return (0, errors_1.internalServerError)("Internal server error");
            }
        });
    }
}
exports.AuthUserController = AuthUserController;
