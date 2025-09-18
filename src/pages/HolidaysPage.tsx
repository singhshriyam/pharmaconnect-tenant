import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import { CalendarDays } from 'lucide-react';

interface HolidaysPageProps {
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

const HolidaysPage: React.FC<HolidaysPageProps> = ({ onLogout, onNavigate }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        onLogout={onLogout}
        currentPage="holidays"
        onNavigate={onNavigate}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-20">
              <CalendarDays className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Holidays</h1>
              <p className="text-gray-600">This page is under development</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidaysPage;
