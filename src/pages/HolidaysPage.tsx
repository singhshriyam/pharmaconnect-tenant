import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Upload } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import HolidayList from '../components/holidays/HolidayList';
import HolidayFormModal from '../components/holidays/HolidayFormModal';
import TourPlanList from '../components/holidays/TourPlanList';
import AddTourPlanModal from '../components/holidays/AddTourPlanModal';
import ApproveTourPlanModal from '../components/holidays/ApproveTourPlanModal';
import ViewTourPlanModal from '../components/holidays/ViewTourPlanModal';

import { Holiday, HolidayFormData, TourPlan, TourPlanFormData, HolidaysPageProps } from '../components/common/types';

// Mock Data Storage
let mockHolidays: Holiday[] = [
  { id: '1', zone: 'Bihar', date: '2025-01-01', occasion: 'NEW YEAR', type: 'public', created_date: '2024-01-01' },
  { id: '2', zone: 'Jharkhand', date: '2025-01-01', occasion: 'NEW YEAR', type: 'public', created_date: '2024-01-01' },
  { id: '3', zone: 'Gujarat', date: '2025-01-01', occasion: 'NEW YEAR', type: 'public', created_date: '2024-01-01' },
  { id: '4', zone: 'Delhi', date: '2025-01-01', occasion: 'NEW YEAR', type: 'public', created_date: '2024-01-01' },
  { id: '5', zone: 'Bihar', date: '2025-01-14', occasion: 'MAKARSAKRANTI', type: 'public', created_date: '2024-01-01' },
  { id: '6', zone: 'Jharkhand', date: '2025-01-14', occasion: 'MAKARSAKRANTI', type: 'public', created_date: '2024-01-01' },
  { id: '7', zone: 'Gujarat', date: '2025-01-14', occasion: 'MAKARSAKRANTI', type: 'public', created_date: '2024-01-01' },
  { id: '8', zone: 'Delhi', date: '2025-01-14', occasion: 'MAKARSAKRANTI', type: 'public', created_date: '2024-01-01' },
  { id: '9', zone: 'Bihar', date: '2025-01-26', occasion: 'REPUBLIC DAY', type: 'public', created_date: '2024-01-01' },
  { id: '10', zone: 'Jharkhand', date: '2025-01-26', occasion: 'REPUBLIC DAY', type: 'public', created_date: '2024-01-01' },
  { id: '11', zone: 'Gujarat', date: '2025-01-26', occasion: 'REPUBLIC DAY', type: 'public', created_date: '2024-01-01' },
  { id: '12', zone: 'Delhi', date: '2025-01-26', occasion: 'REPUBLIC DAY', type: 'public', created_date: '2024-01-01' },
];

let mockTourPlans: TourPlan[] = [
  {
    id: '1',
    employee_name: 'Anup Kumar',
    designation: 'MR',
    month: 'August',
    year: '2025',
    status: 'Approved',
    approved_by: 'MANISH MISHRA',
    planned_dates: ['2025-08-01', '2025-08-04', '2025-08-05'],
    created_date: '2024-08-01',
    whole_month_tour_plan: 'Yes'
  },
  {
    id: '2',
    employee_name: 'ATUL BHARDWAGI',
    designation: 'MR',
    month: 'August',
    year: '2025',
    status: 'Approved',
    approved_by: 'GOPAL PRASAD',
    planned_dates: ['2025-08-02', '2025-08-03'],
    created_date: '2024-08-01',
    whole_month_tour_plan: 'Yes'
  },
  {
    id: '3',
    employee_name: 'ACHALENDRA KUMAR SINHA',
    designation: 'ZSM',
    month: 'August',
    year: '2025',
    status: 'Pending',
    planned_dates: ['2025-08-22', '2025-08-23', '2025-08-28'],
    created_date: '2024-08-01',
    whole_month_tour_plan: 'Yes'
  }
];

// Mock API
const HolidayAPI = {
  list: async (type?: string): Promise<Holiday[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (type) {
      return mockHolidays.filter(h => h.type === type);
    }
    return [...mockHolidays];
  },

  create: async (data: HolidayFormData): Promise<Holiday> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newHoliday: Holiday = {
      ...data,
      id: Date.now().toString(),
      created_date: new Date().toISOString().split('T')[0]
    };
    mockHolidays.unshift(newHoliday);
    return newHoliday;
  },

  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockHolidays.findIndex(h => h.id === id);
    if (index !== -1) {
      mockHolidays.splice(index, 1);
    }
  }
};

const TourPlanAPI = {
  list: async (): Promise<TourPlan[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockTourPlans];
  },

  create: async (data: TourPlanFormData): Promise<TourPlan> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newTourPlan: TourPlan = {
      ...data,
      id: Date.now().toString(),
      status: 'Pending',
      created_date: new Date().toISOString().split('T')[0]
    };
    mockTourPlans.unshift(newTourPlan);
    return newTourPlan;
  },

  updateStatus: async (id: string, status: 'Pending' | 'Approved' | 'Rejected', approvedBy?: string): Promise<TourPlan> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockTourPlans.findIndex(tp => tp.id === id);
    if (index !== -1) {
      mockTourPlans[index] = {
        ...mockTourPlans[index],
        status,
        approved_by: approvedBy,
        approved_date: new Date().toISOString().split('T')[0]
      };
      return mockTourPlans[index];
    }
    throw new Error('Tour plan not found');
  }
};

const HolidaysPage: React.FC<HolidaysPageProps> = ({ onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'holiday' | 'work' | 'restricted'>('holiday');
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [tourPlans, setTourPlans] = useState<TourPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddHolidayModalOpen, setIsAddHolidayModalOpen] = useState(false);
  const [isAddTourPlanModalOpen, setIsAddTourPlanModalOpen] = useState(false);
  const [isApproveTourPlanModalOpen, setIsApproveTourPlanModalOpen] = useState(false);
  const [viewingTourPlan, setViewingTourPlan] = useState<TourPlan | null>(null);

  const loadData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (activeTab === 'work') {
        const plans = await TourPlanAPI.list();
        setTourPlans(plans);
      } else {
        const type = activeTab === 'holiday' ? 'public' : 'restricted';
        const holidayData = await HolidayAPI.list(type);
        setHolidays(holidayData);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      alert('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmitHoliday = async (holidayData: HolidayFormData): Promise<void> => {
    try {
      await HolidayAPI.create(holidayData);
      setIsAddHolidayModalOpen(false);
      await loadData();
    } catch (error) {
      console.error('Failed to save holiday:', error);
      alert('Failed to save holiday. Please try again.');
    }
  };

  const handleSubmitTourPlan = async (tourPlanData: TourPlanFormData): Promise<void> => {
    try {
      await TourPlanAPI.create(tourPlanData);
      setIsAddTourPlanModalOpen(false);
      await loadData();
      alert('Tour plan created successfully!');
    } catch (error) {
      console.error('Failed to save tour plan:', error);
      alert('Failed to save tour plan. Please try again.');
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await HolidayAPI.delete(id);
      await loadData();
    } catch (error) {
      console.error('Failed to delete holiday:', error);
      alert('Failed to delete holiday. Please try again.');
    }
  };

  const handleApproveTourPlan = async (id: string): Promise<void> => {
    try {
      await TourPlanAPI.updateStatus(id, 'Approved', 'Admin User');
      await loadData();
      alert('Tour plan approved successfully!');
    } catch (error) {
      console.error('Failed to approve tour plan:', error);
      alert('Failed to approve tour plan. Please try again.');
    }
  };

  const handleRejectTourPlan = async (id: string): Promise<void> => {
    try {
      await TourPlanAPI.updateStatus(id, 'Rejected', 'Admin User');
      await loadData();
      alert('Tour plan rejected.');
    } catch (error) {
      console.error('Failed to reject tour plan:', error);
      alert('Failed to reject tour plan. Please try again.');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid CSV or Excel file');
      event.target.value = '';
      return;
    }

    alert('File upload functionality will be implemented with actual CSV parsing');
    event.target.value = '';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        onLogout={onLogout}
        currentPage="holidays"
        onNavigate={onNavigate}
      />

      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Holiday & Work Calendar</h1>
                <p className="text-blue-600 mt-1">Manage holidays and tour plans</p>
              </div>
              {activeTab !== 'work' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => document.getElementById('import-holidays-input')?.click()}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </button>
                  <input
                    type="file"
                    id="import-holidays-input"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".csv,.xlsx,.xls"
                  />
                  <button
                    onClick={() => setIsAddHolidayModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('holiday')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'holiday'
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Holiday Calendar
                </button>
                <button
                  onClick={() => setActiveTab('work')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'work'
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Work Calendar
                </button>
                <button
                  onClick={() => setActiveTab('restricted')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'restricted'
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Restricted Holiday
                </button>
              </div>
            </div>

            {/* Content Based on Active Tab */}
            {activeTab === 'work' ? (
              <TourPlanList
                tourPlans={tourPlans}
                isLoading={isLoading}
                onViewApproval={() => setIsApproveTourPlanModalOpen(true)}
                onAddTourPlan={() => setIsAddTourPlanModalOpen(true)}
              />
            ) : (
              <HolidayList
                holidays={holidays}
                isLoading={isLoading}
                onDelete={handleDelete}
              />
            )}

            {/* Modals */}
            <HolidayFormModal
              isOpen={isAddHolidayModalOpen}
              onOpenChange={setIsAddHolidayModalOpen}
              onSubmit={handleSubmitHoliday}
              title="Add Holiday"
              submitButtonText="Add Holiday"
              type={activeTab === 'holiday' ? 'public' : 'restricted'}
            />

            <AddTourPlanModal
              isOpen={isAddTourPlanModalOpen}
              onOpenChange={setIsAddTourPlanModalOpen}
              onSubmit={handleSubmitTourPlan}
            />

            <ApproveTourPlanModal
              isOpen={isApproveTourPlanModalOpen}
              onOpenChange={setIsApproveTourPlanModalOpen}
              tourPlans={tourPlans}
              onView={(plan) => {
                setViewingTourPlan(plan);
                setIsApproveTourPlanModalOpen(false);
              }}
              onApprove={handleApproveTourPlan}
              onReject={handleRejectTourPlan}
            />

            {viewingTourPlan && (
              <ViewTourPlanModal
                isOpen={true}
                onOpenChange={(open) => {
                  if (!open) {
                    setViewingTourPlan(null);
                    setIsApproveTourPlanModalOpen(true);
                  }
                }}
                tourPlan={viewingTourPlan}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidaysPage;
