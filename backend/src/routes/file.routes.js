import express from "express";
import multer from "multer";

const fileRouter = express.Router();
const storage = multer.memoryStorage();

const upload = multer({ storage });



fileRouter.post('/upload', upload.single('file'), uploadFile); // Changed 'file' to 'image'

fileRouter.get('/:folderId', filesByFolder);
fileRouter.delete('/:id', deleteFile);

module.exports = fileRouter;