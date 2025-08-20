import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    const {userName, email, password} = req.body;
    try {
        const userExists = await User.findOne({email})
        if(userExists) {
            return res.status(400).json({message : "user already exists"});
        }
        const hash = bcrypt.hashSync(password, 10);
        const user = await User.create({userName, email, password : hash});

        return res.status(201).json({message: "user created successfully"}, user);
    } catch (error) {
        console.log("Signup error: ", error.message);
        return res.status(500).json({message : "Error in registering user"});
    }
}


export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message : "User not found"});
        }
        const isPassword = bcrypt.compareSync(password, user.password);

        if(!isPassword) {
            return res.status(400).json({message : "Invalid credentials"});
        }
        else {
            const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : "1d"});
            return res.status(200).json({message : "Login successful", token});
        }
    } catch (error) {
        console.log("Login error: ", error.message);
        res.status(500).json({message: "Error in login"});
    }
}


export const logout = (req, res) => {
    try {
        res.status(200).json({message : "Logout successful"});
    } catch (error) {
        console.log("Logout error: ", error.message);
        res.status(500).json({message : "Error in logout"});
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});  
        return res.status(200).json({users});
    } catch (error) {
        console.log("Get all users error: ", error.message);
        res.status(500).json({message : "Error in getting all users"});
    }
}