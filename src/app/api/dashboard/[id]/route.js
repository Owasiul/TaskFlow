import { dbConnect } from "@/app/lib/dbConnect";

const taskCollection = dbConnect("task");

export async function GET(request, { params }) {
  try {
    const { id } = params;
    console.log("userID is", id);
    const userTasks = await taskCollection.find({ userID: id }).toArray();
    return Response.json(userTasks, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}
