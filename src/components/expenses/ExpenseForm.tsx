import React, { useState, useEffect } from 'react';
import { Save, XCircle } from 'lucide-react';

// Import shared types
import { ExpenseFormProps, ExpenseFormData } from '../../components/common/types';

const EXPENSE_TYPES = ["Travel", "Accommodation", "Meals", "Fuel", "Marketing", "Samples", "Other"];

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ExpenseFormData>({
    expense_type: 'Travel',
    amount: 0,
    expense_date: '',
    description: '',
    doctor_visited: '',
    receipt_url: '',
    status: 'Pending'
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  useEffect(() => {
    if (expense) {
      setFormData({
        expense_type: expense.expense_type,
        amount: expense.amount,
        expense_date: expense.expense_date,
        description: expense.description,
        doctor_visited: expense.doctor_visited || '',
        receipt_url: expense.receipt_url || '',
        status: expense.status
      });
    }
  }, [expense]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setReceiptFile(file || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, receiptFile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Expense Type and Amount */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="expense_type" className="block text-sm font-medium text-gray-700">
            Expense Type <span className="text-red-500">*</span>
          </label>
          <select
            id="expense_type"
            value={formData.expense_type}
            onChange={(e) => handleSelectChange('expense_type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            required
          >
            {EXPENSE_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="amount"
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Date and Doctor */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="expense_date" className="block text-sm font-medium text-gray-700">
            Expense Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="expense_date"
            value={formData.expense_date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="doctor_visited" className="block text-sm font-medium text-gray-700">
            Doctor/Client Visited
          </label>
          <input
            type="text"
            id="doctor_visited"
            value={formData.doctor_visited}
            onChange={handleChange}
            placeholder="Name of doctor visited"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the expense..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          required
        />
      </div>

      {/* Receipt Upload */}
      <div className="space-y-2">
        <label htmlFor="receipt" className="block text-sm font-medium text-gray-700">
          Receipt Upload
        </label>
        <input
          type="file"
          id="receipt"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {formData.receipt_url && (
          <p className="text-sm text-green-600">✓ Receipt already uploaded</p>
        )}
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
          {expense ? 'Update Expense' : 'Log Expense'}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
