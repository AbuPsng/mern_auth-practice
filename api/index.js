import express from 'express'
import dotenv from "dotenv"
import authRouter from "./routes/authRoutes.js"
import { connectDb } from './config/mongoDb.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
connectDb()

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.use("/", authRouter)


app.listen(5001, () => {
    console.log("server is listening on port 5001")
})