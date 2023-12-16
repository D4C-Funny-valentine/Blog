import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (error) {
    throw new Error("Couldn't connect to database");
  }
};

export default connectDB;
