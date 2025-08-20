import express from "express";
import dotenv from "dotenv";
import connection from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import folderRouter from "./routes/folder.routes.js";

const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();
app.use(express.json());



app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/folder", folderRouter);


connection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});