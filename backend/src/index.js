import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connection from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import folderRouter from "./routes/folder.routes.js";
import fileRouter from "./routes/file.routes.js";

const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (
  !process.env.CLOUD_NAME ||
  !process.env.CLOUD_API_KEY ||
  !process.env.CLOUD_API_SECRET
) {
  console.error("Missing Cloudinary environment variables");
  process.exit(1);
}

if(process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));
}


app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/folder", folderRouter);
app.use("/api/files", fileRouter);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}

connection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
