import { generateToken } from "../lib/utils/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
     try {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).send("All fields are required");
        }

        // if(password.length < 6) {
        //     return res.status(400).send("Password must be at least 6 characters long");
        // }

        const user=await User.findOne({ email });
        if (user) {
            return res.status(400).send("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();
        }else{
            return res.status(500).send("Error creating user");
        }
        res.status(201).send({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            profilePicture: newUser.profilePicture,
        });
     } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send("Internal Server Error");
     }
};

export const login = async(req, res) => {
  try {
    const {email,password}=req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }
    const user=await User.findOne({ email });
    if (!user) {
        return res.status(400).send("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send("Invalid credentials");
    }
    generateToken(user._id, res);
    res.status(200).send({
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
    });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie('jwt');
    res.status(200).send("Logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateProfile = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).send("Internal Server Error");
    }
}