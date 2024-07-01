import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/admin/login', { username, password });
      if (response.status === 200) {
        localStorage.setItem('adminToken', response.data.token);
        router.push('/admin/dashboard');
      }
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
