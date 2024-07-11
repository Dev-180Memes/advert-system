import { useState, useEffect } from 'react';
import axios from 'axios';
import withAuth from '@/components/hoc/withAuth';
import { decodeJWT } from '@/utils/decodeToken';

const UserManagement = () => {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const { id } = decodeJWT(token);
        const { data } = await axios.get(`/api/admin/users/${id}`);

        if (data.user) {
          setClients(data.user);
        } else {
          console.error('Error getting clients:', data.message);
        }
      }
    }

    fetchClients();
  }, []);

  const addClient = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      alert('Name and email are required');
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      const { id } = decodeJWT(token);
      const { data } = await axios.post('/api/admin/users', {
        email,
        name,
        adminId: id
      });

      if (data.message) {
        alert(data.message);
      } else {
        console.error('Error adding client:', data.message);
      }
    }
  };

  const deleteClient = async (id: string) => {
    const { data } = await axios.delete(`/api/admin/users/${id}`);
    if (data.message) {
      alert(data.message);
    } else {
      console.error('Error deleting client:', data.message);
    }
  }

  return (
    <div>
      <h1>Client Management</h1>
      <div>
        <h2>Add Client</h2>
        <form onSubmit={addClient}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Add Client</button>
        </form>
      </div>
      <div>
        <h2>Client</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>
                  <button onClick={() => deleteClient(client._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withAuth(UserManagement);
