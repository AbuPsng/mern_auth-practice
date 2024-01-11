import express from "express"
import { getProfile, loginUser, registerUser, test } from "../controllers/authController.js"
import cors from "cors"

const router = express.Router()

// middleware 
router.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

router.get("/", test)
router.get("/profile", getProfile)
router.post("/register", registerUser)
router.post("/login", loginUser)

export default router