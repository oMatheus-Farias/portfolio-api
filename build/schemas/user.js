"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdSchema = exports.authUserSchema = exports.getUserByEmailSchema = exports.createUserSquema = void 0;
const zod_1 = require("zod");
exports.createUserSquema = zod_1.z.object({
    firstName: zod_1.z
        .string({
        required_error: "First name is required.",
    })
        .trim()
        .min(1, {
        message: "First name is required.",
    }),
    lastName: zod_1.z
        .string({
        required_error: "Last name is required.",
    })
        .trim()
        .min(1, {
        message: "Last name is required.",
    }),
    email: zod_1.z
        .string({
        required_error: "Email is required.",
    })
        .email({
        message: "Please provide a valid email address.",
    })
        .trim()
        .min(1, { message: "Email is required." }),
    password: zod_1.z
        .string({
        required_error: "Password is required.",
    })
        .trim()
        .min(8, { message: "Password must be at least 8 characters." }),
});
exports.getUserByEmailSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "Email is required.",
    })
        .email({
        message: "Please provide a valid email address.",
    })
        .trim()
        .min(1, { message: "Email is required." }),
});
exports.authUserSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "Email is required.",
    })
        .email({
        message: "Please provide a valid email address.",
    })
        .trim()
        .min(1, { message: "Email is required." }),
    password: zod_1.z
        .string({
        required_error: "Password is required.",
    })
        .trim()
        .min(8, { message: "Password must be at least 8 characters." }),
});
exports.getUserByIdSchema = zod_1.z.object({
    userId: zod_1.z
        .string({
        required_error: "User ID is required.",
    })
        .trim()
        .uuid({
        message: "Invalid user ID.",
    }),
});
