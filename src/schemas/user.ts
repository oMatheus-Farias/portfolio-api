import { z } from "zod"

export const createUserSquema = z.object({
  firstName: z
    .string({
      required_error: "First name is required.",
    })
    .trim()
    .min(1, {
      message: "First name is required.",
    }),
  lastName: z
    .string({
      required_error: "Last name is required.",
    })
    .trim()
    .min(1, {
      message: "Last name is required.",
    }),
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({
      message: "Please provide a valid email address.",
    })
    .trim()
    .min(1, { message: "Email is required." }),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .trim()
    .min(8, { message: "Password must be at least 8 characters." }),
})

export const getUserByEmailSchema = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({
      message: "Please provide a valid email address.",
    })
    .trim()
    .min(1, { message: "Email is required." }),
})
