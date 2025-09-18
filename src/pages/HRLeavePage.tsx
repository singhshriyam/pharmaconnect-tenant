import React, { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";

import LeaveForm from "../components/hr/LeaveForm";
import LeaveList from "../components/hr/LeaveList";
import Sidebar from "../components/dashboard/Sidebar";

// Import types from centralized location
import { LeaveRequest, LeaveRequestFormData, HRPageProps } from "../components/common/types";

// Mock user data
const mockUser = {
  id: '1',
  email: 'user@medrepcrm.com',
  full_name: 'John Doe',
  role: 'admin', // Change to 'user' to test regular user view
  territory: 'Delhi North'
};

// In-memory storage for mock data (this will actually persist during the session)
let mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    leave_type: 'Casual Leave',
    start_date: '2024-09-20',
    end_date: '2024-09-22',
    total_days: 3,
    reason: 'Family function attendance',
    status: 'Pending',
    created_by: 'user@medrepcrm.com',
    created_date: '2024-09-15',
    territory: 'Delhi North'
  },
  {
    id: '2',
    leave_type: 'Sick Leave',
    start_date: '2024-09-18',
    end_date: '2024-09-19',
    total_days: 2,
    reason: 'Medical treatment',
    status: 'Approved',
    created_by: 'user@medrepcrm.com',
    approved_by: 'manager@medrepcrm.com',
    approved_date: '2024-09-16',
    manager_comments: 'Approved for medical reasons',
    created_date: '2024-09-14',
    territory: 'Delhi North'
  },
  {
    id: '3',
    leave_type: 'Earned Leave',
    start_date: '2024-09-25',
    end_date: '2024-09-27',
    total_days: 3,
    reason: 'Personal vacation',
    status: 'Rejected',
    created_by: 'user@medrepcrm.com',
    approved_by: 'manager@medrepcrm.com',
    approved_date: '2024-09-16',
    manager_comments: 'Peak business period, please reschedule',
    created_date: '2024-09-13',
    territory: 'Delhi North'
  }
];

// Mock API functions that actually modify the mock data
const LeaveRequestAPI = {
  list: async (sort?: string): Promise<LeaveRequest[]> => {
    console.log('Loading leave requests from mock storage:', mockLeaveRequests.length);
    // Return a copy to avoid reference issues
    return [...mockLeaveRequests];
  },

  create: async (data: LeaveRequestFormData): Promise<LeaveRequest> => {
    console.log('Creating leave request:', data);
    const newRequest: LeaveRequest = {
      ...data,
      id: Date.now().toString(),
      status: 'Pending',
      created_by: mockUser.email,
      created_date: new Date().toISOString().split('T')[0],
      territory: mockUser.territory
    };

    // Actually add to the mock storage
    mockLeaveRequests.unshift(newRequest); // Add to beginning
    console.log('Added leave request. Total requests:', mockLeaveRequests.length);

    return newRequest;
  },

  update: async (id: string, data: Partial<LeaveRequest>): Promise<LeaveRequest> => {
    console.log('Updating leave request:', id, data);

    // Find and update the request in mock storage
    const requestIndex = mockLeaveRequests.findIndex(req => req.id === id);
    if (requestIndex === -1) {
      throw new Error(`Leave request with id ${id} not found`);
    }

    // Update the request
    mockLeaveRequests[requestIndex] = {
      ...mockLeaveRequests[requestIndex],
      ...data
    };

    console.log('Updated leave request:', mockLeaveRequests[requestIndex]);
    return mockLeaveRequests[requestIndex];
  },

  filter: async (filters: any, sort?: string): Promise<LeaveRequest[]> => {
    const allRequests = await LeaveRequestAPI.list(sort);
    return allRequests.filter(request =>
      filters.created_by ? request.created_by === filters.created_by : true
    );
  }
};

const HRPage: React.FC<HRPageProps> = ({ onLogout, onNavigate }) => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [user] = useState(mockUser);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');

  // Use useCallback to memoize the loadData function
  const loadData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Managers see all leave requests in their territory, reps see their own
      const requestsData = user.role === 'admin'
        ? await LeaveRequestAPI.list("-start_date")
        : await LeaveRequestAPI.filter({ created_by: user.email }, "-start_date");

      setLeaveRequests(requestsData);
    } catch (error) {
      console.error("Failed to load leave requests:", error);
    }
    setIsLoading(false);
  }, [user.role, user.email]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = async (leaveData: LeaveRequestFormData): Promise<void> => {
    try {
      await LeaveRequestAPI.create(leaveData);
      setShowForm(false);
      await loadData();
    } catch (error) {
      console.error("Failed to save leave request:", error);
    }
  };

  const handleStatusUpdate = async (request: LeaveRequest, newStatus: string, comments: string): Promise<void> => {
    try {
      console.log('Updating leave request status:', { id: request.id, newStatus, comments });
      await LeaveRequestAPI.update(request.id, {
        status: newStatus as LeaveRequest['status'],
        manager_comments: comments,
        approved_by: user.email,
        approved_date: new Date().toISOString().split('T')[0]
      });
      await loadData();
    } catch (error) {
      console.error("Failed to update leave request status:", error);
    }
  };

  const getFilteredRequests = (status: string) => {
    return leaveRequests.filter(r => r.status.toLowerCase() === status.toLowerCase());
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        onLogout={onLogout}
        currentPage="hr"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">HR & Leave Management</h1>
                <p className="text-blue-600 mt-1">Manage leave requests and performance</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Apply for Leave
              </button>
            </div>

            {/* Leave Form */}
            {showForm && (
              <div className="mb-8 bg-white rounded-xl shadow-lg border p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  New Leave Request
                </h3>
                <LeaveForm
                  onSubmit={handleSubmit}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            )}

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                {['pending', 'approved', 'rejected'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors capitalize ${
                      activeTab === tab
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Leave List */}
            <LeaveList
              requests={getFilteredRequests(activeTab)}
              isLoading={isLoading}
              userRole={user?.role}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRPage;
