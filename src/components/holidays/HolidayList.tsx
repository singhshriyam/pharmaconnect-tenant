import React, { useState, useMemo } from 'react';
import { Trash2, Search, X } from 'lucide-react';
import { HolidayListProps } from '../common/types';

const HolidayList: React.FC<HolidayListProps> = ({ holidays, isLoading, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterZone, setFilterZone] = useState('');

  const zones = useMemo(() => {
    return Array.from(new Set(holidays.map(h => h.zone).filter(Boolean)));
  }, [holidays]);

  const filteredHolidays = useMemo(() => {
    return holidays.filter(holiday => {
      const matchesSearch = searchTerm === '' ||
        holiday.occasion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        holiday.zone.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesZone = !filterZone || holiday.zone === filterZone;
      return matchesSearch && matchesZone;
    });
  }, [holidays, searchTerm, filterZone]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilterZone('');
  };

  const hasActiveFilters = searchTerm || filterZone;

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading holidays...</p>
        </div>
      </div>
    );
  }

  if (holidays.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-8 text-center">
          <p className="text-gray-500">No holidays found. Add your first holiday to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by zone or occasion..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <select
            value={filterZone}
            onChange={(e) => setFilterZone(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">All Zones</option>
            {zones.map(zone => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </button>
          )}
        </div>

        <div className="mt-3 flex justify-between items-center text-sm text-gray-600">
          <span>
            Showing {filteredHolidays.length} of {holidays.length} holidays
            {hasActiveFilters && ' (filtered)'}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Zone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Occasion
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredHolidays.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  {hasActiveFilters ? 'No holidays match the current filters.' : 'No holidays found.'}
                </td>
              </tr>
            ) : (
              filteredHolidays.map((holiday) => (
                <tr key={holiday.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this holiday?')) {
                          onDelete(holiday.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-900 transition-colors"
                      title="Delete holiday"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {holiday.zone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(holiday.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {holiday.occasion}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Total Holidays: <span className="font-medium">{holidays.length}</span>
          {hasActiveFilters && (
            <span className="ml-2">
              | Filtered: <span className="font-medium">{filteredHolidays.length}</span>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default HolidayList;
