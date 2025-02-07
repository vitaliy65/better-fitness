import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  Name: string;
  Age: number;
  Email: string;
  Password: string;
}

const UserSchema: Schema = new Schema({
  Name: { type: String, required: true },
  Age: { type: Number, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
