import mongoose from "mongoose";

export async function connectToMongoDB() {
    if (!process.env.MONGODB_URI) {
        throw new Error("Invalid/Missing environment variable: 'MONGODB_URI'");
    }
    
    // DB Config
    const db = process.env.MONGODB_URI;

    // Connect to MongoDB
    mongoose
    .connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
}
