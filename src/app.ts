import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

import { Request, Response } from "express"

export const app = express()

export const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello, world!" })
})
