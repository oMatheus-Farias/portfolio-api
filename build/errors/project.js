"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectNotFoundError = exports.ProjectNameAlreadyExistsError = void 0;
class ProjectNameAlreadyExistsError extends Error {
    constructor(name) {
        super(`Project name ${name} already exists`);
        this.name = "ProjectNameAlreadyExistsError";
    }
}
exports.ProjectNameAlreadyExistsError = ProjectNameAlreadyExistsError;
class ProjectNotFoundError extends Error {
    constructor(projectName) {
        projectName
            ? super(`Project with name ${projectName} not found`)
            : super("Project not found");
        this.name = "ProjectNotFoundError";
    }
}
exports.ProjectNotFoundError = ProjectNotFoundError;
