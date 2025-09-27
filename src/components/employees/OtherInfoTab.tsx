import React from 'react';
import { Employee } from '../common/types';

interface OtherInfoTabProps {
  formData: Partial<Employee>;
  onInputChange: (field: string, value: string | number) => void;
}

export const OtherInfoTab: React.FC<OtherInfoTabProps> = ({ formData, onInputChange }) => {
  return (
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
            onChange={(e) => onInputChange('qualification', e.target.value)}
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
            onChange={(e) => onInputChange('aadhar_number', e.target.value)}
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
            onChange={(e) => onInputChange('pan_number', e.target.value)}
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
            onChange={(e) => onInputChange('pf_number', e.target.value)}
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
            onChange={(e) => onInputChange('esc_number', e.target.value)}
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
            onChange={(e) => onInputChange('pf_uan_number', e.target.value)}
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
            onChange={(e) => onInputChange('license_number', e.target.value)}
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
            onChange={(e) => onInputChange('license_expiry', e.target.value)}
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
          onChange={(e) => onInputChange('blood_group', e.target.value)}
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
  );
};
