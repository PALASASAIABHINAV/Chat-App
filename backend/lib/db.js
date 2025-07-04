import mongoose from "mongoose";


export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected Successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

