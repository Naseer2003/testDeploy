import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Folder = mongoose.model("folder", folderSchema);

export default Folder;