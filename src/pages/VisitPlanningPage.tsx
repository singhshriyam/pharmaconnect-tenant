import React, { useState, useEffect, useCallback } from "react";
import { Plus, Download } from "lucide-react";

import VisitForm from "../components/visitPlanning/VisitForm";
import CalendarView from "../components/visitPlanning/CalendarView";
import ListView from "../components/visitPlanning/ListView";
import RouteView from "../components/visitPlanning/RouteView";
import Sidebar from "../components/dashboard/Sidebar";

// Import shared types
import { Visit, Doctor, VisitFormData, VisitPlanningPageProps } from "../components/common/types";

// In-memory storage for mock data
let mockVisits: Visit[] = [
  {
    id: '1',
    doctor_id: '1',
    doctor_name: 'Dr. Amit Patel',
    visit_date: new Date().toISOString().split('T')[0],
    visit_time: '09:00',
    visit_type: 'Scheduled',
    status: 'Planned',
    products_promoted: ['Diabetes Treatment B'],
    notes: 'Regular checkup',
    next_visit_date: ''
  },
  {
    id: '2',
    doctor_id: '2',
    doctor_name: 'Dr. Priya Sharma',
    visit_date: new Date().toISOString().split('T')[0],
    visit_time: '11:30',
    visit_type: 'Follow-up',
    status: 'Planned',
    products_promoted: ['Cardiology Medication A'],
    notes: 'Follow-up visit',
    next_visit_date: ''
  },
  {
    id: '3',
    doctor_id: '3',
    doctor_name: 'Dr. Rajesh Kumar',
    visit_date: new Date().toISOString().split('T')[0],
    visit_time: '14:00',
    visit_type: 'Emergency',
    status: 'Planned',
    products_promoted: ['Pain Relief E'],
    notes: 'Urgent consultation',
    next_visit_date: ''
  }
];

let mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Amit Patel',
    specialty: 'Endocrinology',
    clinic_name: 'Diabetes Care Clinic',
    address: '123 Medical St',
    territory: 'Gujarat West',
    phone: '7654321098',
    email: 'amit@diabetescare.com',
    potential: 'High',
    notes: 'Key endocrinologist in the region'
  },
  {
    id: '2',
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiology',
    clinic_name: 'City Hospital',
    address: '456 Heart Ave',
    territory: 'Delhi North',
    phone: '8765432109',
    email: 'priya@cityhospital.com',
    potential: 'Medium',
    notes: 'Interested in cardiology products'
  },
  {
    id: '3',
    name: 'Dr. Rajesh Kumar',
    specialty: 'Internal Medicine',
    clinic_name: 'Heart Care Center',
    address: '789 Wellness Rd',
    territory: 'Mumbai Central',
    phone: '9876543210',
    email: 'rajesh@heartcare.com',
    potential: 'High',
    notes: 'High volume practice'
  },
  {
    id: '4',
    name: 'Dr. Aisha Khan',
    specialty: 'Pediatrics',
    clinic_name: 'Children Hospital',
    address: '321 Kids St',
    territory: 'Bangalore South',
    phone: '9876543211',
    email: 'aisha@childrenhospital.com',
    potential: 'Medium',
    notes: 'Pediatric specialist'
  },
  {
    id: '5',
    name: 'Dr. Vikram Singh',
    specialty: 'Orthopedics',
    clinic_name: 'Bone & Joint Clinic',
    address: '654 Ortho Lane',
    territory: 'Chennai East',
    phone: '9876543212',
    email: 'vikram@boneandjoint.com',
    potential: 'Low',
    notes: 'Orthopedic surgery focus'
  }
];

// Mock API functions that actually modify data
const VisitAPI = {
  list: async (): Promise<Visit[]> => {
    console.log('Loading visits from mock storage:', mockVisits.length);
    return [...mockVisits];
  },

  create: async (data: VisitFormData): Promise<Visit> => {
    console.log('Creating visit:', data);
    const newVisit: Visit = {
      ...data,
      id: Date.now().toString()
    };

    mockVisits.unshift(newVisit);
    console.log('Added visit. Total visits:', mockVisits.length);
    return newVisit;
  },

  update: async (id: string, data: VisitFormData): Promise<Visit> => {
    console.log('Updating visit:', id, data);

    const visitIndex = mockVisits.findIndex(visit => visit.id === id);
    if (visitIndex === -1) {
      throw new Error(`Visit with id ${id} not found`);
    }

    mockVisits[visitIndex] = {
      ...data,
      id
    };

    console.log('Updated visit:', mockVisits[visitIndex]);
    return mockVisits[visitIndex];
  }
};

// Mock Doctor API
const DoctorAPI = {
  list: async (): Promise<Doctor[]> => {
    return [...mockDoctors];
  }
};

const exportToCsv = (filename: string, data: Visit[]): void => {
  const headers = ['Doctor', 'Date', 'Time', 'Type', 'Status', 'Products', 'Notes'];
  const csvContent = [
    headers.join(','),
    ...data.map((visit: Visit) => [
      visit.doctor_name,
      visit.visit_date,
      visit.visit_time,
      visit.visit_type,
      visit.status,
      visit.products_promoted?.join('; ') || '',
      visit.notes
    ].map(field => `"${field}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

const VisitPlanningPage: React.FC<VisitPlanningPageProps> = ({ onLogout, onNavigate }) => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingVisit, setEditingVisit] = useState<Visit | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("calendar");

  const loadData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const [visitsData, doctorsData] = await Promise.all([
        VisitAPI.list(),
        DoctorAPI.list()
      ]);
      setVisits(visitsData);
      setDoctors(doctorsData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = async (visitData: VisitFormData): Promise<void> => {
    try {
      if (editingVisit) {
        await VisitAPI.update(editingVisit.id, visitData);
      } else {
        await VisitAPI.create(visitData);
      }
      setShowForm(false);
      setEditingVisit(null);
      await loadData();
    } catch (error) {
      console.error("Error saving visit:", error);
    }
  };

  const handleEdit = (visit: Visit): void => {
    setEditingVisit(visit);
    setShowForm(true);
  };

  const handleExport = (): void => {
    exportToCsv("visits.csv", visits);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        onLogout={onLogout}
        currentPage="visit-planning"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Visit Planning</h1>
                <p className="text-blue-600 mt-1">Plan, schedule and optimize your doctor visits</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleExport}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Plan New Visit
                </button>
              </div>
            </div>

            {/* Visit Form Modal */}
            {showForm && (
              <div className="mb-8 bg-white rounded-xl shadow-lg border p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {editingVisit ? 'Edit Visit' : 'Plan New Visit'}
                </h3>
                <VisitForm
                  visit={editingVisit}
                  doctors={doctors}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingVisit(null);
                  }}
                />
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab("calendar")}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "calendar"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Calendar View
                </button>
                <button
                  onClick={() => setActiveTab("list")}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "list"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  List View
                </button>
                <button
                  onClick={() => setActiveTab("routes")}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "routes"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Route Optimizer
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "calendar" && (
              <CalendarView
                visits={visits}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                onEditVisit={handleEdit}
              />
            )}

            {activeTab === "list" && (
              <ListView
                visits={visits}
                onEditVisit={handleEdit}
                isLoading={isLoading}
              />
            )}

            {activeTab === "routes" && (
              <RouteView
                visits={visits}
                selectedDate={selectedDate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitPlanningPage;
