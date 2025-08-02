"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProjectExists = void 0;
const checkProjectExists = ({ project }, projectName) => {
    return project.some((project) => project.name === projectName);
};
exports.checkProjectExists = checkProjectExists;
