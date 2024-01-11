import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to database")
    } catch (error) {
        console.log("not connected to database")
        console.log(error)
    }
}