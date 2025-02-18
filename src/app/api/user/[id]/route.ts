import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET(
  _request: Request,
  { params }: { params?: Promise<{ id: string }> } = {}
) {
  if (!params) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }

  try {
    const id = (await params).id;
    const user = await User.findById(id);
    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "There is no user for this ID" },
      { status: 500 }
    );
  }
}
