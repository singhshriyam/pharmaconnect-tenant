import React from 'react';
import { DoctorFormData } from '../common/types';

interface DoctorContactInfoTabProps {
  formData: Partial<DoctorFormData>;
  onInputChange: (field: string, value: string | number) => void;
}

export const DoctorContactInfoTab: React.FC<DoctorContactInfoTabProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
        Contact Information
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact No *
          </label>
          <input
            type="tel"
            value={formData.contact_no || formData.phone || ''}
            onChange={(e) => onInputChange('contact_no', e.target.value)}
            placeholder="Enter Contact Number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alternate Phone
          </label>
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => onInputChange('phone', e.target.value)}
            placeholder="Enter Alternate Phone Number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={(e) => onInputChange('email', e.target.value)}
          placeholder="Enter Email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address
        </label>
        <textarea
          value={formData.address || ''}
          onChange={(e) => onInputChange('address', e.target.value)}
          placeholder="Enter Complete Address"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            value={formData.location_lat || ''}
            onChange={(e) => onInputChange('location_lat', parseFloat(e.target.value) || 0)}
            placeholder="Enter Latitude"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            value={formData.location_lng || ''}
            onChange={(e) => onInputChange('location_lng', parseFloat(e.target.value) || 0)}
            placeholder="Enter Longitude"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
