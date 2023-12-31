import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const auth = req.cookies.get("auth")?.value;

  // if (req.nextUrl.pathname.startsWith("/article/new")) {
  //   if (!auth) {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  // }

  return NextResponse.next();
}
