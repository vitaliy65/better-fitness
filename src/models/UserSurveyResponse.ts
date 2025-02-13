import mongoose, { Schema } from "mongoose";

const UserSurveyResponseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  survey: { type: Schema.Types.ObjectId, ref: "Survey" },
  content: { type: String, required: true },
});

const UserSurveyResponse =
  mongoose.models.UserSurveyResponse ||
  mongoose.model("UserSurveyResponse", UserSurveyResponseSchema);

export default UserSurveyResponse;
