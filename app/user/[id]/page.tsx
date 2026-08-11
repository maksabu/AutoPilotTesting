import { redirect, notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getSessionTokenFromCookies, isValidSession } from '@/lib/auth';
import AccordionSection from './AccordionSection';
import LogoutButton from './LogoutButton';
import Link from 'next/link';

export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const token = await getSessionTokenFromCookies();
  if (!(await isValidSession(token))) {
    redirect('/login');
  }

  const { data: user } = await supabase.from('users').select('*').eq('id', params.id).maybeSingle();
  if (!user) notFound();

  return (
    <div className="wrap" style={{ maxWidth: 700 }}>
      <div className="topbar">
        <Link className="backlink" href="/">&larr; Back to all users</Link>
        <LogoutButton />
      </div>

      <h1>{user.firstname} {user.lastname} (ID: {user.id})</h1>

      <AccordionSection
        id="personal"
        title="Personal Details"
        fields={[
          { label: 'First Name', value: user.firstname },
          { label: 'Last Name', value: user.lastname },
          { label: 'Age', value: String(user.age) },
        ]}
      />

      <AccordionSection
        id="role"
        title="Role Information"
        fields={[
          { label: 'Role', value: user.role },
          { label: 'User ID', value: String(user.id) },
        ]}
      />
    </div>
  );
}
