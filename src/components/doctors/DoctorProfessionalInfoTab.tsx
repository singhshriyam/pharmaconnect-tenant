import React from 'react';
import { DoctorFormData } from '../common/types';

interface DoctorProfessionalInfoTabProps {
  formData: Partial<DoctorFormData>;
  onInputChange: (field: string, value: string | number) => void;
}

export const DoctorProfessionalInfoTab: React.FC<DoctorProfessionalInfoTabProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
        Professional Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hospital Name
          </label>
          <input
            type="text"
            value={formData.hospital_name || ''}
            onChange={(e) => onInputChange('hospital_name', e.target.value)}
            placeholder="Enter Hospital Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employee Name
          </label>
          <input
            type="text"
            value={formData.employee_name || ''}
            onChange={(e) => onInputChange('employee_name', e.target.value)}
            placeholder="Enter Employee Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Immediate Senior
          </label>
          <input
            type="text"
            value={formData.immediate_senior || ''}
            onChange={(e) => onInputChange('immediate_senior', e.target.value)}
            placeholder="Enter Immediate Senior"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Clinic Name
          </label>
          <input
            type="text"
            value={formData.clinic_name || ''}
            onChange={(e) => onInputChange('clinic_name', e.target.value)}
            placeholder="Enter Clinic Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialty *
          </label>
          <select
            value={formData.specialty || ''}
            onChange={(e) => onInputChange('specialty', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Specialty</option>
            <option value="General Practice">General Practice</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Gynecology">Gynecology</option>
            <option value="ENT">ENT</option>
            <option value="Ophthalmology">Ophthalmology</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Qualification
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
            Division
          </label>
          <input
            type="text"
            value={formData.division || ''}
            onChange={(e) => onInputChange('division', e.target.value)}
            placeholder="Enter Division"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={formData.category || ''}
            onChange={(e) => onInputChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Category</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zone
          </label>
          <input
            type="text"
            value={formData.zone || ''}
            onChange={(e) => onInputChange('zone', e.target.value)}
            placeholder="Enter Zone"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Territory
          </label>
          <select
            value={formData.territory || ''}
            onChange={(e) => onInputChange('territory', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Territory</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="Central">Central</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Potential
          </label>
          <select
            value={formData.potential || 'Medium'}
            onChange={(e) => onInputChange('potential', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            value={formData.notes || ''}
            onChange={(e) => onInputChange('notes', e.target.value)}
            placeholder="Enter any additional notes"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
