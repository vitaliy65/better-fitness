import { NextResponse } from "next/server";
import Question from "@/models/Question";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!params || !params.id) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }

  try {
    const { id } = params;
    const question = await Question.findById(id);
    if (!question) {
      return NextResponse.json(
        { error: "There is no question for this ID" },
        { status: 404 }
      );
    }
    return NextResponse.json(question, { status: 200 });
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the question" },
      { status: 500 }
    );
  }
}
