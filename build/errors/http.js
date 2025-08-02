"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalServerError = exports.conflict = exports.notFound = exports.unauthorized = exports.badRequest = void 0;
const badRequest = (message) => ({
    statusCode: 400,
    body: {
        message,
    },
});
exports.badRequest = badRequest;
const unauthorized = (message) => ({
    statusCode: 401,
    body: {
        message,
    },
});
exports.unauthorized = unauthorized;
const notFound = (message) => ({
    statusCode: 404,
    body: {
        message,
    },
});
exports.notFound = notFound;
const conflict = (message) => ({
    statusCode: 409,
    body: {
        message,
    },
});
exports.conflict = conflict;
const internalServerError = (message) => ({
    statusCode: 500,
    body: {
        message,
    },
});
exports.internalServerError = internalServerError;
