import { dbConnect } from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";

const usersCollection = dbConnect("users");

export async function GET(request, { params }) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return Response.json({ message: "Invalid user id" }, { status: 400 });
  }

  const result = await usersCollection.findOne({ _id: new ObjectId(id) });

  if (!result) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  return Response.json(result);
}
