import React, { useState } from 'react';
import { X } from 'lucide-react';
import { HolidayFormData } from '../common/types';

interface HolidayFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: HolidayFormData) => void;
  title: string;
  submitButtonText: string;
  type: 'public' | 'restricted';
}

const HolidayFormModal: React.FC<HolidayFormModalProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  title,
  submitButtonText,
  type
}) => {
  const [formData, setFormData] = useState<HolidayFormData>({
    zone: '',
    date: '',
    occasion: '',
    type: type
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, type });
    setFormData({ zone: '', date: '', occasion: '', type });
    onOpenChange(false);
  };

  const handleInputChange = (field: keyof HolidayFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zone *
              </label>
              <select
                value={formData.zone}
                onChange={(e) => handleInputChange('zone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              >
                <option value="">Select Zone</option>
                <option value="Bihar">Bihar</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Holiday Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Holiday Name *
              </label>
              <input
                type="text"
                value={formData.occasion}
                onChange={(e) => handleInputChange('occasion', e.target.value)}
                placeholder="Enter Holiday Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            {submitButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HolidayFormModal;
