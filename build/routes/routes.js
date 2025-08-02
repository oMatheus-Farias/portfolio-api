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
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../factories/controllers");
const is_authenticated_1 = require("../middlewares/is-authenticated");
exports.router = (0, express_1.Router)();
exports.router.get("/", (req, res) => {
    res.status(200).json({ message: "API is running 🚀" });
});
exports.router.post("/api/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createUserController = (0, controllers_1.makeCreateUserController)();
    const { statusCode, body } = (yield createUserController.execute({
        httRequest: req.body,
    }));
    res.status(statusCode).json(body);
}));
exports.router.get("/api/user/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getUserByEmailController = (0, controllers_1.makeGetUserByEmailController)();
    const { statusCode, body } = (yield getUserByEmailController.execute(req.params.email));
    res.status(statusCode).json(body);
}));
exports.router.get("/api/user/id/:userId", is_authenticated_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getUserByIdController = (0, controllers_1.makeGetUserByIdController)();
    const { statusCode, body } = yield getUserByIdController.execute(req.params.userId);
    res.status(statusCode).json(body);
}));
exports.router.post("/api/user/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authUserController = (0, controllers_1.makeAuthUserController)();
    const { statusCode, body } = yield authUserController.execute(req.body.email, req.body.password);
    res.status(statusCode).json(body);
}));
exports.router.post("/api/project", is_authenticated_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createProjectController = (0, controllers_1.makeCreateProjectController)();
    const { statusCode, body } = (yield createProjectController.execute({
        httpRequest: req.body,
    }));
    res.status(statusCode).json(body);
}));
exports.router.get("/api/project/name/:name", is_authenticated_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getProjectByNameController = (0, controllers_1.makeGetProjectByNameController)();
    const { statusCode, body } = yield getProjectByNameController.execute(req.params.name);
    res.status(statusCode).json(body);
}));
exports.router.get("/api/project/:id", is_authenticated_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getProjectByIdController = (0, controllers_1.makeGetProjectByIdController)();
    const { statusCode, body } = yield getProjectByIdController.execute(req.params.id);
    res.status(statusCode).json(body);
}));
exports.router.get("/api/projects/:userId", is_authenticated_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getProjectsByUserIdController = (0, controllers_1.makeGetProjectsByUserIdController)();
    const { statusCode, body } = yield getProjectsByUserIdController.execute(req.params.userId);
    res.status(statusCode).json(body);
}));
exports.router.patch("/api/project/:projectId", is_authenticated_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateProjectController = (0, controllers_1.makeUpdateProjectController)();
    const { statusCode, body } = yield updateProjectController.execute({
        projectId: req.params.projectId,
        userId: req.body.userId,
        updateParams: req.body,
    });
    res.status(statusCode).json(body);
}));
exports.router.delete("/api/project/delete/:projectId", is_authenticated_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteProjectController = (0, controllers_1.makeDeleteProjectController)();
    const { statusCode, body } = yield deleteProjectController.execute(req.params.projectId, req.body.userId);
    res.status(statusCode).json(body);
}));
