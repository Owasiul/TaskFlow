"use server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/app/lib/dbConnect";

export async function POST(request) {
  try {
    const body = await request.json();

    // Check if user already exists
    const usersCollection = dbConnect("users");
    const user = await usersCollection.findOne({ email: body.email });

    if (user) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 409 },
      );
    }

    // Hash password
    const hashPassword = await bcrypt.hash(body.password, 10);

    // Create new user
    const newUser = {
      name: body.name,
      email: body.email,
      password: hashPassword,
      createdAt: new Date().toISOString(),
    };

    const result = await usersCollection.insertOne(newUser);

    if (result?.acknowledged) {
      return Response.json(
        { success: true, message: "User created successfully" },
        { status: 201 },
      );
    } else {
      return Response.json(
        { success: false, message: "Failed to create user" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
