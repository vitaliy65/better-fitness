import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET(
  _request: Request,
  { params }: { params?: Promise<{ id: string }> } = {}
) {
  try {
    if (params) {
      const id = (await params).id;
      const user = await User.findById(id);
      return NextResponse.json(user, { status: 200 });
    }

    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Перевірка на існуючого користувача за email
    const existingUser = await User.findOne({ Email: data.Email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Користувач з таким email вже існує" },
        { status: 409 }
      );
    }

    const newUser = new User(data);
    await newUser.save();
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json(); // Отримати ID з запиту
    await User.findByIdAndDelete(id); // Видалити опитування за ID
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
}
