import React from 'react';
import Master from '../components/master/Master';
import Sidebar from '../components/dashboard/Sidebar';

interface MasterPageProps {
  onLogout?: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const MasterPage: React.FC<MasterPageProps> = ({ onLogout, currentPage, onNavigate }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        onLogout={onLogout}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Master />
      </div>
    </div>
  );
};

export default MasterPage;
