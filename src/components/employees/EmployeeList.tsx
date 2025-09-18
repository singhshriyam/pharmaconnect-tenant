import React, { useState } from 'react';
import { Edit, Search, Users } from 'lucide-react';

// Import shared types
import { EmployeeListProps } from '../../components/common/types';

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, isLoading, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(emp =>
    (emp.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (emp.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (emp.designation?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (emp.territory?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          All Employees
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            All Employees
          </h3>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, designation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Employee</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Designation</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Territory</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{emp.full_name}</p>
                      <p className="text-sm text-gray-500">{emp.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-900">{emp.designation || 'N/A'}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-900">{emp.territory || 'N/A'}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-900">{emp.phone || 'N/A'}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-sm border capitalize ${getStatusColor(emp.status)}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => onEdit(emp)}
                      className="p-2 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No employees found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
