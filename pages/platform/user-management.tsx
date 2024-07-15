import { useState, useEffect } from 'react';
import axios from 'axios';
import withAuth from '@/components/hoc/withAuth';
import { decodeJWT } from '@/utils/decodeToken';
import Navbar from '@/components/Navbar';

const UserManagement = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = decodeJWT(token);
        // console.log(decoded)
        const { data } = await axios.get(`/api/admin/users/${decoded.id}`);

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
        setClients([...clients, data.user]);
        alert(data.message);
        setName('');
        setEmail('');
      } else {
        console.error('Error adding client:', data.message);
      }
    }
  };

  const deleteClient = async (id: string) => {
    const { data } = await axios.delete(`/api/admin/users/${id}`);
    if (data.message) {
      setClients(clients.filter(client => client._id !== id));
      alert(data.message);
    } else {
      console.error('Error deleting client:', data.message);
    }
  }

  return (
    <>
      <Navbar />
      <div
        className='container mx-auto p-4 mt-40 md:mt-10'
      >
        <h1
          className='text-2xl font-bold mb-4 text-center text-gray-800'
        >Client Management</h1>
        <div
          className='mb-8'
        >
          <h2
            className='text-lg font-semibold mb-2'
          >Add Client</h2>
          <form
            className='flex flex-col' 
            onSubmit={addClient}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mb-2 mt-2 p-2 rounded-lg border border-gray-300'
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mb-2 p-2 rounded-lg border border-gray-300'
            />
            <button 
              className='bg-blue-500 text-white p-2 rounded-lg'
              type="submit">Add Client</button>
          </form>
        </div>
        <div
          className='mb-8'
        >
          <h2
            className='text-lg font-semibold mb-2'
          >My Clients</h2>
          <table
            className='w-full border border-gray-300'
          >
            <thead
              className='bg-gray-200 text-gray-800'
            >
              <tr
                className='border-b border-gray-300'
              >
                <th
                  className='p-2'
                >Name</th>
                <th
                  className='p-2'
                >Email</th>
                <th
                  className='p-2'
                >Actions</th>
              </tr>
            </thead>
            <tbody
              className='text-center'
            >
              {clients.map((client:any) => (
                <tr 
                  className='border-b border-gray-300'
                  key={client._id}>
                  <td
                    className='p-2'
                  >{client.name}</td>
                  <td
                    className='p-2'
                  >{client.email}</td>
                  <td
                    className='p-2'
                  >
                    <button 
                      className='bg-red-500 text-white p-2 rounded-lg'
                      onClick={() => deleteClient(client._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default withAuth(UserManagement);
