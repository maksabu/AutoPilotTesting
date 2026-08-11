'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.push('/');
    } else {
      setError(true);
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <h1 style={{ fontSize: 20, marginTop: 0 }}>User Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box' }}
            required
          />
          <div style={{ marginTop: 12 }}>
            <label>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box' }}
              required
            />
          </div>
          {error && <div className="error-msg">Invalid username or password.</div>}
          <button type="submit" style={{ width: '100%', marginTop: 20 }}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
