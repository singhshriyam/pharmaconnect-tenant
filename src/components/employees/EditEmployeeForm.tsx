import React, { useState, useEffect } from 'react';
import { Save, XCircle } from 'lucide-react';

// Import shared types
import { EditEmployeeFormProps, EmployeeFormData } from '../../components/common/types';

const DESIGNATIONS = ["Medical Representative", "Area Manager", "Regional Manager", "Territory Manager"];
const STATUSES = ["active", "inactive"];

const EditEmployeeForm: React.FC<EditEmployeeFormProps> = ({ isOpen, onOpenChange, employee, onUpdate }) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    full_name: '',
    employee_id: '',
    phone: '',
    designation: 'Medical Representative',
    territory: '',
    region: '',
    manager_email: '',
    joining_date: '',
    status: 'active'
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        full_name: employee.full_name || '',
        employee_id: employee.employee_id || '',
        phone: employee.phone || '',
        designation: employee.designation || 'Medical Representative',
        territory: employee.territory || '',
        region: employee.region || '',
        manager_email: employee.manager_email || '',
        joining_date: employee.joining_date || '',
        status: employee.status || 'active',
      });
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;

    // In a real implementation, this would call the API
    console.log('Updating employee:', employee.id, formData);
    onUpdate();
    onOpenChange(false);
  };

  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Employee: {employee.full_name}</h2>
          <p className="text-sm text-gray-600 mt-1">Update the profile details for this employee. Click save when you're done.</p>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="full_name"
                value={formData.full_name || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700">Employee ID</label>
              <input
                type="text"
                id="employee_id"
                value={formData.employee_id || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
              <select
                id="designation"
                value={formData.designation}
                onChange={(e) => handleSelectChange('designation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {DESIGNATIONS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="territory" className="block text-sm font-medium text-gray-700">Territory</label>
              <input
                type="text"
                id="territory"
                value={formData.territory || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">Region</label>
              <input
                type="text"
                id="region"
                value={formData.region || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="manager_email" className="block text-sm font-medium text-gray-700">Manager's Email</label>
              <input
                type="email"
                id="manager_email"
                value={formData.manager_email || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="joining_date" className="block text-sm font-medium text-gray-700">Joining Date</label>
              <input
                type="date"
                id="joining_date"
                value={formData.joining_date || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleSelectChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {STATUSES.map(s => (
                  <option key={s} value={s} className="capitalize">{s}</option>
                ))}
              </select>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex items-center px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeForm;
