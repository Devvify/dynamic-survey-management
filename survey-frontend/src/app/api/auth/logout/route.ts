import { NextResponse, NextRequest } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    // Call backend API
    if (token) {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
    }

    // Create response and clear cookies
    const response = NextResponse.json({ success: true });
    response.cookies.delete("token");
    response.cookies.delete("user");

    return response;
  } catch {
    // Clear cookies anyway
    const response = NextResponse.json({ success: true });
    response.cookies.delete("token");
    response.cookies.delete("user");

    return response;
  }
}
