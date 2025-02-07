import { NextResponse } from "next/server";
import Question from "@/models/Question";

export async function GET(
  _request: Request,
  { params }: { params?: Promise<{ id: string }> } = {}
) {
  try {
    if (params) {
      const id = (await params).id;
      const question = await Question.findById(id);
      return NextResponse.json(question, { status: 200 });
    }

    const questions = await Question.find();
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json(); // Отримати дані з запиту
    const newQuestion = new Question(data); // Створити новий екземпляр опитування
    await newQuestion.save(); // Зберегти нове опитування в базі даних
    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json(); // Отримати ID з запиту
    await Question.findByIdAndDelete(id); // Видалити опитування за ID
    return NextResponse.json(
      { message: "Question deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
}
