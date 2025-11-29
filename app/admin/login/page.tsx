'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';



export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        });


      const json = await res.json();
      setLoading(false);

      if (res.ok) {
        router.push('/admin/galleries'); // redirect after successful login
        router.refresh(); // ensure middleware sees session
      } else {
        setError(json.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoading(false);
      setError('Unexpected error. Try again.');
      console.error(err);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#eaeaea]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className={`bg-indigo-600 text-white p-3 rounded-lg font-semibold transition-all duration-150
              hover:bg-indigo-700 hover:shadow-lg hover:scale-105
              ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
