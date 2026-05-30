"use server";

import { dbConnect } from "@/app/lib/dbConnect";

const taskCollection = dbConnect("task");
const usersCollection = dbConnect("users");

export async function POST(request) {
  // const user = usersCollection.find;
  const task = await request.json();
}
