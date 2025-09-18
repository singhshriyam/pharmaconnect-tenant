import React from 'react';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  DollarSign,
  UserCheck,
  CalendarDays,
  User
} from 'lucide-react';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface SidebarProps {
  onLogout?: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout, currentPage = 'admin-dashboard', onNavigate }) => {
  const navigationItems: SidebarItem[] = [
    {
      icon: LayoutDashboard,
      label: 'Admin Dashboard',
      isActive: currentPage === 'admin-dashboard',
      onClick: () => onNavigate?.('admin-dashboard')
    },
    {
      icon: Calendar,
      label: 'Visit Planning',
      isActive: currentPage === 'visit-planning',
      onClick: () => onNavigate?.('visit-planning')
    },
    {
      icon: Stethoscope,
      label: 'Doctor Database',
      isActive: currentPage === 'doctor-database',
      onClick: () => onNavigate?.('doctor-database')
    },
    {
      icon: Users,
      label: 'Employees',
      isActive: currentPage === 'employees',
      onClick: () => onNavigate?.('employees')
    },
    {
      icon: DollarSign,
      label: 'Expenses',
      isActive: currentPage === 'expenses',
      onClick: () => onNavigate?.('expenses')
    },
    {
      icon: UserCheck,
      label: 'HR & Leave',
      isActive: currentPage === 'hr-leave',
      onClick: () => onNavigate?.('hr-leave')
    },
    {
      icon: CalendarDays,
      label: 'Holidays',
      isActive: currentPage === 'holidays',
      onClick: () => onNavigate?.('holidays')
    }
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">MedRep CRM</h2>
            <p className="text-sm text-blue-600">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6">
        <div className="px-4 mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            MAIN NAVIGATION
          </h3>
          <nav className="space-y-1">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Smera Narayan</p>
            <p className="text-xs text-gray-500">admin</p>
          </div>
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">12</span>
          </div>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
