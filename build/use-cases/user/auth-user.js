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
exports.AuthUserUseCase = void 0;
const errors_1 = require("../../errors");
class AuthUserUseCase {
    constructor(postgresGetUserByEmailRepository, passwordCompareAdapter, signToken) {
        this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository;
        this.passwordCompareAdapter = passwordCompareAdapter;
        this.signToken = signToken;
        this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository;
        this.passwordCompareAdapter = passwordCompareAdapter;
        this.signToken = signToken;
    }
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.postgresGetUserByEmailRepository.execute(email);
            if (!user) {
                throw new errors_1.UserNotFoundError(email);
            }
            const passwordMatch = yield this.passwordCompareAdapter.execute(password, user.password);
            if (!passwordMatch) {
                throw new errors_1.UserNotFoundError();
            }
            const token = this.signToken.execute({
                payload: {
                    userId: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },
            });
            const authUser = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token,
            };
            return authUser;
        });
    }
}
exports.AuthUserUseCase = AuthUserUseCase;
