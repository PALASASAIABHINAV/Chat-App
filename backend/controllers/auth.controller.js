import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const login = (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

export const register = async(req, res) => {
    try {
        const { email, password, fullname } = req.body;
        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const user = await User.findOne({email});
        if(user){
          return res.status(400).json({message:"User already exists with this email"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            fullname,
        });
        if(newUser){
          await newUser.save();
            // Generate token and set cookie
          generateToken(newUser._id, res);
        }else{
            return res.status(400).json({message:"User registration failed"});
        }
        return res.status(201).json({
          _id: newUser._id,
          email: newUser.email,
          fullname: newUser.fullname,
          profilePicture: newUser.profilePicture,
        });
    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({message:"Internal server error"});
    }
  
};
export const logout = (req, res) => {
  try {
    
  } catch (error) {
    
  }
};