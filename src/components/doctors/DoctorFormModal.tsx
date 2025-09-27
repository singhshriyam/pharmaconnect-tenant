import React, { useState, useEffect } from 'react';
import { X, User, Phone, Briefcase } from 'lucide-react';
import { Doctor, DoctorFormData } from '../common/types';
import { DoctorBasicInfoTab } from './DoctorBasicInfoTab';
import { DoctorContactInfoTab } from './DoctorContactInfoTab';
import { DoctorProfessionalInfoTab } from './DoctorProfessionalInfoTab';

interface DoctorFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  doctor?: Doctor | null;
  onSubmit: (data: DoctorFormData) => void;
  title: string;
  submitButtonText: string;
}

const DoctorFormModal: React.FC<DoctorFormModalProps> = ({
  isOpen,
  onOpenChange,
  doctor,
  onSubmit,
  title,
  submitButtonText
}) => {
  const [formData, setFormData] = useState<DoctorFormData>({
    name: '',
    specialty: '',
    clinic_name: '',
    address: '',
    territory: '',
    phone: '',
    email: '',
    potential: 'Medium',
    notes: '',
    location_lat: 0,
    location_lng: 0,
    // Additional fields from screenshot
    registration_number: '',
    doctor_code: '',
    city: '',
    hospital_name: '',
    employee_name: '',
    immediate_senior: '',
    contact_no: '',
    qualification: '',
    division: '',
    category: '',
    zone: '',
    gender: '',
    date_of_birth: ''
  });
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name,
        specialty: doctor.specialty,
        clinic_name: doctor.clinic_name,
        address: doctor.address,
        territory: doctor.territory,
        phone: doctor.phone,
        email: doctor.email,
        potential: doctor.potential,
        notes: doctor.notes || '',
        location_lat: doctor.location_lat || 0,
        location_lng: doctor.location_lng || 0,
        registration_number: (doctor as any).registration_number || '',
        doctor_code: (doctor as any).doctor_code || '',
        city: (doctor as any).city || '',
        hospital_name: (doctor as any).hospital_name || '',
        employee_name: (doctor as any).employee_name || '',
        immediate_senior: (doctor as any).immediate_senior || '',
        contact_no: (doctor as any).contact_no || doctor.phone || '',
        qualification: (doctor as any).qualification || '',
        division: (doctor as any).division || '',
        category: (doctor as any).category || '',
        zone: (doctor as any).zone || '',
        gender: (doctor as any).gender || '',
        date_of_birth: (doctor as any).date_of_birth || ''
      });
    } else {
      setFormData({
        name: '',
        specialty: '',
        clinic_name: '',
        address: '',
        territory: '',
        phone: '',
        email: '',
        potential: 'Medium',
        notes: '',
        location_lat: 0,
        location_lng: 0,
        registration_number: '',
        doctor_code: '',
        city: '',
        hospital_name: '',
        employee_name: '',
        immediate_senior: '',
        contact_no: '',
        qualification: '',
        division: '',
        category: '',
        zone: '',
        gender: '',
        date_of_birth: ''
      });
    }
  }, [doctor]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'basic', label: 'Basic Information', icon: User },
    { id: 'contact', label: 'Contact Information', icon: Phone },
    { id: 'professional', label: 'Professional Info', icon: Briefcase }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <DoctorBasicInfoTab formData={formData} onInputChange={handleInputChange} />;
      case 'contact':
        return <DoctorContactInfoTab formData={formData} onInputChange={handleInputChange} />;
      case 'professional':
        return <DoctorProfessionalInfoTab formData={formData} onInputChange={handleInputChange} />;
      default:
        return <DoctorBasicInfoTab formData={formData} onInputChange={handleInputChange} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-1 min-h-0">
          <div className="w-80 bg-gray-50 border-r border-gray-200 flex-shrink-0">
            <div className="p-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors mb-2 ${
                      activeTab === tab.id
                        ? 'bg-teal-500 text-white'
                        : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto">
              <form id="doctor-form" onSubmit={handleSubmit} className="p-6">
                {renderTabContent()}
              </form>
            </div>
            <div className="flex justify-end gap-4 p-6 border-t border-gray-200 flex-shrink-0">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="doctor-form"
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                {submitButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorFormModal;
