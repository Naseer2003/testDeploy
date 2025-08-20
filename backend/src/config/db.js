import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('DB Connected!');
  } catch (error) {
    console.log('connection failed', error);
  }
};

export default connection;

