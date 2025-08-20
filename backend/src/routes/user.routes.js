import express from "express";
import { login, register, logout, getAllUsers } from "../controllers/user.controllers.js";


const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/getAllUsers", getAllUsers);


export default userRouter;