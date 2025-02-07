import { NextResponse } from "next/server";
import Survey from "@/models/Survey";

export async function GET(
  _request: Request,
  { params }: { params?: Promise<{ id: string }> } = {}
) {
  try {
    if (params) {
      const id = (await params).id;
      const survey = await Survey.findById(id);
      return NextResponse.json(survey, { status: 200 });
    }

    const surveys = await Survey.find();
    return NextResponse.json(surveys, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json(); // Отримати дані з запиту
    const newSurvey = new Survey(data); // Створити новий екземпляр опитування
    await newSurvey.save(); // Зберегти нове опитування в базі даних
    return NextResponse.json(newSurvey, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json(); // Отримати ID з запиту
    await Survey.findByIdAndDelete(id); // Видалити опитування за ID
    return NextResponse.json(
      { message: "Survey deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
}
