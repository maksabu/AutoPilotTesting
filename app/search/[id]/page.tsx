import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getSessionTokenFromCookies, isValidSession } from '@/lib/auth';
import Link from 'next/link';

export default async function SearchResultPage({ params }: { params: { id: string } }) {
  const token = await getSessionTokenFromCookies();
  if (!(await isValidSession(token))) {
    redirect('/login');
  }

  const { data: user } = await supabase.from('users').select('*').eq('id', params.id).maybeSingle();

  if (!user) {
    return (
      <div className="wrap" style={{ maxWidth: 600 }}>
        <div className="topbar">
          <Link className="backlink" href="/">&larr; Back to all users</Link>
        </div>
        <h1>Search Result</h1>
        <div className="card">
          <p>No user found with ID {params.id}.</p>
        </div>
      </div>
    );
  }

  const fields = [
    { label: 'User ID', value: String(user.id) },
    { label: 'First Name', value: user.firstname },
    { label: 'Last Name', value: user.lastname },
    { label: 'Age', value: String(user.age) },
    { label: 'Role', value: user.role },
  ];

  return (
    <div className="wrap" style={{ maxWidth: 600 }}>
      <div className="topbar">
        <Link className="backlink" href="/">&larr; Back to all users</Link>
      </div>

      <h1>Search Result</h1>

      <div className="card">
        <table>
          <tbody>
            {fields.map((f) => (
              <tr key={f.label}>
                <td style={{ width: '40%', fontWeight: 600, color: '#555' }}>{f.label}</td>
                <td>{f.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
