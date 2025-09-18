import React, { useState, useEffect } from 'react';
import { X, Plus, Save, XCircle } from "lucide-react";

// Import shared types from centralized location
import { Visit, VisitFormData, VisitFormProps } from '../common/types';

const VISIT_TYPES = ["Scheduled", "Follow-up", "Emergency", "New Doctor"];
const PRODUCTS = [
  "Cardiology Medication A",
  "Diabetes Treatment B",
  "Hypertension Drug C",
  "Antibiotic D",
  "Pain Relief E"
];

const VisitForm: React.FC<VisitFormProps> = ({ visit, doctors, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<VisitFormData>({
    doctor_id: '',
    doctor_name: '',
    visit_date: '',
    visit_time: '',
    visit_type: 'Scheduled',
    status: 'Planned',
    products_promoted: [],
    notes: '',
    next_visit_date: ''
  });

  const [newProduct, setNewProduct] = useState('');

  useEffect(() => {
    if (visit) {
      setFormData({
        doctor_id: visit.doctor_id,
        doctor_name: visit.doctor_name,
        visit_date: visit.visit_date || '',
        visit_time: visit.visit_time || '',
        visit_type: visit.visit_type,
        status: visit.status || 'Planned',
        products_promoted: visit.products_promoted || [],
        notes: visit.notes || '',
        next_visit_date: visit.next_visit_date || ''
      });
    }
  }, [visit]);

  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const doctorId = e.target.value;
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      setFormData(prev => ({
        ...prev,
        doctor_id: doctorId,
        doctor_name: doctor.name
      }));
    }
  };

  const addProduct = () => {
    if (newProduct && !formData.products_promoted.includes(newProduct)) {
      setFormData(prev => ({
        ...prev,
        products_promoted: [...prev.products_promoted, newProduct]
      }));
      setNewProduct('');
    }
  };

  const removeProduct = (product: string) => {
    setFormData(prev => ({
      ...prev,
      products_promoted: prev.products_promoted.filter(p => p !== product)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Doctor Selection */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Doctor <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.doctor_id}
            onChange={handleDoctorChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            required
          >
            <option value="">Select doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Visit Type</label>
          <select
            value={formData.visit_type}
            onChange={(e) => setFormData(prev => ({...prev, visit_type: e.target.value}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            {VISIT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date and Time */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Visit Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.visit_date}
            onChange={(e) => setFormData(prev => ({...prev, visit_date: e.target.value}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Visit Time</label>
          <input
            type="time"
            value={formData.visit_time}
            onChange={(e) => setFormData(prev => ({...prev, visit_time: e.target.value}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Status (for editing existing visits) */}
      {visit && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({...prev, status: e.target.value as Visit['status']}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="Planned">Planned</option>
            <option value="Completed">Completed</option>
            <option value="Missed">Missed</option>
            <option value="Rescheduled">Rescheduled</option>
          </select>
        </div>
      )}

      {/* Products */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Products to Promote</label>
        <div className="flex gap-2">
          <select
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Select product</option>
            {PRODUCTS.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addProduct}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.products_promoted.map((product) => (
            <span key={product} className="inline-flex items-center px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-sm border gap-2">
              {product}
              <button
                type="button"
                onClick={() => removeProduct(product)}
                className="hover:bg-red-100 rounded-full p-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Visit Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
          placeholder="Add any specific notes for this visit..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none min-h-[80px]"
        />
      </div>

      {/* Next Visit Date */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Next Visit Date</label>
        <input
          type="date"
          value={formData.next_visit_date}
          onChange={(e) => setFormData(prev => ({...prev, next_visit_date: e.target.value}))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Actions */}
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
          {visit ? 'Update Visit' : 'Plan Visit'}
        </button>
      </div>
    </form>
  );
};

export default VisitForm;
