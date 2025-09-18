import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';

interface DashboardPageProps {
  onLogout?: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout, currentPage, onNavigate }) => {
  return (
    <Dashboard
      onLogout={onLogout}
      currentPage={currentPage}
      onNavigate={onNavigate}
    />
  );
};

export default DashboardPage;
