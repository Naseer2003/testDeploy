import express from "express";
import { createFolder, getFolders } from "../controllers/folder.controllers.js";
const folderRouter = express.Router();



folderRouter.post('/', createFolder);
folderRouter.get('/get_folders', getFolders);


export default folderRouter;