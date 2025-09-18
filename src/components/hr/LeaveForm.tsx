import React, { useState } from 'react';
import { Save, XCircle } from 'lucide-react';

// Import shared types
import { LeaveFormProps, LeaveRequestFormData } from '../../components/common/types';

const LEAVE_TYPES = ["Sick Leave", "Casual Leave", "Earned Leave", "Emergency Leave", "Maternity Leave"];

const LeaveForm: React.FC<LeaveFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<LeaveRequestFormData>({
    leave_type: 'Casual Leave',
    start_date: '',
    end_date: '',
    total_days: 0,
    reason: ''
  });

  const calculateTotalDays = (startDate: string, endDate: string): number => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) return 0;

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(0, diffDays);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (field: 'start_date' | 'end_date', value: string) => {
    const newFormData = { ...formData, [field]: value };

    // Recalculate total days
    if (newFormData.start_date && newFormData.end_date) {
      newFormData.total_days = calculateTotalDays(newFormData.start_date, newFormData.end_date);
    }

    setFormData(newFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Leave Type and Total Days */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="leave_type" className="block text-sm font-medium text-gray-700">
            Leave Type <span className="text-red-500">*</span>
          </label>
          <select
            id="leave_type"
            value={formData.leave_type}
            onChange={(e) => handleSelectChange('leave_type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            required
          >
            {LEAVE_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="total_days" className="block text-sm font-medium text-gray-700">
            Total Days
          </label>
          <input
            type="number"
            id="total_days"
            value={formData.total_days}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
          />
        </div>
      </div>

      {/* Start Date and End Date */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="start_date"
            value={formData.start_date}
            onChange={(e) => handleDateChange('start_date', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
            End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="end_date"
            value={formData.end_date}
            onChange={(e) => handleDateChange('end_date', e.target.value)}
            min={formData.start_date || new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Reason */}
      <div className="space-y-2">
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
          Reason for Leave <span className="text-red-500">*</span>
        </label>
        <textarea
          id="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Please provide reason for your leave request..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          required
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <XCircle className="w-4 h-4 mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          Apply for Leave
        </button>
      </div>
    </form>
  );
};

export default LeaveForm;
