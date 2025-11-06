import { NextResponse } from "next/server";

const allowOrigin =
  process.env.NEXT_PUBLIC_ALLOWED_ORIGIN?.trim() || "*";

const commonHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": allowOrigin,
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Max-Age": "86400",
};

export function createCorsResponse(body: unknown, status = 200) {
  const response = NextResponse.json(body, { status });
  for (const [key, value] of Object.entries(commonHeaders)) {
    response.headers.set(key, value);
  }
  return response;
}

export function applyCors(response: NextResponse) {
  for (const [key, value] of Object.entries(commonHeaders)) {
    response.headers.set(key, value);
  }
  return response;
}

export function handleCorsOptions() {
  return applyCors(new NextResponse(null, { status: 204 }));
}
