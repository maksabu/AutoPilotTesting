import { NextRequest, NextResponse } from 'next/server';

// Lightweight check here: presence of the cookie only. Full validity (does
// this token actually exist in the sessions table) is checked again inside
// each API route and the /user/[id] page itself, since middleware runs on
// the Edge runtime and we want to keep this fast and dependency-free.
export function middleware(req: NextRequest) {
  const token = req.cookies.get('session')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
