import React, { useState, useMemo } from 'react';
import { X, Eye, Check, XCircle } from 'lucide-react';
import { TourPlan } from '../common/types';

interface ApproveTourPlanModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tourPlans: TourPlan[];
  onView: (plan: TourPlan) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const ApproveTourPlanModal: React.FC<ApproveTourPlanModalProps> = ({
  isOpen,
  onOpenChange,
  tourPlans,
  onView,
  onApprove,
  onReject
}) => {
  const [filters, setFilters] = useState({
    month: '',
    year: '',
    designation: '',
    state: '',
    employee: '',
    status: ''
  });

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = ['2024', '2025', '2026'];
  const designations = useMemo(() => Array.from(new Set(tourPlans.map(p => p.designation))), [tourPlans]);

  const filteredPlans = useMemo(() => {
    return tourPlans.filter(plan => {
      const matchesMonth = !filters.month || plan.month === filters.month;
      const matchesYear = !filters.year || plan.year === filters.year;
      const matchesDesignation = !filters.designation || plan.designation === filters.designation;
      const matchesStatus = !filters.status || plan.status === filters.status;
      const matchesEmployee = !filters.employee || plan.employee_name.toLowerCase().includes(filters.employee.toLowerCase());
      return matchesMonth && matchesYear && matchesDesignation && matchesStatus && matchesEmployee;
    });
  }, [tourPlans, filters]);

  if (!isOpen) return null;

  const handleApprove = (id: string) => {
    if (window.confirm('Are you sure you want to approve this tour plan?')) {
      onApprove(id);
    }
  };

  const handleReject = (id: string) => {
    if (window.confirm('Are you sure you want to reject this tour plan?')) {
      onReject(id);
    }
  };

  const clearFilters = () => {
    setFilters({
      month: '',
      year: '',
      designation: '',
      state: '',
      employee: '',
      status: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-7xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">Approve Tour Plan</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            <select
              value={filters.month}
              onChange={(e) => setFilters({ ...filters, month: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">All Months</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>

            <select
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={filters.designation}
              onChange={(e) => setFilters({ ...filters, designation: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">All Designation</option>
              {designations.map(designation => (
                <option key={designation} value={designation}>{designation}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search employee..."
              value={filters.employee}
              onChange={(e) => setFilters({ ...filters, employee: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Whole Month Tour Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour Plan Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlans.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No tour plans found for the selected filters.
                  </td>
                </tr>
              ) : (
                filteredPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onView(plan)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                          aria-label="View tour plan"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {plan.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(plan.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Approve"
                              aria-label="Approve tour plan"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(plan.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Reject"
                              aria-label="Reject tour plan"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {plan.employee_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {plan.designation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {plan.month} {plan.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded text-xs font-medium">
                        {plan.whole_month_tour_plan || 'Yes'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs truncate">
                        {plan.planned_dates.length > 0
                          ? plan.planned_dates.map(d => new Date(d).getDate()).join(', ')
                          : '-'
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {plan.approved_by || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        plan.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        plan.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {plan.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Showing {filteredPlans.length} of {tourPlans.length} entries
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApproveTourPlanModal;
