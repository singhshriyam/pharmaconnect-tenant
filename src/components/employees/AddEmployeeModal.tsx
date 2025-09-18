import React from 'react';
import { UserPlus } from 'lucide-react';

// Import shared types
import { AddEmployeeModalProps } from '../../components/common/types';

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onOpenChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">How to Add a New Employee</h2>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            New employees must be invited to ensure secure account creation. Here's how:
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Invite via Email</h4>
              <p className="text-sm text-gray-600">
                Use the <span className="font-semibold text-blue-700">"Invite User"</span> button located in the main sidebar (on the left of your screen). This is the primary way to add new members to your team.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Set Role</h4>
              <p className="text-sm text-gray-600">
                Enter the employee's email and assign them a role. Use <code className="bg-gray-200 px-1 rounded">'user'</code> for representatives and <code className="bg-gray-200 px-1 rounded">'admin'</code> for managers or administrators.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Employee Registration</h4>
              <p className="text-sm text-gray-600">
                The new employee will receive an email to register. They will set their own password during this secure process.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Complete Profile</h4>
              <p className="text-sm text-gray-600">
                After they register, their account will appear here. You can then click the <span className="font-semibold text-blue-700">Edit</span> button on their record to complete their profile details (e.g., Employee ID, Territory).
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => onOpenChange(false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
