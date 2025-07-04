import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const login = async(req, res) => {
  try {
    const { email, password } = req.body;
    const user=await User.findOne({ email });
    if(!user){
      return res.status(400).json({message:"User not found with this email"});
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
      return res.status(400).json({message:"Invalid password"});
    }
    //generating token and setting the cookie
    generateToken(user._id,res);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({message:"Internal server error"});
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
    res.clearCookie('jwt', { httpOnly: true });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout:", error);
    return res.status(500).json({message:"Internal server error"});
  }
};