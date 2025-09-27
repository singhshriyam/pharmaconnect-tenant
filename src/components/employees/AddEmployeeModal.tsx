import React, { useState } from 'react';
import { X, User, Phone, Briefcase, FileText, CreditCard, Upload } from 'lucide-react';
import { AddEmployeeModalProps, Employee } from '../common/types';

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onOpenChange,
  onSuccess
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
  const [profileImage, setProfileImage] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding employee:', formData);
    if (onSuccess) {
      onSuccess();
    }
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'contact', label: 'Contact Information', icon: Phone },
    { id: 'work', label: 'Work Information', icon: Briefcase },
    { id: 'other', label: 'Other Information', icon: FileText },
    { id: 'account', label: 'Account Information', icon: CreditCard }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <h2 className="text-2xl font-semibold text-gray-900">Add Employee</h2>
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
              <form id="add-employee-form" onSubmit={handleSubmit} className="p-6">
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Basic Information
                    </h3>
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Profile Image
                        </label>
                        <div className="flex flex-col items-center">
                          <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                            {profileImage ? (
                              <img
                                src={URL.createObjectURL(profileImage)}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="text-gray-400 text-center">
                                <Upload className="w-8 h-8 mx-auto mb-2" />
                                <span className="text-sm">No image</span>
                              </div>
                            )}
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="profile-image"
                          />
                          <label
                            htmlFor="profile-image"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-blue-600"
                          >
                            Select Image
                          </label>
                          <p className="text-xs text-gray-500 mt-2 text-center max-w-48">
                            NOTE: Attached Image thumbnail is supported in Latest Firefox, Chrome, Opera, Safari and Internet Explorer 10 only
                          </p>
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Employee Code *
                            </label>
                            <input
                              type="text"
                              value={formData.code || ''}
                              onChange={(e) => handleInputChange('code', e.target.value)}
                              placeholder="APLEMP0113"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Employee Name *
                            </label>
                            <input
                              type="text"
                              value={formData.full_name || ''}
                              onChange={(e) => handleInputChange('full_name', e.target.value)}
                              placeholder="Enter Employee Name"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Gender *
                            </label>
                            <div className="flex gap-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="gender"
                                  value="Male"
                                  checked={formData.gender === 'Male'}
                                  onChange={(e) => handleInputChange('gender', e.target.value)}
                                  className="mr-2"
                                />
                                Male
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="gender"
                                  value="Female"
                                  checked={formData.gender === 'Female'}
                                  onChange={(e) => handleInputChange('gender', e.target.value)}
                                  className="mr-2"
                                />
                                Female
                              </label>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Work Type *
                            </label>
                            <div className="flex gap-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="work_type"
                                  value="OFFICE"
                                  checked={formData.work_type === 'OFFICE'}
                                  onChange={(e) => handleInputChange('work_type', e.target.value)}
                                  className="mr-2"
                                />
                                OFFICE
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="work_type"
                                  value="ONFIELD"
                                  checked={formData.work_type === 'ONFIELD'}
                                  onChange={(e) => handleInputChange('work_type', e.target.value)}
                                  className="mr-2"
                                />
                                ONFIELD
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={formData.date_of_birth || ''}
                          onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Marital Status
                        </label>
                        <select
                          value={formData.marital_status || ''}
                          onChange={(e) => handleInputChange('marital_status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Marital Status</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widowed">Widowed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Anniversary
                        </label>
                        <input
                          type="date"
                          value={formData.anniversary || ''}
                          onChange={(e) => handleInputChange('anniversary', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Primary Contact Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.contact || ''}
                          onChange={(e) => handleInputChange('contact', e.target.value)}
                          placeholder="Enter Primary Contact Number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Alternate Contact Number
                        </label>
                        <input
                          type="tel"
                          value={formData.alternate_contact || ''}
                          onChange={(e) => handleInputChange('alternate_contact', e.target.value)}
                          placeholder="Enter Alternate Contact Number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter Email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <select
                          value={formData.state || ''}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select State</option>
                          <option value="BIHAR">BIHAR</option>
                          <option value="JHARKHAND">JHARKHAND</option>
                          <option value="WEST BENGAL">WEST BENGAL</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          HQ *
                        </label>
                        <input
                          type="text"
                          value={formData.city || ''}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Enter HQ"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Multiple HQ
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>Select Multiple HQ</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Zones *
                        </label>
                        <input
                          type="text"
                          value={formData.zone || ''}
                          onChange={(e) => handleInputChange('zone', e.target.value)}
                          placeholder="Enter Zone"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Division *
                      </label>
                      <input
                        type="text"
                        value={formData.division_department || ''}
                        onChange={(e) => handleInputChange('division_department', e.target.value)}
                        placeholder="Enter Division"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Address
                        </label>
                        <textarea
                          value={formData.address || ''}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Enter Current Address"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Permanent Address
                        </label>
                        <textarea
                          value={formData.permanent_address || ''}
                          onChange={(e) => handleInputChange('permanent_address', e.target.value)}
                          placeholder="Enter Permanent Address"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Zip/Postal Code
                        </label>
                        <input
                          type="text"
                          value={formData.postal_code || ''}
                          onChange={(e) => handleInputChange('postal_code', e.target.value)}
                          placeholder="Enter Zip/Postal Code"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Division
                        </label>
                        <select
                          value={formData.additional_division || ''}
                          onChange={(e) => handleInputChange('additional_division', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Additional Division</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'work' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Work Information
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ex-Stations
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>Select Ex Stations</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Out-Stations
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>Select Out Stations</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Designation *
                        </label>
                        <input
                          type="text"
                          value={formData.designation || ''}
                          onChange={(e) => handleInputChange('designation', e.target.value)}
                          placeholder="Enter Designation"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Assigned To
                        </label>
                        <input
                          type="text"
                          value={formData.assign_to || ''}
                          onChange={(e) => handleInputChange('assign_to', e.target.value)}
                          placeholder="Enter Assigned To"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Supervisor
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>Select Supervisor</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date Of Joining *
                        </label>
                        <input
                          type="date"
                          value={formData.date_of_joining || ''}
                          onChange={(e) => handleInputChange('date_of_joining', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Probation Date
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Show Accompanied
                        </label>
                        <input type="checkbox" className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accompanied Employee
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>Select Accompanied Employee</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date Of Resignation
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Show in Transit
                        </label>
                        <input type="checkbox" className="w-4 h-4" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Holiday Calendar
                        </label>
                        <input
                          type="text"
                          value={formData.zone || ''}
                          onChange={(e) => handleInputChange('zone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'other' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Other Information
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Employee Qualification
                        </label>
                        <input
                          type="text"
                          value={formData.qualification || ''}
                          onChange={(e) => handleInputChange('qualification', e.target.value)}
                          placeholder="Enter Qualification"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Aadhar Number
                        </label>
                        <input
                          type="text"
                          value={formData.aadhar_number || ''}
                          onChange={(e) => handleInputChange('aadhar_number', e.target.value)}
                          placeholder="Enter Aadhar Number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PAN Number
                        </label>
                        <input
                          type="text"
                          value={formData.pan_number || ''}
                          onChange={(e) => handleInputChange('pan_number', e.target.value)}
                          placeholder="Enter PAN Number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PF Number
                        </label>
                        <input
                          type="text"
                          value={formData.pf_number || ''}
                          onChange={(e) => handleInputChange('pf_number', e.target.value)}
                          placeholder="Enter PF Number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ESC Number
                        </label>
                        <input
                          type="text"
                          value={formData.esc_number || ''}
                          onChange={(e) => handleInputChange('esc_number', e.target.value)}
                          placeholder="Enter ESC Number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PF UAN Number
                        </label>
                        <input
                          type="text"
                          value={formData.pf_uan_number || ''}
                          onChange={(e) => handleInputChange('pf_uan_number', e.target.value)}
                          placeholder="Enter PF UAN Number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Driver's License Number
                        </label>
                        <input
                          type="text"
                          value={formData.license_number || ''}
                          onChange={(e) => handleInputChange('license_number', e.target.value)}
                          placeholder="Enter License Number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          License Expiry Date
                        </label>
                        <input
                          type="date"
                          value={formData.license_expiry || ''}
                          onChange={(e) => handleInputChange('license_expiry', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Group
                      </label>
                      <select
                        value={formData.blood_group || ''}
                        onChange={(e) => handleInputChange('blood_group', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeTab === 'account' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Daily Allowance Information
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          DA_EX
                        </label>
                        <input
                          type="number"
                          value={formData.da_ex || 200}
                          onChange={(e) => handleInputChange('da_ex', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          DA_OUT
                        </label>
                        <input
                          type="number"
                          value={formData.da_out || 700}
                          onChange={(e) => handleInputChange('da_out', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          DA_RHQ
                        </label>
                        <input
                          type="number"
                          value={formData.da_rhq || 0}
                          onChange={(e) => handleInputChange('da_rhq', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          DA_TRANSIT
                        </label>
                        <input
                          type="number"
                          value={formData.da_transit || 0}
                          onChange={(e) => handleInputChange('da_transit', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          DA_OTHER
                        </label>
                        <input
                          type="number"
                          value={formData.da_other || 0}
                          onChange={(e) => handleInputChange('da_other', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-8">
                      Account Information
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          value={formData.account_holder_name || ''}
                          onChange={(e) => handleInputChange('account_holder_name', e.target.value)}
                          placeholder="Enter Account Holder Name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Number
                        </label>
                        <input
                          type="text"
                          value={formData.account_number || ''}
                          onChange={(e) => handleInputChange('account_number', e.target.value)}
                          placeholder="Enter Account Number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          IFSC Number
                        </label>
                        <input
                          type="text"
                          value={formData.ifsc_number || ''}
                          onChange={(e) => handleInputChange('ifsc_number', e.target.value)}
                          placeholder="Enter IFSC Number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Beneficiary ID
                        </label>
                        <input
                          type="text"
                          value={formData.beneficiary_id || ''}
                          onChange={(e) => handleInputChange('beneficiary_id', e.target.value)}
                          placeholder="Enter Beneficiary ID"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          value={formData.bank_name || ''}
                          onChange={(e) => handleInputChange('bank_name', e.target.value)}
                          placeholder="Enter Bank Name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Branch Name
                        </label>
                        <input
                          type="text"
                          value={formData.branch_name || ''}
                          onChange={(e) => handleInputChange('branch_name', e.target.value)}
                          placeholder="Enter Branch Name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nominee Name
                        </label>
                        <input
                          type="text"
                          value={formData.nominee_name || ''}
                          onChange={(e) => handleInputChange('nominee_name', e.target.value)}
                          placeholder="Enter Nominee Name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Annual Income
                        </label>
                        <input
                          type="number"
                          value={formData.annual_income || 0}
                          onChange={(e) => handleInputChange('annual_income', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
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
                form="add-employee-form"
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
