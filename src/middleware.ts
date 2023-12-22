import { NextRequest, NextResponse } from 'next/server';

async function authenticated(req: NextRequest) {
  const token = req.cookies.get('auth')?.value;

  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL_API + '/auth/verify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ token }),
    }
  );
  const data = await response.json();
  return data.data;
}

export async function middleware(req: NextRequest) {
  const auth = await authenticated(req);

  if (!auth) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/article/new'],
};
