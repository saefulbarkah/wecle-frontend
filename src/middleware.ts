import { NextRequest, NextResponse } from "next/server";
import { SessionType } from "./hooks/sessions/type";

const isAuthenticated = async (req: NextRequest): Promise<SessionType> => {
  const token = req.cookies.get("auth")?.value;
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/auth/verify",
      {
        method: "POST",
        body: JSON.stringify({ token: token }),
      },
    );
    if (response.ok) {
      const data: SessionType = await response.json();
      return data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/article/new")) {
    const isAuthorized = await isAuthenticated(req);
    if (!isAuthorized) {
      return NextResponse.redirect("/");
    }
  }

  return NextResponse.next();
}
