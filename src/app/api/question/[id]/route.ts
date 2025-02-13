import { NextResponse } from "next/server";
import Question from "@/models/Question";

export async function GET(
  _request: Request,
  { params }: { params?: Promise<{ id: string }> } = {}
) {
  if (!params) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }

  try {
    const id = (await params).id;
    const question = await Question.findById(id);
    return NextResponse.json(question, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "There is no question for this ID" },
      { status: 500 }
    );
  }
}
