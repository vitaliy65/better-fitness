import { NextResponse } from "next/server";
import Survey from "@/models/Survey";
import { connectToMongoDB } from "@/lib/mongodb";

export async function GET() {
  await connectToMongoDB();
  try {
    const surveys = await Survey.find();
    return NextResponse.json(surveys, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectToMongoDB();
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
  await connectToMongoDB();
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
