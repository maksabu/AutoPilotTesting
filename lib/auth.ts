import { supabase } from './supabase';
import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';

export const VALID_USERNAME = process.env.APP_USERNAME || 'testuser';
export const VALID_PASSWORD = process.env.APP_PASSWORD || 'pass123';

export async function createSession(): Promise<string> {
  const token = randomBytes(24).toString('hex');
  const { error } = await supabase.from('sessions').insert({ token });
  if (error) throw error;
  return token;
}

export async function destroySession(token: string) {
  await supabase.from('sessions').delete().eq('token', token);
}

export async function isValidSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const { data } = await supabase.from('sessions').select('token').eq('token', token).maybeSingle();
  return !!data;
}

// Convenience for server components/route handlers reading the cookie
export async function getSessionTokenFromCookies(): Promise<string | undefined> {
  const store = await cookies();
  return store.get('session')?.value;
}
