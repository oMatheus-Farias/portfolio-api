import express from "express"
import cors from "cors"
import { router } from "./routes/routes"

import fs from "fs"
import path from "path"

import { PrismaClient } from "@prisma/client"

import swaggerUi from "swagger-ui-express"

export const app = express()

export const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
app.use(router)

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../docs/swagger.json"), "utf8"),
)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
