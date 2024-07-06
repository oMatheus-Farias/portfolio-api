import { Router, Request, Response } from "express"
import {
  makeCreateUserController,
  makeGetUserByEmailController,
} from "./factories/controllers"

export const router = Router()

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API is running 🚀" })
})

router.post("/api/user", async (req: Request, res: Response) => {
  const createUserController = makeCreateUserController()

  const { statusCode, body } = (await createUserController.execute({
    httRequest: req.body,
  })) as {
    statusCode: number
    body: {
      id: string
      firstName: string
      lastName: string
      email: string
      password: string
    }
  }

  res.status(statusCode).json(body)
})

router.get("/api/user/email", async (req: Request, res: Response) => {
  const getUserByEmailController = makeGetUserByEmailController()

  const { statusCode, body } = (await getUserByEmailController.execute(
    req.body.email,
  )) as unknown as {
    statusCode: number
    body: {
      email: string
    }
  }

  res.status(statusCode).json(body)
})
