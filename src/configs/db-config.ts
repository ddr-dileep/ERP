import mongoose from "mongoose";

export const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "ERP",
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Database connection error");
  }
};
