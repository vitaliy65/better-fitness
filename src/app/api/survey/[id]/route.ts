import { NextResponse } from "next/server";
import Survey from "@/models/Survey";
import { connectToMongoDB } from "@/lib/mongodb";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToMongoDB();
  if (!params) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }

  try {
    const { id } = await params;
    const survey = await Survey.findById(id);
    if (!survey) {
      return NextResponse.json(
        { error: "There is no survey for this ID" },
        { status: 404 }
      );
    }
    return NextResponse.json(survey, { status: 200 });
  } catch (error) {
    console.error("Error fetching survey:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the survey" },
      { status: 500 }
    );
  }
}
