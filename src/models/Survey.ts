import mongoose from "mongoose";

const SurveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

// Check if the model already exists before defining it
const Survey = mongoose.models.Survey || mongoose.model("Survey", SurveySchema);

export default Survey;
