import React from 'react';
import { Edit, ExternalLink, Check, X, Receipt } from 'lucide-react';

// Import shared types
import { ExpenseListProps } from '../../components/common/types';

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, isLoading, userRole, onEdit, onStatusUpdate }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Reimbursed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleApprove = (expense: any) => {
    console.log('Approving expense:', expense.id);
    onStatusUpdate(expense, 'Approved', 'Approved by manager');
  };

  const handleReject = (expense: any) => {
    console.log('Rejecting expense:', expense.id);
    onStatusUpdate(expense, 'Rejected', 'Rejected by manager');
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Receipt className="w-5 h-5 text-blue-600" />
          Expense Claims
        </h3>
        <div className="space-y-4">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-6">
        {/* Header */}
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Receipt className="w-5 h-5 text-blue-600" />
          Expense Claims ({expenses.length})
        </h3>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Receipt</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                  <td className="py-4 px-4">
                    {formatDate(expense.expense_date)}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm border">
                      {expense.expense_type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{expense.description}</p>
                      {expense.doctor_visited && (
                        <p className="text-sm text-gray-500">{expense.doctor_visited}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">
                      ${expense.amount?.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-sm border ${getStatusColor(expense.status)}`}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {expense.receipt_url ? (
                      <a
                        href={expense.receipt_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">No receipt</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      {expense.status === 'Pending' && (
                        <button
                          onClick={() => onEdit(expense)}
                          className="p-2 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
                          title="Edit expense"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {userRole === 'admin' && expense.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(expense)}
                            className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                            title="Approve expense"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(expense)}
                            className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            title="Reject expense"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {expenses.length === 0 && (
          <div className="text-center py-12">
            <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No expense claims found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
