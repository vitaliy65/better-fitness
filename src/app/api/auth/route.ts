import { NextResponse } from "next/server";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const data = await req.json();

  const user = await User.findOne({ Email: data.email });
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

  const token = jwt.sign({ id: user._id }, jwtSecret, {
    expiresIn: "1h",
  });

  return NextResponse.json(
    {
      token,
      user: { id: user._id, name: user.Name, email: user.Email },
    },
    { status: 201 }
  );
}
