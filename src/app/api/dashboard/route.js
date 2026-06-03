"use server";
import { dbConnect } from "@/app/lib/dbConnect";

const taskCollection = dbConnect("task");

export async function POST(request) {
  const task = await request.json();
  const userID = task.userID;
  if (!userID) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const newTask = {
    userID,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    photoURL: task.photoURL || null,
    priority: task.priority,
    tags: task.tags,
  };

  const result = await taskCollection.insertOne(newTask);
  return Response.json(result);
}

