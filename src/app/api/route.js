export async function GET(request) {
  return Response.json({
    status: 200,
    message: "API is running",
  });
}
