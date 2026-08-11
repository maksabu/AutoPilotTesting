import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { isValidSession } from '@/lib/auth';

async function checkAuth(req: NextRequest) {
  const token = req.cookies.get('session')?.value;
  return isValidSession(token);
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await checkAuth(req))) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const { data, error } = await supabase.from('users').select('*').eq('id', params.id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await checkAuth(req))) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const body = await req.json();
  const { data, error } = await supabase
    .from('users')
    .update({
      firstname: body.firstname,
      lastname: body.lastname,
      age: body.age,
      role: body.role,
    })
    .eq('id', params.id)
    .select()
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await checkAuth(req))) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const { error } = await supabase.from('users').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
