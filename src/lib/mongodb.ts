import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export async function connectToMongoDB() {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("Invalid/Missing environment variable: 'MONGODB_URI'");
  }

  // DB Config
  const db = process.env.MONGODB_URI;

  // Connect to MongoDB
  await mongoose
    .connect(db)
    .then(() => {
      isConnected = true;
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      throw new Error("Failed to connect to MongoDB");
    });
}
