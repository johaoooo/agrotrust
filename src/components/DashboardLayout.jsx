import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Sidebar - RESTE VISIBLE EN PERMANENCE */}
      <DashboardSidebar />
      
      {/* Contenu dynamique - change selon la route */}
      <div className="flex-1 overflow-x-auto">
        <Outlet />
      </div>
    </div>
  );
}
