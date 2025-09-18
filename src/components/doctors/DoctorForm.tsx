import React, { useState, useEffect } from 'react';
import { Save, XCircle } from "lucide-react";

// Import shared types
import { Doctor, DoctorFormProps, DoctorFormData } from '../../components/common/types';

const POTENTIAL_LEVELS = ["High", "Medium", "Low"];
const SPECIALTIES = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Neurology",
  "Pediatrics",
  "Internal Medicine",
  "Orthopedics",
  "General Practice",
  "Diabetes"
];

const DoctorForm: React.FC<DoctorFormProps> = ({ doctor, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<DoctorFormData>({
    name: '',
    specialty: '',
    clinic_name: '',
    address: '',
    phone: '',
    email: '',
    territory: '',
    potential: 'Medium',
    notes: '',
    location_lat: undefined,
    location_lng: undefined
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || '',
        specialty: doctor.specialty || '',
        clinic_name: doctor.clinic_name || '',
        address: doctor.address || '',
        phone: doctor.phone || '',
        email: doctor.email || '',
        territory: doctor.territory || '',
        potential: doctor.potential || 'Medium',
        notes: doctor.notes || '',
        location_lat: doctor.location_lat,
        location_lng: doctor.location_lng
      });
    }
  }, [doctor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'location_lat' || name === 'location_lng') {
      setFormData(prev => ({
        ...prev,
        [name]: value ? Number(value) : undefined
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Doctor Name and Specialty */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Doctor Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
            Specialty <span className="text-red-500">*</span>
          </label>
          <select
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            required
          >
            <option value="">Select specialty</option>
            {SPECIALTIES.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Clinic and Address */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="clinic_name" className="block text-sm font-medium text-gray-700">
            Clinic/Hospital Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="clinic_name"
            name="clinic_name"
            value={formData.clinic_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="territory" className="block text-sm font-medium text-gray-700">
            Territory <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="territory"
            name="territory"
            value={formData.territory}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Potential and Location */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label htmlFor="potential" className="block text-sm font-medium text-gray-700">Potential</label>
          <select
            id="potential"
            name="potential"
            value={formData.potential}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            {POTENTIAL_LEVELS.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="location_lat" className="block text-sm font-medium text-gray-700">Latitude</label>
          <input
            type="number"
            id="location_lat"
            name="location_lat"
            value={formData.location_lat || ''}
            onChange={handleChange}
            step="any"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="location_lng" className="block text-sm font-medium text-gray-700">Longitude</label>
          <input
            type="number"
            id="location_lng"
            name="location_lng"
            value={formData.location_lng || ''}
            onChange={handleChange}
            step="any"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <XCircle className="w-4 h-4 mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Doctor
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;
