import React from 'react';
import { X } from 'lucide-react';
import { TourPlan } from '../common/types';

interface ViewTourPlanModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tourPlan: TourPlan;
}

const ViewTourPlanModal: React.FC<ViewTourPlanModalProps> = ({
  isOpen,
  onOpenChange,
  tourPlan
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-2xl font-semibold text-gray-900">{tourPlan.employee_name} - Tour Plan</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {/* Tour Plan Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                <p className="text-gray-900">{tourPlan.employee_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                <p className="text-gray-900">{tourPlan.designation}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                <p className="text-gray-900">{tourPlan.month} {tourPlan.year}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                  tourPlan.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  tourPlan.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {tourPlan.status}
                </span>
              </div>
            </div>

            {/* Planned Dates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Planned Dates</label>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {tourPlan.planned_dates.map((date, index) => (
                    <span key={index} className="px-3 py-1 bg-teal-100 text-teal-800 rounded text-sm">
                      {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Deviated Dates */}
            {tourPlan.deviated_dates && tourPlan.deviated_dates.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deviated Dates</label>
                <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                  <div className="flex flex-wrap gap-2">
                    {tourPlan.deviated_dates.map((date, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-200 text-orange-800 rounded text-sm">
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Approval Info */}
            {tourPlan.approved_by && (
              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Approved By</label>
                    <p className="text-gray-900">{tourPlan.approved_by}</p>
                  </div>
                  {tourPlan.approved_date && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Approved Date</label>
                      <p className="text-gray-900">
                        {new Date(tourPlan.approved_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PUBLIC HOLIDAY section (if applicable) */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">PUBLIC HOLIDAY</h3>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Holiday</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">Sat</td>
                    <td className="px-4 py-2 text-sm text-gray-900">09 Aug, 2025</td>
                    <td className="px-4 py-2 text-sm text-gray-900">RAKSHABANDHAN</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">Fri</td>
                    <td className="px-4 py-2 text-sm text-gray-900">15 Aug, 2025</td>
                    <td className="px-4 py-2 text-sm text-gray-900">INDEPENDENCE DAY</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Print
          </button>
          <button
            onClick={() => onOpenChange(false)}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTourPlanModal;
