import React, { useState } from 'react';
import { Clock, Edit, Search } from 'lucide-react';

// Import shared types from centralized location
import { ListViewProps } from '../common/types';

const ListView: React.FC<ListViewProps> = ({ visits, onEditVisit, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVisits = visits.filter(visit => {
    const matchesSearch = visit.doctor_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || visit.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Missed': return 'bg-red-100 text-red-800 border-red-200';
      case 'Planned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Rescheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Visit List</h3>
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Visit List</h3>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white w-32"
            >
              <option value="all">All Status</option>
              <option value="Planned">Planned</option>
              <option value="Completed">Completed</option>
              <option value="Missed">Missed</option>
              <option value="Rescheduled">Rescheduled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Doctor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date & Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Products</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisits.map((visit) => (
                <tr key={visit.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{visit.doctor_name}</p>
                      <p className="text-sm text-gray-500">{visit.visit_type}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <p>{formatDate(visit.visit_date)}</p>
                      {visit.visit_time && (
                        <p className="text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {visit.visit_time}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm border">
                      {visit.visit_type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-sm border ${getStatusColor(visit.status)}`}>
                      {visit.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1 max-w-40">
                      {visit.products_promoted?.slice(0, 2).map((product, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs border">
                          {product.length > 15 ? `${product.substring(0, 15)}...` : product}
                        </span>
                      ))}
                      {visit.products_promoted && visit.products_promoted.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs border">
                          +{visit.products_promoted.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => onEditVisit(visit)}
                      className="p-2 hover:bg-gray-100 rounded border"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVisits.length === 0 && (
          <div className="text-center py-8">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No visits found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListView;
