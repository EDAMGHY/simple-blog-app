import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("[MONGO_URI] environment variable is not defined.");
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected : ${conn.connection.host}...`);
  } catch (err: any) {
    console.log(`Error:`, err.message);
    process.exit(1);
  }
};
