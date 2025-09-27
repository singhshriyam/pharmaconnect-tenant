import React from 'react';
import { Employee } from '../common/types';

interface WorkInfoTabProps {
  formData: Partial<Employee>;
  onInputChange: (field: string, value: string | number) => void;
}

export const WorkInfoTab: React.FC<WorkInfoTabProps> = ({ formData, onInputChange }) => {
  return (
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
            onChange={(e) => onInputChange('designation', e.target.value)}
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
            onChange={(e) => onInputChange('assign_to', e.target.value)}
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
            onChange={(e) => onInputChange('date_of_joining', e.target.value)}
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
            onChange={(e) => onInputChange('zone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
