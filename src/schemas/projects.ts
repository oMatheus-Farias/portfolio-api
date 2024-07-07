import { z } from "zod"

export const createProjectsSchema = z.object({
  name: z
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
  description: z
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
  imagesUrl: z
    .string({
      required_error: "Images URL is required.",
    })
    .array()
    .nonempty({
      message: "Images URL is required.",
    }),
  repositoryUrl: z
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
  projectUrl: z
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
  technologies: z
    .string({
      required_error: "Technologies is required.",
    })
    .array()
    .nonempty({
      message: "Technologies is required.",
    }),
  userId: z
    .string({
      required_error: "User ID is required.",
    })
    .uuid({
      message: "User ID must be a valid UUID.",
    }),
})

export const getProjectByNameSchema = z.object({
  name: z
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
})
