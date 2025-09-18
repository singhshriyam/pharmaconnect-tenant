import React, { useState, useEffect, useCallback } from "react";
import { Plus, Download, Upload } from "lucide-react";

import DoctorList from "../components/doctors/DoctorList";
import DoctorForm from "../components/doctors/DoctorForm";
import Sidebar from "../components/dashboard/Sidebar";

// Import ALL types from centralized location - NO local interfaces
import { Doctor, DoctorFormData, DoctorDatabasePageProps } from "../components/common/types";

// In-memory storage for mock data
let mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Michael Johnson',
    specialty: 'Orthopedics',
    clinic_name: 'Joint & Spine Clinic',
    address: '123 Medical Center Dr, East District',
    territory: 'East',
    phone: '9876543210',
    email: 'mjohnson@jointspine.com',
    potential: 'Medium',
    notes: 'Specializes in sports medicine',
    location_lat: 28.6139,
    location_lng: 77.2090,
    created_date: '2024-01-15'
  },
  {
    id: '2',
    name: 'Dr. Sarah Wilson',
    specialty: 'General Practice',
    clinic_name: 'Community Health Center',
    address: '456 Wellness Ave, West District',
    territory: 'West',
    phone: '9876543211',
    email: 'swilson@community.com',
    potential: 'High',
    notes: 'Very receptive to new treatments',
    location_lat: 28.7041,
    location_lng: 77.1025,
    created_date: '2024-01-20'
  },
  {
    id: '3',
    name: 'Dr. Aisha Khan',
    specialty: 'Diabetes',
    clinic_name: 'Endocrine Associates',
    address: '789 Diabetes Care Rd, South District',
    territory: 'South',
    phone: '9876543212',
    email: 'akhan@endocrine.com',
    potential: 'Medium',
    notes: 'Focuses on Type 2 diabetes management',
    location_lat: 28.5355,
    location_lng: 77.3910,
    created_date: '2024-02-01'
  },
  {
    id: '4',
    name: 'Dr. Marcus Thorne',
    specialty: 'Neurology',
    clinic_name: 'MindWell Institute',
    address: '321 Brain Health St, Central District',
    territory: 'Central',
    phone: '9876543213',
    email: 'mthorne@mindwell.com',
    potential: 'High',
    notes: 'Leading neurologist in the region',
    location_lat: 28.6129,
    location_lng: 77.2295,
    created_date: '2024-02-10'
  },
  {
    id: '5',
    name: 'Dr. Elena Petrova',
    specialty: 'Cardiology',
    clinic_name: 'HeartCare Clinic',
    address: '654 Cardiac Ave, North District',
    territory: 'North',
    phone: '9876543214',
    email: 'epetrova@heartcare.com',
    potential: 'High',
    notes: 'Interventional cardiologist',
    location_lat: 28.7041,
    location_lng: 77.1025,
    created_date: '2024-02-15'
  }
];

// Mock API functions that actually modify data
const DoctorAPI = {
  list: async (sort?: string): Promise<Doctor[]> => {
    console.log('Loading doctors from mock storage:', mockDoctors.length);
    return [...mockDoctors];
  },

  create: async (data: DoctorFormData): Promise<Doctor> => {
    console.log('Creating doctor:', data);
    const newDoctor: Doctor = {
      ...data,
      id: Date.now().toString(),
      created_date: new Date().toISOString()
    };

    mockDoctors.unshift(newDoctor);
    console.log('Added doctor. Total doctors:', mockDoctors.length);
    return newDoctor;
  },

  update: async (id: string, data: DoctorFormData): Promise<Doctor> => {
    console.log('Updating doctor:', id, data);

    const doctorIndex = mockDoctors.findIndex(doc => doc.id === id);
    if (doctorIndex === -1) {
      throw new Error(`Doctor with id ${id} not found`);
    }

    mockDoctors[doctorIndex] = {
      ...data,
      id,
      created_date: mockDoctors[doctorIndex].created_date // Keep original created date
    };

    console.log('Updated doctor:', mockDoctors[doctorIndex]);
    return mockDoctors[doctorIndex];
  },

  delete: async (id: string): Promise<void> => {
    console.log('Deleting doctor:', id);

    const doctorIndex = mockDoctors.findIndex(doc => doc.id === id);
    if (doctorIndex === -1) {
      throw new Error(`Doctor with id ${id} not found`);
    }

    mockDoctors.splice(doctorIndex, 1);
    console.log('Deleted doctor. Remaining doctors:', mockDoctors.length);
  },

  bulkCreate: async (doctors: DoctorFormData[]): Promise<Doctor[]> => {
    console.log('Bulk creating doctors:', doctors);
    const newDoctors = doctors.map((doctor, index) => ({
      ...doctor,
      id: (Date.now() + index).toString(),
      created_date: new Date().toISOString()
    }));

    mockDoctors.unshift(...newDoctors);
    console.log('Bulk added doctors. Total doctors:', mockDoctors.length);
    return newDoctors;
  }
};

const exportToCsv = (filename: string, data: Doctor[]): void => {
  const headers = ['Name', 'Specialty', 'Clinic', 'Territory', 'Phone', 'Email', 'Potential', 'Address'];
  const csvContent = [
    headers.join(','),
    ...data.map((doctor: Doctor) => [
      doctor.name,
      doctor.specialty,
      doctor.clinic_name,
      doctor.territory,
      doctor.phone,
      doctor.email,
      doctor.potential,
      doctor.address
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

const DoctorDatabasePage: React.FC<DoctorDatabasePageProps> = ({ onLogout, onNavigate }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const loadDoctors = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const doctorsData = await DoctorAPI.list("-created_date");
      setDoctors(doctorsData);
    } catch (error) {
      console.error("Failed to load doctors:", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadDoctors();
  }, [loadDoctors]);

  const handleEdit = (doctor: Doctor): void => {
    setEditingDoctor(doctor);
    setShowForm(true);
  };

  const handleDelete = async (doctorId: string): Promise<void> => {
    try {
      console.log('Attempting to delete doctor:', doctorId);
      await DoctorAPI.delete(doctorId);
      await loadDoctors();
    } catch (error) {
      console.error("Failed to delete doctor:", error);
    }
  };

  const handleSubmit = async (doctorData: DoctorFormData): Promise<void> => {
    try {
      if (editingDoctor) {
        await DoctorAPI.update(editingDoctor.id, doctorData);
      } else {
        await DoctorAPI.create(doctorData);
      }
      setShowForm(false);
      setEditingDoctor(null);
      await loadDoctors();
    } catch (error) {
      console.error("Failed to save doctor:", error);
    }
  };

  const handleExport = (): void => {
    exportToCsv("doctors.csv", doctors);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("File upload:", file.name);
    alert("File upload functionality will be implemented with actual CSV parsing");

    event.target.value = '';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        onLogout={onLogout}
        currentPage="doctor-database"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Doctor Database</h1>
                <p className="text-blue-600 mt-1">Manage your client and doctor information</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => document.getElementById('import-doctors-input')?.click()}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </button>
                <input
                  type="file"
                  id="import-doctors-input"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
                <button
                  onClick={handleExport}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button
                  onClick={() => {
                    setEditingDoctor(null);
                    setShowForm(true);
                  }}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Doctor
                </button>
              </div>
            </div>

            {/* Doctor Form Modal */}
            {showForm && (
              <div className="mb-8 bg-white rounded-xl shadow-lg border p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {editingDoctor ? 'Edit Doctor Information' : 'Add New Doctor'}
                </h3>
                <DoctorForm
                  doctor={editingDoctor}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingDoctor(null);
                  }}
                />
              </div>
            )}

            {/* Doctor List */}
            <DoctorList
              doctors={doctors}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDatabasePage;
