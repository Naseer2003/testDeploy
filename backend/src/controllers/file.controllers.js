import { Readable } from "stream";   // <- add this import
import cloudinary from "../config/cloudinary.js";
import File from "../models/file.model.js";
import Folder from "../models/folder.model.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    if (!req.body.folderId)
      return res.status(400).json({ error: "Folder ID is required" });

    const folder = await Folder.findById(req.body.folderId);
    if (!folder) return res.status(404).json({ error: "Folder not found" });

    // Convert buffer to readable stream for Cloudinary
    const stream = Readable.from(req.file.buffer);

    // Promise-based upload
    const uploadedFile = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder: folder.name },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.pipe(uploadStream);
    });

    const file = new File({
      name: uploadedFile.original_filename || req.file.originalname,
      url: uploadedFile.secure_url,
      public_id: uploadedFile.public_id,
      folder: folder._id,
      size: uploadedFile.bytes,
      type: uploadedFile.format,
    });

    await file.save();
    res.json(file);
  } catch (err) {
    console.error("Upload file error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const filesByFolder = async (req, res) => {
  try {
    const files = await File.find({
      folder: req.params.folderId,
    }).populate('folder');
    res.json(files);
  } catch (err) {
    console.error('Files by folder error:', err);
    res.status(500).json({ error: err.message });
  }
};
export const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });

    // ✅ Will now work because public_id is stored
    await cloudinary.uploader.destroy(file.public_id);

    await File.findByIdAndDelete(req.params.id);

    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error('Delete file error:', err);
    res.status(500).json({ error: err.message });
  }
};