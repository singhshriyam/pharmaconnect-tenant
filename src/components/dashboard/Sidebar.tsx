import React from 'react';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  DollarSign,
  UserCheck,
  CalendarDays,
  User,
  ChevronDown,
  ChevronRight,
  Database
} from 'lucide-react';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface SidebarGroup {
  title: string;
  icon: React.ElementType;
  items: SidebarItem[];
  isExpanded?: boolean;
}

interface SidebarProps {
  onLogout?: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout, currentPage = 'dashboard', onNavigate }) => {
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set(['dashboard']));

  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupTitle)) {
        newSet.delete(groupTitle);
      } else {
        newSet.add(groupTitle);
      }
      return newSet;
    });
  };

  const navigationGroups: SidebarGroup[] = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      items: [
        {
          icon: LayoutDashboard,
          label: 'Dashboard',
          isActive: currentPage === 'dashboard',
          onClick: () => onNavigate?.('dashboard')
        }
      ]
    },
    {
      title: 'Visit Planning',
      icon: Calendar,
      items: [
        {
          icon: Calendar,
          label: 'Visit Planning',
          isActive: currentPage === 'visit-planning',
          onClick: () => onNavigate?.('visit-planning')
        }
      ]
    },
    {
      title: 'People',
      icon: Users,
      items: [
        {
          icon: Stethoscope,
          label: 'Doctor Database',
          isActive: currentPage === 'doctor-database',
          onClick: () => onNavigate?.('doctor-database')
        },
        {
          icon: Users,
          label: 'Employee',
          isActive: currentPage === 'employees',
          onClick: () => onNavigate?.('employees')
        }
      ]
    },
    {
      title: 'Calendar',
      icon: CalendarDays,
      items: [
        {
          icon: CalendarDays,
          label: 'Holiday',
          isActive: currentPage === 'holidays',
          onClick: () => onNavigate?.('holidays')
        },
        {
          icon: UserCheck,
          label: 'Leave',
          isActive: currentPage === 'hr-leave',
          onClick: () => onNavigate?.('hr-leave')
        }
      ]
    },
    {
      title: 'Expenses',
      icon: DollarSign,
      items: [
        {
          icon: DollarSign,
          label: 'Expenses',
          isActive: currentPage === 'expenses',
          onClick: () => onNavigate?.('expenses')
        }
      ]
    },
    {
      title: 'Master',
      icon: Database,
      items: [
        {
          icon: Database,
          label: 'Master Data',
          isActive: currentPage === 'master',
          onClick: () => onNavigate?.('master')
        }
      ]
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
      <div className="flex-1 py-6 overflow-y-auto">
        <div className="px-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            MAIN NAVIGATION
          </h3>
          <nav className="space-y-1">
            {navigationGroups.map((group, groupIndex) => {
              const GroupIcon = group.icon;
              const isExpanded = expandedGroups.has(group.title);
              const hasMultipleItems = group.items.length > 1;

              return (
                <div key={groupIndex}>
                  {hasMultipleItems ? (
                    <>
                      {/* Group Header (Collapsible) */}
                      <button
                        onClick={() => toggleGroup(group.title)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        <div className="flex items-center">
                          <GroupIcon className="w-5 h-5 mr-3" />
                          {group.title}
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>

                      {/* Group Items */}
                      {isExpanded && (
                        <div className="ml-6 mt-1 space-y-1">
                          {group.items.map((item, itemIndex) => {
                            const Icon = item.icon;
                            return (
                              <button
                                key={itemIndex}
                                onClick={item.onClick}
                                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  item.isActive
                                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                              >
                                <Icon className="w-4 h-4 mr-3" />
                                {item.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    /* Single Item Groups (Direct Links) */
                    group.items.map((item, itemIndex) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={itemIndex}
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
                    })
                  )}
                </div>
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
