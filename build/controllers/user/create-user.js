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
exports.CreateUserController = void 0;
const zod_1 = require("zod");
const schemas_1 = require("../../schemas");
const errors_1 = require("../../errors");
class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.createUserUseCase = createUserUseCase;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ httRequest }) {
            try {
                yield schemas_1.createUserSquema.parseAsync(httRequest);
                const user = yield this.createUserUseCase.execute({
                    params: httRequest,
                });
                return {
                    statusCode: 201,
                    body: user,
                };
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    return (0, errors_1.badRequest)(error.errors[0].message);
                }
                if (error instanceof errors_1.EmailAlreadyExistsError) {
                    return (0, errors_1.badRequest)(error.message);
                }
                console.error(error);
                return (0, errors_1.internalServerError)("Internal server error");
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
