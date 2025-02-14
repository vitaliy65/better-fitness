import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  Name: { type: String, required: false },
  Age: { type: Number, required: false },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
