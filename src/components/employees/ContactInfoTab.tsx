import React from 'react';
import { Employee } from '../common/types';

interface ContactInfoTabProps {
  formData: Partial<Employee>;
  onInputChange: (field: string, value: string | number) => void;
}

export const ContactInfoTab: React.FC<ContactInfoTabProps> = ({ formData, onInputChange }) => {
  return (
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
            onChange={(e) => onInputChange('contact', e.target.value)}
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
            onChange={(e) => onInputChange('alternate_contact', e.target.value)}
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
          onChange={(e) => onInputChange('email', e.target.value)}
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
            onChange={(e) => onInputChange('state', e.target.value)}
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
            onChange={(e) => onInputChange('city', e.target.value)}
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
            onChange={(e) => onInputChange('zone', e.target.value)}
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
          onChange={(e) => onInputChange('division_department', e.target.value)}
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
            onChange={(e) => onInputChange('address', e.target.value)}
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
            onChange={(e) => onInputChange('permanent_address', e.target.value)}
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
            onChange={(e) => onInputChange('postal_code', e.target.value)}
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
            onChange={(e) => onInputChange('additional_division', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Additional Division</option>
          </select>
        </div>
      </div>
    </div>
  );
};
