import { NextRequest, NextResponse } from 'next/server';
import { destroySession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('session')?.value;
  if (token) await destroySession(token);

  const res = NextResponse.json({ success: true });
  res.cookies.set('session', '', { path: '/', maxAge: 0 });
  return res;
}
