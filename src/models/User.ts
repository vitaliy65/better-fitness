import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  Name: { type: String, required: true },
  Age: { type: Number, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
