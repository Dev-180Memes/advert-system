import Link from 'next/link';
import withAuth from '@/components/hoc/withAuth';
import Navbar from '@/components/Navbar';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div
        className='container mx-auto p-4 mt-40 md:mt-10'
      >
        <h1
          className='text-2xl font-bold mb-4 text-center text-gray-800'
        >Dashboard</h1>
        <ul
          className='grid grid-cols-1 gap-4 md:grid-cols-3'
        >
          <li
            className='bg-white p-4 rounded-lg shadow-md'
          >
            <Link 
              className='text-blue-500 hover:underline cursor-pointer text-center block text-lg font-semibold mb-2'
              href="/platform/user-management">
              <p
                className='text-center block text-lg font-semibold mb-2'
              >User Management</p>
            </Link>
          </li>
          <li
            className='bg-white p-4 rounded-lg shadow-md'
          >
            <Link
              className='text-blue-500 hover:underline cursor-pointer text-center block text-lg font-semibold mb-2' 
              href="/platform/campaign-management">
              <p
                className='text-center block text-lg font-semibold mb-2'
              >Campaign Management</p>
            </Link>
          </li>
          <li
            className='bg-white p-4 rounded-lg shadow-md'
          >
            <Link 
              className='text-blue-500 hover:underline cursor-pointer text-center block text-lg font-semibold mb-2'
              href="/platform/reports">
              <p
                className='text-center block text-lg font-semibold mb-2'
              >Reports</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default withAuth(Dashboard);
