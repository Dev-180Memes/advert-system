import { useState, useEffect } from 'react';
import axios from 'axios';
import withAuth from '@/components/hoc/withAuth';

type User = {
  _id: string;
  username: string;
};

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/admin/users/add', { username, password });
      setMessage(response.data.message);
      setUsername('');
      setPassword('');
      setError('');
      setUsers((prevUsers) => [...prevUsers, { _id: response.data._id, username }]);
    } catch (error) {
      setError('Error adding user');
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await axios.delete('/api/admin/users/delete', { data: { id } });
      setMessage(response.data.message);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      setError('Error deleting user');
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleAddUser}>
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
        <button type="submit">Add User</button>
      </form>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default withAuth(UserManagement);
