import { Outlet } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminDashboard;
