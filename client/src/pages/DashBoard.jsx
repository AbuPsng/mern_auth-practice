import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const DashBoard = () => {
    const { user } = useContext(UserContext)
    console.log(user)
    return (
        <div>
            <h1>DashBoard</h1>
            <h2>
                {
                    user?.name
                }
            </h2>
        </div>
    )
}