'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';


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
        router.push('/admin'); // redirect after successful login
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
    <section className='bg-[#111] overflow-x-auto'>
      <Navbar />
      <div className="h-screen flex items-center justify-center -mt-20">
        <div className="bg-[#eaeaea] p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border rounded-lg p-3 focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border rounded-lg p-3 focus:outline-none"
              required
            />
            <button
              type="submit"
              className={`
                inline-block
                px-6 py-3
                border
                text-white
                bg-[#111]
                font-semibold
                transition-all duration-300
                hover:bg-black hover:text-white
                hover:shadow-[0_0_15px_rgba(0,0,0,0.4)]
                select-none
                ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </div>
      </div>
    </section>
  );
}