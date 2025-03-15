import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!params || !params.id) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }

  try {
    const { id } = params;
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { error: "There is no user for this ID" },
        { status: 404 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the user" },
      { status: 500 }
    );
  }
}
