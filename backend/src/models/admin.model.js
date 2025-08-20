import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add a userName"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
    },
    password: {
        type: String,
        required:  [true, "Please enter the password"],
        minlength: [6, "Password must be at least 6 characters"],
    },
}, {
    timestamps: true,
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;