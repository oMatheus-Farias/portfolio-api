import express from "express"
import cors from "cors"

import { Request, Response } from "express"

export const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello, world!" })
})
