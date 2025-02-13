import { NextResponse } from "next/server";
import Survey from "@/models/Survey";

export async function GET(
  _request: Request,
  { params }: { params?: Promise<{ id: string }> } = {}
) {
  if (!params) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }

  try {
    const id = (await params).id;
    const survey = await Survey.findById(id);
    return NextResponse.json(survey, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "There is no survey for this ID" },
      { status: 500 }
    );
  }
}
