import React from 'react';
import { Check, X, Calendar } from 'lucide-react';

// Import shared types
import { LeaveListProps } from '../../components/common/types';

const LeaveList: React.FC<LeaveListProps> = ({ requests, isLoading, userRole, onStatusUpdate }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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

  const handleApprove = (request: any) => {
    console.log('Approving leave request:', request.id);
    onStatusUpdate(request, 'Approved', 'Leave approved by manager');
  };

  const handleReject = (request: any) => {
    console.log('Rejecting leave request:', request.id);
    onStatusUpdate(request, 'Rejected', 'Leave rejected by manager');
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Leave Requests
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
          <Calendar className="w-5 h-5 text-blue-600" />
          Leave Requests ({requests.length})
        </h3>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Employee</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Leave Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Days</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Reason</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">
                      {request.created_by || 'Unknown'}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm border">
                      {request.leave_type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <div className="font-medium">{formatDate(request.start_date)}</div>
                      <div className="text-gray-500">to {formatDate(request.end_date)}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">
                      {request.total_days} days
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="max-w-40 truncate" title={request.reason}>
                      {request.reason}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-sm border ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      {userRole === 'admin' && request.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(request)}
                            className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                            title="Approve leave request"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(request)}
                            className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            title="Reject leave request"
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

        {requests.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No leave requests found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveList;
