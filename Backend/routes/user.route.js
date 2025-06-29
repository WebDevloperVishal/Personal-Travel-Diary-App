import express from "express"
import { getUsers, signout } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()

router.get("/getusers", verifyToken, getUsers)

router.post("/signout", signout)

export default router