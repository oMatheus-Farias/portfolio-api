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
exports.CreateUserUseCase = void 0;
const errors_1 = require("../../errors");
class CreateUserUseCase {
    constructor(postgresCreateUserRepository, postgresGetUserByEmailRepository, passwordHasherAdapter) {
        this.postgresCreateUserRepository = postgresCreateUserRepository;
        this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository;
        this.passwordHasherAdapter = passwordHasherAdapter;
        this.postgresCreateUserRepository = postgresCreateUserRepository;
        this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository;
        this.passwordHasherAdapter = passwordHasherAdapter;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ params }) {
            const emailAlreadyExists = yield this.postgresGetUserByEmailRepository.execute(params.email);
            if (emailAlreadyExists) {
                throw new errors_1.EmailAlreadyExistsError(params.email);
            }
            const hashedPassword = yield this.passwordHasherAdapter.execute(params.password);
            const user = yield this.postgresCreateUserRepository.execute({
                params: Object.assign(Object.assign({}, params), { password: hashedPassword }),
            });
            return user;
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
