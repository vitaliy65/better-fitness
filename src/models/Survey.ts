import mongoose, { Schema, Document } from "mongoose";

export interface ISurvey extends Document {
  title: string;
  description: string;
}

const SurveySchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Survey = mongoose.model<ISurvey>("Survey", SurveySchema);

export default Survey;
