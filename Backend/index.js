import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import path from "path"
import cors from "cors"

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import travelStoryRoutes from "./routes/travelStory.route.js"
import { fileURLToPath } from "url"

dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database is connected✅")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()

// IMPORTANT: Add this middleware for parsing form data
app.use(express.urlencoded({ extended: true }))

// Enable CORS for frontend (Replace with your frontend URL)
app.use(
  cors({
    origin: "http://localhost:5173", //frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow CRUD operations
    credentials: true, // Allow cookies & authorization headers
  })
)

app.use(cookieParser())

// for allowing json object in req body
app.use(express.json())

app.listen(process.env.PORT, () => {
  console.log('Server is running on PORT')
})

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/travel-story", travelStoryRoutes)

// server static files from the uploads and assets directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/assets", express.static(path.join(__dirname, "assets")))

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500

  const message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})