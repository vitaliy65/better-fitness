import { NextResponse } from "next/server";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { connectToMongoDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  await connectToMongoDB();
  const data = await req.json();

  const user = await User.findOne({ email: data.email });
  if (!user || !(await user.matchPassword(data.password))) {
    return NextResponse.json(
      {
        message: "Invalid email or password",
      },
      { status: 401 }
    );
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign(
    { id: user._id, name: user.name, age: user.age, email: user.email },
    jwtSecret,
    {
      expiresIn: "1h",
    }
  );

  return NextResponse.json(
    {
      token,
      user: {
        id: user._id,
        name: user.name,
        age: user.age,
        email: user.email,
      },
    },
    { status: 201 }
  );
}
