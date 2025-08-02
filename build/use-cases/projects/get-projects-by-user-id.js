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
exports.GetProjectsByUserIdUseCase = void 0;
const errors_1 = require("../../errors");
class GetProjectsByUserIdUseCase {
    constructor(postgresGetProjectsByUserIdRepository, postgresGetUserByIdRepository) {
        this.postgresGetProjectsByUserIdRepository = postgresGetProjectsByUserIdRepository;
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
        this.postgresGetProjectsByUserIdRepository =
            postgresGetProjectsByUserIdRepository;
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield this.postgresGetProjectsByUserIdRepository.execute(userId);
            const user = yield this.postgresGetUserByIdRepository.execute(userId);
            if (!user) {
                throw new errors_1.UserNotFoundError();
            }
            if (!projects) {
                return [];
            }
            return projects;
        });
    }
}
exports.GetProjectsByUserIdUseCase = GetProjectsByUserIdUseCase;
