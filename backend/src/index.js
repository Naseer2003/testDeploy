import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import connection from "./config/db.js";

const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();
app.use(express.json());



app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);


app.listen(PORT, () => {
    connection();
    console.log(`Server is running on port ${PORT}`)
})