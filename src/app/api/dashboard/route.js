"use server";

import { dbConnect } from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";

const taskCollection = dbConnect("task");
const usersCollection = dbConnect("users");

export async function POST(request, { params }) {
  const task = await request.json();
  const { id } = await params;
  console.log("user Id is ", id);
  const query = { _id: new ObjectId(id) };
  console.log(query);
  const userID = await usersCollection.findOne(query);
  console.log(userID);
  const newTask = {
    userID,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    photoURL: task.photoURL,
    priority: task.priority,
    tags: task.tags,
  };
  const result = await taskCollection.insertOne(newTask);
  return Response.json(result);
}
