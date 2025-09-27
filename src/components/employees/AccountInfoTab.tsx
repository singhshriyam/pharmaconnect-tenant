import React from 'react';
import { Employee } from '../common/types';

interface AccountInfoTabProps {
  formData: Partial<Employee>;
  onInputChange: (field: string, value: string | number) => void;
}

export const AccountInfoTab: React.FC<AccountInfoTabProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
        Daily Allowance Information
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            DA_EX
          </label>
          <input
            type="number"
            value={formData.da_ex || 200}
            onChange={(e) => onInputChange('da_ex', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            DA_OUT
          </label>
          <input
            type="number"
            value={formData.da_out || 700}
            onChange={(e) => onInputChange('da_out', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            DA_RHQ
          </label>
          <input
            type="number"
            value={formData.da_rhq || 0}
            onChange={(e) => onInputChange('da_rhq', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            DA_TRANSIT
          </label>
          <input
            type="number"
            value={formData.da_transit || 0}
            onChange={(e) => onInputChange('da_transit', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            DA_OTHER
          </label>
          <input
            type="number"
            value={formData.da_other || 0}
            onChange={(e) => onInputChange('da_other', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-8">
        Account Information
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Holder Name
          </label>
          <input
            type="text"
            value={formData.account_holder_name || ''}
            onChange={(e) => onInputChange('account_holder_name', e.target.value)}
            placeholder="Enter Account Holder Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Number
          </label>
          <input
            type="text"
            value={formData.account_number || ''}
            onChange={(e) => onInputChange('account_number', e.target.value)}
            placeholder="Enter Account Number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IFSC Number
          </label>
          <input
            type="text"
            value={formData.ifsc_number || ''}
            onChange={(e) => onInputChange('ifsc_number', e.target.value)}
            placeholder="Enter IFSC Number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Beneficiary ID
          </label>
          <input
            type="text"
            value={formData.beneficiary_id || ''}
            onChange={(e) => onInputChange('beneficiary_id', e.target.value)}
            placeholder="Enter Beneficiary ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bank Name
          </label>
          <input
            type="text"
            value={formData.bank_name || ''}
            onChange={(e) => onInputChange('bank_name', e.target.value)}
            placeholder="Enter Bank Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Branch Name
          </label>
          <input
            type="text"
            value={formData.branch_name || ''}
            onChange={(e) => onInputChange('branch_name', e.target.value)}
            placeholder="Enter Branch Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nominee Name
          </label>
          <input
            type="text"
            value={formData.nominee_name || ''}
            onChange={(e) => onInputChange('nominee_name', e.target.value)}
            placeholder="Enter Nominee Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Income
          </label>
          <input
            type="number"
            value={formData.annual_income || 0}
            onChange={(e) => onInputChange('annual_income', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
