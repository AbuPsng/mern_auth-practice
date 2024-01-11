import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/login', { email, password })
            console.log(response)
            const user = response.data
            if (user.error) {
                toast.error(user.error)
            } else {
                setEmail("")
                setPassword("")
                toast.success("Welcome")
                navigate("/dashboard")
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }


    return (
        <div>
            <form onSubmit={handleLogin} >
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder='Enter your email' />

                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='Enter your password' />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
