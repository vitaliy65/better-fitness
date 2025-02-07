import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  survey: Schema.Types.ObjectId;
  part: number;
  content: string;
}

const QuestionSchema: Schema = new Schema({
  survey: {
    type: Schema.Types.ObjectId,
    ref: "Survey",
  },
  part: { type: Number, required: true },
  content: { type: String, required: true },
});

const Question = mongoose.model<IQuestion>("Question", QuestionSchema);

export default Question;
