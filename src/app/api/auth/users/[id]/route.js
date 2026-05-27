import { dbConnect } from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";

const usersCollection = dbConnect("users");

export async function GET(request, { paramas }) {
  const { id } = await paramas;
  const query = { _id: new ObjectId(id) };
  const result = await usersCollection.findOne(query);
  return Response.json(result);
}
