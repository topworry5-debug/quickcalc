import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestedMB = parseFloat(searchParams.get("sizeMB") || "2");
  const sizeMB = Math.min(Math.max(0.5, requestedMB), 3.5); // Clamp between 0.5MB and 3.5MB

  const totalBytes = Math.floor(sizeMB * 1024 * 1024);
  const buffer = new Uint8Array(totalBytes);

  // Fill buffer with pseudo-random non-repetitive byte values to prevent Gzip/Brotli compression
  for (let i = 0; i < totalBytes; i++) {
    buffer[i] = (i * 31 + (i % 251)) & 0xff;
  }

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Length": totalBytes.toString(),
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}
