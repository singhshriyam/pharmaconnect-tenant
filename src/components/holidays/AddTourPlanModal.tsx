import React, { useState } from 'react';
import { X, GripVertical } from 'lucide-react';
import { TourPlanFormData } from '../common/types';

interface AddTourPlanModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TourPlanFormData) => void;
}

interface DoctorDistrict {
  id: string;
  name: string;
  type: 'district' | 'doctor';
}

const AddTourPlanModal: React.FC<AddTourPlanModalProps> = ({
  isOpen,
  onOpenChange,
  onSubmit
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TourPlanFormData>({
    employee_name: '',
    designation: '',
    month: '',
    year: new Date().getFullYear().toString(),
    planned_dates: [],
    whole_month_tour_plan: 'Yes'
  });

  const [selectedZone, setSelectedZone] = useState('');
  const [calendarAssignments, setCalendarAssignments] = useState<{ [date: string]: DoctorDistrict[] }>({});
  const [draggedItem, setDraggedItem] = useState<DoctorDistrict | null>(null);

  // Mock districts and doctors
  const [availableItems] = useState<DoctorDistrict[]>([
    { id: '1', name: 'Champaran Sethi', type: 'district' },
    { id: '2', name: 'Bettiah', type: 'district' },
    { id: '3', name: 'Bettiah-Majhaulia', type: 'district' },
    { id: '4', name: 'Bettiah-Naudan', type: 'district' },
    { id: '5', name: 'Harinabad', type: 'district' },
    { id: '6', name: 'Ramnagar', type: 'district' },
    { id: '7', name: 'Bagaha', type: 'district' },
    { id: '8', name: 'Sikta', type: 'district' },
    { id: '9', name: 'Jogapatti', type: 'district' },
  ]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Collect all assigned dates
    const allDates = Object.keys(calendarAssignments).sort();

    onSubmit({
      ...formData,
      planned_dates: allDates
    });

    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      employee_name: '',
      designation: '',
      month: '',
      year: new Date().getFullYear().toString(),
      planned_dates: [],
      whole_month_tour_plan: 'Yes'
    });
    setSelectedZone('');
    setCalendarAssignments({});
  };

  const handleInputChange = (field: keyof TourPlanFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    if (window.confirm('Are you sure you want to close? All unsaved changes will be lost.')) {
      resetForm();
      onOpenChange(false);
    }
  };

  // Generate dates for the selected month
  const getDatesForMonth = () => {
    if (!formData.month || !formData.year) return [];

    const monthIndex = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ].indexOf(formData.month);

    const daysInMonth = new Date(parseInt(formData.year), monthIndex + 1, 0).getDate();
    const firstDay = new Date(parseInt(formData.year), monthIndex, 1).getDay();
    const dates = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
      dates.push({ date: '', day: 0, dayOfWeek: '' });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${formData.year}-${String(monthIndex + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
      dates.push({ date, day: i, dayOfWeek });
    }

    return dates;
  };

  // Drag and drop handlers
  const handleDragStart = (item: DoctorDistrict) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (date: string) => {
    if (!date || !draggedItem) return;

    setCalendarAssignments(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), draggedItem]
    }));
    setDraggedItem(null);
  };

  const handleRemoveFromDate = (date: string, itemId: string) => {
    setCalendarAssignments(prev => {
      const updated = { ...prev };
      updated[date] = updated[date].filter(item => item.id !== itemId);
      if (updated[date].length === 0) {
        delete updated[date];
      }
      return updated;
    });
  };

  const dates = getDatesForMonth();
  const isStep1Valid = formData.employee_name && formData.month && formData.designation && formData.year;
  const isStep2Valid = Object.keys(calendarAssignments).length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-semibold text-gray-900">Add Tour Plan</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1</span>
                Step 1 - Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zone *
                  </label>
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">All Zone</option>
                    <option value="Bihar">Bihar</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee *
                  </label>
                  <input
                    type="text"
                    value={formData.employee_name}
                    onChange={(e) => handleInputChange('employee_name', e.target.value)}
                    placeholder="Select Employee"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Month *
                  </label>
                  <select
                    value={formData.month}
                    onChange={(e) => handleInputChange('month', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  >
                    <option value="">Select Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year *
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  >
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Designation *
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    placeholder="Enter Designation"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Drag and Drop Districts to Calendar */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2</span>
                Step 2 - Assign Districts to Dates
              </h3>

              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.whole_month_tour_plan === 'Yes'}
                    onChange={(e) => handleInputChange('whole_month_tour_plan', e.target.checked ? 'Yes' : 'No')}
                    className="mr-2 h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">Do you want to create tour plan with Doctor</span>
                </label>
              </div>

              <div className="flex gap-6">
                {/* Districts List */}
                <div className="w-64 border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h4 className="font-medium text-gray-900 mb-3">Districts</h4>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {availableItems.map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={() => handleDragStart(item)}
                        className="flex items-center p-2 bg-white border border-gray-200 rounded cursor-move hover:bg-gray-50 transition-colors"
                      >
                        <GripVertical className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calendar */}
                <div className="flex-1 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Calendar - {formData.month} {formData.year}
                  </h4>
                  {dates.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Please select a month and year to view the calendar
                    </div>
                  ) : (
                    <div className="grid grid-cols-7 gap-2">
                      {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                        <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                          {day}
                        </div>
                      ))}
                      {dates.map(({ date, day }, idx) => (
                        <div
                          key={idx}
                          onDragOver={date ? handleDragOver : undefined}
                          onDrop={date ? () => handleDrop(date) : undefined}
                          className={`min-h-24 p-2 border rounded text-sm ${
                            !date ? 'bg-gray-50 border-gray-100' :
                            calendarAssignments[date]?.length > 0
                              ? 'bg-green-50 border-green-300'
                              : 'bg-white border-gray-200 hover:border-teal-500'
                          } transition-colors ${date ? 'cursor-pointer' : ''}`}
                        >
                          {date && (
                            <>
                              <div className="font-medium text-gray-700 mb-1">{day}</div>
                              <div className="space-y-1">
                                {calendarAssignments[date]?.map((item, itemIdx) => (
                                  <div
                                    key={itemIdx}
                                    className="text-xs bg-green-600 text-white px-2 py-1 rounded flex justify-between items-center"
                                  >
                                    <span className="truncate">{item.name.split('.')[0]}</span>
                                    <button
                                      onClick={() => handleRemoveFromDate(date, item.id)}
                                      className="ml-1 hover:text-red-200"
                                      aria-label="Remove"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                Drag districts from the left and drop them on calendar dates. Assigned: {Object.keys(calendarAssignments).length} dates
              </div>
            </div>
          )}

          {/* Step 3: Review and Submit */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">3</span>
                Step 3 - Review & Submit
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Employee</label>
                    <p className="text-gray-900">{formData.employee_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Designation</label>
                    <p className="text-gray-900">{formData.designation}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Month</label>
                    <p className="text-gray-900">{formData.month} {formData.year}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Total Dates Assigned</label>
                    <p className="text-gray-900">{Object.keys(calendarAssignments).length} dates</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Assigned Districts by Date</label>
                  <div className="border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                    {Object.entries(calendarAssignments).length === 0 ? (
                      <div className="text-center text-gray-500 py-4">No districts assigned</div>
                    ) : (
                      Object.entries(calendarAssignments).sort().map(([date, items]) => (
                        <div key={date} className="mb-3">
                          <span className="font-medium text-gray-900">
                            {new Date(date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric'
                            })}:
                          </span>
                          <span className="ml-2 text-gray-700">
                            {items.map(item => item.name).join(', ')}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with navigation */}
        <div className="flex justify-between items-center gap-4 p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {[1, 2, 3].map(step => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  step === currentStep ? 'bg-teal-600' : step < currentStep ? 'bg-teal-300' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !isStep1Valid) ||
                (currentStep === 2 && !isStep2Valid)
              }
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Save & Proceed
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Submit Tour Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTourPlanModal;
