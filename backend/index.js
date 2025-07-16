import express from 'express';
const app = express();


import dotenv from 'dotenv';
dotenv.config();

import authRouters from './routes/auth.route.js';
import messageRoute from './routes/message.route.js'
import connectDB from './lib/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from "cors";



const PORT=process.env.PORT || 4002;


app.use(express.json({limit:"5mb"}));
app.use(cookieParser());


app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))


app.use("/api/auth", authRouters);
app.use("/api/message",messageRoute);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});