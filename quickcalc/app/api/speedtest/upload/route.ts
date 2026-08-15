import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const arrayBuffer = await request.arrayBuffer();
    const bytesReceived = arrayBuffer.byteLength;

    return new NextResponse(
      JSON.stringify({ ok: true, bytesReceived }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch {
    return new NextResponse(
      JSON.stringify({ ok: false, error: "Failed to process upload payload" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
