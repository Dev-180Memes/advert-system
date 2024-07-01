// pages/admin/dashboard.tsx

import Link from 'next/link';
import withAuth from '@/components/hoc/withAuth';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link href="/admin/user-management">
            <a>User Management</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/campaign-management">
            <a>Campaign Management</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/reports">
            <a>Reports</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withAuth(AdminDashboard);
