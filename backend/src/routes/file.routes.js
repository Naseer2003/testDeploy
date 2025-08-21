import express from "express";
import multer from "multer";
import { deleteFile, filesByFolder, uploadFile } from "../controllers/file.controllers.js";

const fileRouter = express.Router();
const storage = multer.memoryStorage();

const upload = multer({ storage });



fileRouter.post('/upload', upload.single('file'), uploadFile); // Changed 'file' to 'image'

fileRouter.get('/:folderId', filesByFolder);
fileRouter.delete('/:id', deleteFile);

export default fileRouter;