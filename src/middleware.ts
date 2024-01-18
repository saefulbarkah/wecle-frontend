import { NextRequest, NextResponse } from "next/server";
import { SessionType } from "./hooks/sessions/type";
import { ApiResponse } from "./types";

const isAuthenticated = async (req: NextRequest): Promise<SessionType> => {
  try {
    const token = req.cookies.get("auth")?.value;
    const request = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/auth/verify",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ token: token }),
      },
    );
    const response: ApiResponse<SessionType> = await request.json();
    return response.data;
  } catch (error) {
    return null;
  }
};

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/create")) {
    const isAuthorized = await isAuthenticated(req);
    if (!isAuthorized) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // if (req.nextUrl.pathname.startsWith("/auth/")) {
  //   const isAuthorized = await isAuthenticated(req);
  //   if (isAuthorized) {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  // }

  return NextResponse.next();
}
