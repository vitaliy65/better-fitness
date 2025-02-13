import mongoose, { Schema } from "mongoose";

const QuestionSchema = new Schema({
  survey: {
    type: Schema.Types.ObjectId,
    ref: "Survey",
  },
  questionTitle: {
    type: String,
    required: true,
  },
  answers: [
    {
      answer: {
        type: String,
        required: true,
      },
    },
  ],
});

const Question =
  mongoose.models.Question || mongoose.model("Question", QuestionSchema);

export default Question;
