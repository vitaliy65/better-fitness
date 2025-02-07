import mongoose, { Schema, Document } from "mongoose";

export interface IUserSurveyResponse extends Document {
  user: Schema.Types.ObjectId;
  survey: Schema.Types.ObjectId;
  content: string;
}

const UserSurveyResponseSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  survey: { type: Schema.Types.ObjectId, ref: "Survey" },
  content: { type: String, required: true },
});

const UserSurveyResponse = mongoose.model<IUserSurveyResponse>(
  "UserSurveyResponse",
  UserSurveyResponseSchema
);

export default UserSurveyResponse;
