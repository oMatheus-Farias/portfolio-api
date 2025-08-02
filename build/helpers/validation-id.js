"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfIdIsValid = void 0;
const validator_1 = __importDefault(require("validator"));
const checkIfIdIsValid = (id) => validator_1.default.isUUID(id);
exports.checkIfIdIsValid = checkIfIdIsValid;
