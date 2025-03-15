import { NextResponse } from "next/server";
import User from "@/models/User";

// Constants for status codes and error messages
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  USER_EXISTS: "Користувач з таким email вже існує",
  USER_NOT_FOUND: "Користувача не знайдено",
  SERVER_ERROR: "Внутрішня помилка сервера",
};

// Utility function for generating JSON responses
function createResponse(data: Error | unknown, status: number) {
  return NextResponse.json(data, { status });
}

// Utility function for error handling
function handleError(error: Error | unknown) {
  console.error(error); // Log the error for debugging
  return createResponse(
    {
      error: {
        message: ERROR_MESSAGES.SERVER_ERROR,
        details: error instanceof Error ? error.message : String(error),
      },
    },
    STATUS_CODES.SERVER_ERROR
  );
}

export async function GET() {
  try {
    const users = await User.find();
    return createResponse(users, STATUS_CODES.OK);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Проверка на существование email
    if (!data.email) {
      return createResponse(
        { error: "Email is required" },
        STATUS_CODES.BAD_REQUEST
      );
    }

    // Перевірка на існуючого користувача за email
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return createResponse(
        { error: ERROR_MESSAGES.USER_EXISTS },
        STATUS_CODES.CONFLICT
      );
    }

    const newUser = new User(data);
    await newUser.save();
    return createResponse(newUser, STATUS_CODES.CREATED);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json(); // Отримати ID з запиту
    await User.findByIdAndDelete(id); // Видалити користувача за ID
    return createResponse(
      { message: "User deleted successfully" },
      STATUS_CODES.OK
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return createResponse(
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        STATUS_CODES.NOT_FOUND
      );
    }

    return createResponse(updatedUser, STATUS_CODES.OK);
  } catch (error) {
    return handleError(error);
  }
}
