import axios from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/register', { name, email, password })
            const data = response.data
            console.log(response)
            console.log(data)
            if (data.error) {
                return toast.error(data.error)
            } else {
                setName("")
                setEmail("")
                setPassword("")
                toast.success("Register successfully. Welcome !")
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleRegister} >
                <label htmlFor="name">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder='Enter your name' />

                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder='Enter your email' />

                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='Enter your password' />

                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register
