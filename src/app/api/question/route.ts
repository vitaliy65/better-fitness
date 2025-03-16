import { NextResponse } from "next/server";
import Question from "@/models/Question";
import { connectToMongoDB } from "@/lib/mongodb";

export async function GET() {
  await connectToMongoDB();
  try {
    const questions = await Question.find();
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectToMongoDB();
  try {
    const data = await request.json(); // Отримати дані з запиту

    if (Array.isArray(data)) {
      // Якщо це масив, додаємо всі запитання
      const questions = await Question.insertMany(data);
      return NextResponse.json(questions, { status: 201 });
    } else {
      // Якщо це один об'єкт, додаємо як окреме запитання
      const newQuestion = new Question(data);
      await newQuestion.save();
      return NextResponse.json(newQuestion, { status: 201 });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  await connectToMongoDB();
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
