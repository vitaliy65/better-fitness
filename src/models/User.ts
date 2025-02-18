import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  Name: { type: String, required: false },
  Age: { type: Number, required: false },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.Password);
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
