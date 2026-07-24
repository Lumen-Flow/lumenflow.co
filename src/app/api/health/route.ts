export function GET() {
  return Response.json(
    {
      status: "ok",
      service: "lumenandflow-web",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
