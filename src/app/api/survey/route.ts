import { NextResponse } from "next/server";
import Survey from "@/models/Survey";

export async function GET() {
  try {
    const surveys = await Survey.find();
    return NextResponse.json(surveys, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newSurvey = new Survey(data);
    await newSurvey.save();
    return NextResponse.json(newSurvey, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await Survey.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Survey deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
}
