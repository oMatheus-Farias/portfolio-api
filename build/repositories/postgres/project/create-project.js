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
exports.PostgresCreateProjectRepository = void 0;
const app_1 = require("../../../app");
class PostgresCreateProjectRepository {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ params }) {
            const project = yield app_1.prisma.projects.create({
                data: {
                    name: params.name,
                    description: params.description,
                    imagesUrl: params.imagesUrl,
                    repositoryUrl: params.repositoryUrl,
                    projectUrl: params.projectUrl,
                    technologies: params.technologies,
                    userId: params.userId,
                },
            });
            return project;
        });
    }
}
exports.PostgresCreateProjectRepository = PostgresCreateProjectRepository;
