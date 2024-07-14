import React, { useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/admin/signup', { username, password, email });
      if (response.status === 201) {
        router.push('/auth/login');
      }
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <>
      <Navbar />
      <div
        className='container mx-auto px-4 flex flex-col items-center justify-center h-full mt-20'
      >
        <h1
          className='text-4xl font-bold text-center text-[#2d2323]'
        >Signup</h1>
        {error && <p
          className='text-red-500'
        >{error}</p>}
        <form 
          onSubmit={handleSignup}
          className='mt-4'
        >
          <div
            className='mb-4'
          >
            <label 
              className='block text-[#2d2323] text-xl font-bold'
              htmlFor="username"
            >Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='border border-gray-300 rounded-md p-2'
            />
          </div>
          <div
            className='mb-4'
          >
            <label
              className='block text-[#2d2323] text-xl font-bold' 
              htmlFor="email"
            >Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='border border-gray-300 rounded-md p-2'
            />
          </div>
          <div>
            <label 
              className='block text-[#2d2323] text-xl font-bold'
              htmlFor="password"
            >Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='border border-gray-300 rounded-md p-2'
            />
          </div>
          <div
            className='mb-4'
          >
            Already have an account? <Link
              href="/auth/login"
              className='text-[#2d2323] hover:underline'
            >Login</Link>
          </div>
          <button 
            className='bg-blue-700 text-white px-4 py-2 rounded-full transition-all hover:-rotate-3'
            type="submit"
          >Signup</button>
        </form>
      </div>
    </>
  )
}

export default Signup
