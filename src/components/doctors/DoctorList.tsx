import React, { useState, useMemo } from 'react';
import { Edit, Trash2, Search, Filter, X } from 'lucide-react';
import { DoctorListProps } from '../common/types';

const DoctorList: React.FC<DoctorListProps> = ({ doctors, isLoading, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    specialty: '',
    potential: '',
    territory: '',
    category: '',
    zone: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filter dropdowns
  const filterOptions = useMemo(() => {
    const specialties = Array.from(new Set(doctors.map(doc => doc.specialty).filter(Boolean)));
    const potentials = Array.from(new Set(doctors.map(doc => doc.potential).filter(Boolean)));
    const territories = Array.from(new Set(doctors.map(doc => doc.territory).filter(Boolean)));
    const categories = Array.from(new Set(doctors.map(doc => (doc as any).category).filter(Boolean)));
    const zones = Array.from(new Set(doctors.map(doc => (doc as any).zone).filter(Boolean)));

    return { specialties, potentials, territories, categories, zones };
  }, [doctors]);

  // Filter and search doctors
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      // Search filter
      const searchMatch = searchTerm === '' ||
        doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doctor as any).doctor_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.phone?.includes(searchTerm) ||
        (doctor as any).city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.clinic_name?.toLowerCase().includes(searchTerm.toLowerCase());

      // Other filters
      const specialtyMatch = !filters.specialty || doctor.specialty === filters.specialty;
      const potentialMatch = !filters.potential || doctor.potential === filters.potential;
      const territoryMatch = !filters.territory || doctor.territory === filters.territory;
      const categoryMatch = !filters.category || (doctor as any).category === filters.category;
      const zoneMatch = !filters.zone || (doctor as any).zone === filters.zone;

      return searchMatch && specialtyMatch && potentialMatch && territoryMatch && categoryMatch && zoneMatch;
    });
  }, [doctors, searchTerm, filters]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilters({
      specialty: '',
      potential: '',
      territory: '',
      category: '',
      zone: ''
    });
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter !== '');

  // const getPotentialColor = (potential: string) => {
  //   switch (potential) {
  //     case 'High': return 'bg-red-100 text-red-800';
  //     case 'Medium': return 'bg-yellow-100 text-yellow-800';
  //     case 'Low': return 'bg-gray-100 text-gray-800';
  //     default: return 'bg-gray-100 text-gray-800';
  //   }
  // };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B': return 'bg-blue-100 text-blue-800';
      case 'C': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-8 text-center">
          <p className="text-gray-500">No doctors found. Add your first doctor to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Search and Filter Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, code, contact, city, or clinic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center px-4 py-2 border rounded-lg transition-colors ${
              showFilters || hasActiveFilters
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </button>

          {/* Clear Filters Button */}
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

        {/* Filter Dropdowns */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Specialty</label>
              <select
                value={filters.specialty}
                onChange={(e) => handleFilterChange('specialty', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Specialties</option>
                {filterOptions.specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Potential</label>
              <select
                value={filters.potential}
                onChange={(e) => handleFilterChange('potential', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Potentials</option>
                {filterOptions.potentials.map(potential => (
                  <option key={potential} value={potential}>{potential}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Territory</label>
              <select
                value={filters.territory}
                onChange={(e) => handleFilterChange('territory', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Territories</option>
                {filterOptions.territories.map(territory => (
                  <option key={territory} value={territory}>{territory}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {filterOptions.categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Zone</label>
              <select
                value={filters.zone}
                onChange={(e) => handleFilterChange('zone', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Zones</option>
                {filterOptions.zones.map(zone => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="mt-3 flex justify-between items-center text-sm text-gray-600">
          <span>
            Showing {filteredDoctors.length} of {doctors.length} doctors
            {hasActiveFilters && ' (filtered)'}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Add Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registration Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hospital Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Immediate Senior
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qualification
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Division
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Zone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DOB
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDoctors.length === 0 ? (
              <tr>
                <td colSpan={18} className="px-6 py-8 text-center text-gray-500">
                  {hasActiveFilters ? 'No doctors match the current filters.' : 'No doctors found.'}
                </td>
              </tr>
            ) : (
              filteredDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(doctor)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Edit doctor"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this doctor?')) {
                            onDelete(doctor.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Delete doctor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.created_date ? new Date(doctor.created_date).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(doctor as any).registration_number || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(doctor as any).doctor_code || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {doctor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(doctor as any).city || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(doctor as any).hospital_name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(doctor as any).employee_name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(doctor as any).immediate_senior || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(doctor as any).contact_no || doctor.phone || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.specialty || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(doctor as any).qualification || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(doctor as any).division || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(doctor as any).category ? (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor((doctor as any).category)}`}>
                        {(doctor as any).category}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(doctor as any).zone || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.email || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(doctor as any).gender || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(doctor as any).date_of_birth || '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Doctor Count Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Total Doctors: <span className="font-medium">{doctors.length}</span>
          {hasActiveFilters && (
            <span className="ml-2">
              | Filtered: <span className="font-medium">{filteredDoctors.length}</span>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default DoctorList;
