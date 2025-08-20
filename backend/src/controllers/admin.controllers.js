import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../models/admin.model.js";

export const signup = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const userExists = await Admin.findOne({email})
        if(userExists) {
            return res.status(400).json({message : "Admin already exists"});
        }
        const hash = bcrypt.hashSync(password, 10);
        const user = await Admin.create({username, email, password : hash});
        return res.status(201).json({message: "Admin created successfully"}, user);
    } catch (error) {
        console.log("Signup error: ", error.message);
        return res.status(500).json({message : "Error in registering admin"});
    }
}

export const login = async(req, res) => {
    const {email, password} = req.body;
    try {
        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(404).json({message : "Admin not found"});
        }
        const isPassword = bcrypt.compareSync(password, admin.password);
        if(!isPassword) {
            return res.status(400).json({message : "Invalid credentials"});
        }
        else {
            const token = jwt.sign({id : admin._id}, process.env.JWT_SECRET, {expiresIn : "1d"});
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


export const removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("Delete request for ID:", id);
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Delete user error:", error.message);
    return res.status(500).json({ message: "Error in deleting user" });
  }
};
