import React, { useState, useEffect } from 'react';
import { DollarSign, Stethoscope, Users, Calendar, TrendingUp, Activity } from 'lucide-react';
import Sidebar from './Sidebar';

interface DashboardStats {
  employees: number;
  doctors: number;
  totalExpenses: number;
  visits: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  isLoading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, isLoading }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          {isLoading ? (
            <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-gray-50 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

interface DashboardProps {
  onLogout?: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, currentPage, onNavigate }) => {
  const [stats, setStats] = useState<DashboardStats>({
    employees: 0,
    doctors: 0,
    totalExpenses: 0,
    visits: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data - replace with actual API calls
      setStats({
        employees: 45,
        doctors: 128,
        totalExpenses: 285000,
        visits: 324,
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  const statCards = [
    {
      title: 'Total Employees',
      value: stats.employees,
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: 'Total Doctors',
      value: stats.doctors,
      icon: Stethoscope,
      color: 'text-green-500'
    },
    {
      title: 'Total Expenses',
      value: `₹${(stats.totalExpenses / 1000).toFixed(1)}k`,
      icon: DollarSign,
      color: 'text-orange-500'
    },
    {
      title: 'Monthly Visits',
      value: stats.visits,
      icon: Calendar,
      color: 'text-purple-500'
    },
  ];

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
        <div className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-blue-600 mt-1">Overall management summary and performance metrics.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map(card => (
                <StatCard key={card.title} {...card} isLoading={isLoading} />
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attendance Chart Placeholder */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Attendance Overview</h3>
                  <Activity className="w-5 h-5 text-gray-500" />
                </div>
                {isLoading ? (
                  <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Attendance chart will be implemented here</p>
                      <p className="text-sm text-gray-500 mt-2">Employee attendance tracking and analytics</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Visit Trends Chart Placeholder */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Visit Trends</h3>
                  <Calendar className="w-5 h-5 text-gray-500" />
                </div>
                {isLoading ? (
                  <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Stethoscope className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Visit trends chart will be implemented here</p>
                      <p className="text-sm text-gray-500 mt-2">Doctor visit analytics and patterns</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Users className="w-6 h-6 text-blue-500 mb-2" />
                  <p className="font-medium text-gray-900">Manage Employees</p>
                  <p className="text-sm text-gray-600">Add, edit, or view employee details</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Stethoscope className="w-6 h-6 text-green-500 mb-2" />
                  <p className="font-medium text-gray-900">Doctor Database</p>
                  <p className="text-sm text-gray-600">Manage doctor information and contacts</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <DollarSign className="w-6 h-6 text-orange-500 mb-2" />
                  <p className="font-medium text-gray-900">Expense Reports</p>
                  <p className="text-sm text-gray-600">Review and approve expense claims</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
