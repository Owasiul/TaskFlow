import { dbConnect } from "@/app/lib/dbConnect";

const usersCollection = dbConnect("users");
// Get User Data
export async function GET(request) {
  try {
    const result = await usersCollection.find().toArray();
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}
