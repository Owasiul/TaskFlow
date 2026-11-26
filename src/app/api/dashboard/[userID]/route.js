import { dbConnect } from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const taskCollection = dbConnect("task");

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session?.user?._id;
    const userTasks = await taskCollection.find({ userID: userId }).toArray();
    return Response.json(userTasks, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { userID } = await params;
    if (!userID) {
      return Response({ message: "user is not authenticated" });
    }
  } catch (error) {
    console.log(error.message);
  }
}
