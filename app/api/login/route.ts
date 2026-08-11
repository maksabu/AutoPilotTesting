import { NextRequest, NextResponse } from 'next/server';
import { VALID_USERNAME, VALID_PASSWORD, createSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const token = await createSession();
  const res = NextResponse.json({ success: true });
  res.cookies.set('session', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
  });
  return res;
}
