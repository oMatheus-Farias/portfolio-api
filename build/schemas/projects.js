"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAndDeleteProjectSchema = exports.getByIdSchema = exports.getProjectByNameSchema = exports.createProjectsSchema = void 0;
const zod_1 = require("zod");
exports.createProjectsSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: "Name is required.",
    })
        .trim()
        .min(1, {
        message: "Name is required.",
    })
        .max(50, {
        message: "Name must be at most 50 characters.",
    }),
    description: zod_1.z
        .string({
        required_error: "Description is required.",
    })
        .trim()
        .min(1, {
        message: "Description is required.",
    })
        .max(500, {
        message: "Description must be at most 500 characters.",
    }),
    imagesUrl: zod_1.z
        .string({
        required_error: "Images URL is required.",
    })
        .array()
        .nonempty({
        message: "Images URL is required.",
    }),
    repositoryUrl: zod_1.z
        .string({
        required_error: "Repository URL is required.",
    })
        .url({
        message: "Please provide a valid URL.",
    })
        .trim()
        .min(1, {
        message: "Repository URL is required.",
    }),
    projectUrl: zod_1.z
        .string({
        required_error: "Repository URL is required.",
    })
        .url({
        message: "Please provide a valid URL.",
    })
        .trim()
        .min(1, {
        message: "Repository URL is required.",
    }),
    technologies: zod_1.z
        .string({
        required_error: "Technologies is required.",
    })
        .array()
        .nonempty({
        message: "Technologies is required.",
    }),
    userId: zod_1.z
        .string({
        required_error: "User ID is required.",
    })
        .uuid({
        message: "User ID must be a valid UUID.",
    }),
});
exports.getProjectByNameSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: "Name is required.",
    })
        .trim()
        .min(1, {
        message: "Name is required.",
    })
        .max(50, {
        message: "Name must be at most 50 characters.",
    }),
});
exports.getByIdSchema = zod_1.z.object({
    id: zod_1.z
        .string({
        required_error: "ID is required.",
    })
        .uuid({
        message: "ID must be a valid UUID.",
    }),
});
exports.updateAndDeleteProjectSchema = zod_1.z.object({
    projectId: zod_1.z
        .string({
        required_error: "ID is required.",
    })
        .uuid({
        message: "ID must be a valid UUID.",
    }),
    userId: zod_1.z
        .string({
        required_error: "User ID is required.",
    })
        .uuid({
        message: "User ID must be a valid UUID.",
    }),
});
