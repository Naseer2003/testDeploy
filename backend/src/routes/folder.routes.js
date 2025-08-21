import express from "express";
import { createFolder, deleteFolder, getFolders } from "../controllers/folder.controllers.js";
const folderRouter = express.Router();



folderRouter.post('/', createFolder);
folderRouter.get('/get_folders', getFolders);
folderRouter.delete("/:id", deleteFolder);


export default folderRouter;