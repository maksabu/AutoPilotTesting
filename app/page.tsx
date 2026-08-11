'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = { id: number; firstname: string; lastname: string; age: number; role: string };

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('Admin');
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState<string>('');
  const router = useRouter();

  async function fetchUsers() {
    const res = await fetch('/api/users');
    if (res.status === 401) {
      router.push('/login');
      return;
    }
    setUsers(await res.json());
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, lastname, age: parseInt(age), role }),
    });
    setFirstname('');
    setLastname('');
    setAge('');
    fetchUsers();
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete user ' + id + '?')) return;
    await fetch('/api/users/' + id, { method: 'DELETE' });
    fetchUsers();
  }

  async function handleEdit(id: number) {
    const u = users.find((x) => x.id === id);
    if (!u) return;
    const newFirst = prompt('First name:', u.firstname);
    if (newFirst === null) return;
    const newLast = prompt('Last name:', u.lastname);
    const newAge = prompt('Age:', String(u.age));
    const newRole = prompt('Role:', u.role);
    await fetch('/api/users/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: newFirst,
        lastname: newLast,
        age: parseInt(newAge || '0'),
        role: newRole,
      }),
    });
    fetchUsers();
  }

  async function handleSearch() {
    if (!searchId) {
      setSearchResult('Enter an ID first.');
      return;
    }
    router.push('/search/' + searchId);
  }

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  }

  return (
    <div className="wrap">
      <div className="topbar">
        <h1>User Admin (Test App)</h1>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>

      <div className="card">
        <h3>Add User</h3>
        <form onSubmit={handleAdd}>
          <label>First Name</label>
          <input value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
          <label style={{ display: 'inline-block' }}>Last Name</label>
          <input value={lastname} onChange={(e) => setLastname(e.target.value)} required />
          <label style={{ display: 'inline-block' }}>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
          <label style={{ display: 'inline-block' }}>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Admin</option>
            <option>Manager</option>
            <option>Analyst</option>
            <option>User</option>
          </select>
          <div>
            <button type="submit">Add User</button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3>Search by ID</h3>
        <input type="number" value={searchId} onChange={(e) => setSearchId(e.target.value)} placeholder="Enter user ID" />
        <button onClick={handleSearch}>Search</button>
        <button className="secondary" onClick={() => { setSearchId(''); setSearchResult(''); }}>Clear</button>
        <div style={{ marginTop: 10, fontSize: 14 }}>{searchResult}</div>
      </div>

      <div className="card">
        <h3>All Users</h3>
        <table>
          <thead>
            <tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Age</th><th>Role</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.firstname}</td>
                <td>{u.lastname}</td>
                <td>{u.age}</td>
                <td>{u.role}</td>
                <td className="row-actions">
                  <button onClick={() => router.push('/user/' + u.id)}>View</button>
                  <button onClick={() => handleEdit(u.id)}>Edit</button>
                  <button className="danger" onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
