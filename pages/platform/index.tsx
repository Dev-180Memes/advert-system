import Link from 'next/link';
import withAuth from '@/components/hoc/withAuth';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        <li>
          <Link href="/platform/user-management">
            <p>User Management</p>
          </Link>
        </li>
        <li>
          <Link href="/platform/campaign-management">
            <p>Campaign Management</p>
          </Link>
        </li>
        <li>
          <Link href="/platform/reports">
            <p>Reports</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withAuth(Dashboard);
