import { NextResponse, NextRequest } from "next/server";
import Question from "@/models/Question";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!params) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }

  try {
    const { id } = await params;
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
