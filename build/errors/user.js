"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUnauthorizedError = exports.UserNotFoundError = exports.EmailAlreadyExistsError = void 0;
class EmailAlreadyExistsError extends Error {
    constructor(email) {
        super(`Email ${email} already exists`);
        this.name = "EmailAlreadyExistsError";
    }
}
exports.EmailAlreadyExistsError = EmailAlreadyExistsError;
class UserNotFoundError extends Error {
    constructor(email) {
        email
            ? super(`User with email ${email} not found`)
            : super("User not found");
        this.name = "UserNotFoundError";
    }
}
exports.UserNotFoundError = UserNotFoundError;
class UserUnauthorizedError extends Error {
    constructor() {
        super("User is not authorized to perform this action");
        this.name = "UserUnauthorizedError";
    }
}
exports.UserUnauthorizedError = UserUnauthorizedError;
