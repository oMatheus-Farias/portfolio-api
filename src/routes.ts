import { Router, Request, Response } from "express"
import { makeCreateUserController } from "./factories/controllers"

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
