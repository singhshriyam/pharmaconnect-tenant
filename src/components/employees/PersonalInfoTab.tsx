import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Employee } from '../common/types';

interface PersonalInfoTabProps {
  formData: Partial<Employee>;
  onInputChange: (field: string, value: string | number) => void;
}

export const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ formData, onInputChange }) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  return (
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
                onChange={(e) => onInputChange('code', e.target.value)}
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
                onChange={(e) => onInputChange('full_name', e.target.value)}
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
                    onChange={(e) => onInputChange('gender', e.target.value)}
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
                    onChange={(e) => onInputChange('gender', e.target.value)}
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
                    onChange={(e) => onInputChange('work_type', e.target.value)}
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
                    onChange={(e) => onInputChange('work_type', e.target.value)}
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
            onChange={(e) => onInputChange('date_of_birth', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marital Status
          </label>
          <select
            value={formData.marital_status || ''}
            onChange={(e) => onInputChange('marital_status', e.target.value)}
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
            onChange={(e) => onInputChange('anniversary', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
