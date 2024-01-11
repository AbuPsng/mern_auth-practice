import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const getUserDetails = async () => {
        try {
            const response = await axios.get("/profile")
            console.log(response.data)
            console.log(response)
            const data = response?.data?.result
            setUser({ ...data })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!user) {
            getUserDetails()
        }
    }, [])
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}