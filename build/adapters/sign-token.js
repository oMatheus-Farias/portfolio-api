"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class SignToken {
    execute({ payload }) {
        return (0, jsonwebtoken_1.sign)({
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
        }, process.env.JWT_SECRET, {
            subject: payload.userId,
        });
    }
}
exports.SignToken = SignToken;
