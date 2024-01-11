import userModel from "../model/userModel.js"
import { comparePassword, hashedPassword } from "../utils/auth.js"
import jwt from "jsonwebtoken"

export const test = async (req, res) => {
    res.send("test is working")
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name) return res.status(404).json({ error: "name is required" })
        if (!email) return res.status(404).json({ error: "email is required" })
        if (!password) return res.status(404).json({ error: "password is required" })

        const exist = await userModel.findOne({ email })
        if (exist) return res.status(404).json({ error: "User already exist" })

        const hashPassword = await hashedPassword(password)

        const newUser = await userModel.create({ name, email, password: hashPassword })

        res.status(202).json({ message: "user created successfully", result: newUser })

    } catch (error) {
        res.status(404).json({ error: error.message })
        console.log(error)

    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) return res.status(404).json({ error: "email is required" })
        if (!password) return res.status(404).json({ error: "password is required" })

        const exist = await userModel.findOne({ email })
        if (!exist) return res.status(404).json({ error: "User dosen't exist" })

        const match = await comparePassword(password, exist.password)

        if (!match) return res.status(404).json({ error: "either email or password is invalid" })

        jwt.sign({ email: exist.email, id: exist._id, name: exist.name }, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) {
                throw err
            }
            res.cookie("token", token, { httpOnly: true }).status(202).json({ message: "user logged in successfully", result: exist, token });
        })


    } catch (error) {
        res.status(404).json({ error: error.message })
        console.log(error)

    }
}

export const getProfile = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(404).json({ error: "Please log in" })

    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if (err) throw err
        res.json(user)
        console.log(user)
    })

} 