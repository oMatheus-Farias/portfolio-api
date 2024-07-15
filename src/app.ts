import express from "express"
import cors from "cors"
import { router } from "./routes/routes"

import { PrismaClient } from "@prisma/client"

export const app = express()

export const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
app.use(router)
