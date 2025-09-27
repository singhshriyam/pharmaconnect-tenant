import React, { useState, useEffect } from 'react';
import { X, User, Phone, Briefcase, FileText, CreditCard } from 'lucide-react';
import { Employee } from '../common/types';
import { PersonalInfoTab } from './PersonalInfoTab';
import { ContactInfoTab } from './ContactInfoTab';
import { WorkInfoTab } from './WorkInfoTab';
import { OtherInfoTab } from './OtherInfoTab';
import { AccountInfoTab } from './AccountInfoTab';

interface EmployeeFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee | null;
  onSuccess: () => void;
  title: string;
  submitButtonText: string;
}

const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  isOpen,
  onOpenChange,
  employee,
  onSuccess,
  title,
  submitButtonText
}) => {
  const [formData, setFormData] = useState<Partial<Employee>>({
    work_type: 'ONFIELD',
    gender: 'Male',
    status: 'active',
    da_ex: 200,
    da_out: 700,
    da_rhq: 0,
    da_transit: 0,
    da_other: 0,
    annual_income: 0
  });
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({
        work_type: 'ONFIELD',
        gender: 'Male',
        status: 'active',
        da_ex: 200,
        da_out: 700,
        da_rhq: 0,
        da_transit: 0,
        da_other: 0,
        annual_income: 0
      });
    }
  }, [employee]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(employee ? 'Updating employee:' : 'Adding employee:', formData);
    onSuccess();
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'contact', label: 'Contact Information', icon: Phone },
    { id: 'work', label: 'Work Information', icon: Briefcase },
    { id: 'other', label: 'Other Information', icon: FileText },
    { id: 'account', label: 'Account Information', icon: CreditCard }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoTab formData={formData} onInputChange={handleInputChange} />;
      case 'contact':
        return <ContactInfoTab formData={formData} onInputChange={handleInputChange} />;
      case 'work':
        return <WorkInfoTab formData={formData} onInputChange={handleInputChange} />;
      case 'other':
        return <OtherInfoTab formData={formData} onInputChange={handleInputChange} />;
      case 'account':
        return <AccountInfoTab formData={formData} onInputChange={handleInputChange} />;
      default:
        return <PersonalInfoTab formData={formData} onInputChange={handleInputChange} />;
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
              <form id="employee-form" onSubmit={handleSubmit} className="p-6">
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
                form="employee-form"
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

export default EmployeeFormModal;
