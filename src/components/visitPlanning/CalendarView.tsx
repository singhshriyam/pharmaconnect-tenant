import React from 'react';
import { Calendar, Clock, Edit } from 'lucide-react';

// Import shared types from centralized location
import { CalendarViewProps } from '../common/types';

const CalendarView: React.FC<CalendarViewProps> = ({
  visits,
  selectedDate,
  onDateSelect,
  onEditVisit
}) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  const getVisitsForDate = (date: Date) => {
    return visits.filter(visit => {
      const visitDate = new Date(visit.visit_date);
      return visitDate.toDateString() === date.toDateString();
    });
  };

  const selectedDateVisits = getVisitsForDate(selectedDate);

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days = [];

    // Previous month days
    const prevMonth = new Date(currentYear, currentMonth, 0);
    const prevMonthDays = prevMonth.getDate();

    for (let i = startDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }

    return days;
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentYear, currentMonth - 1, selectedDate.getDate());
    onDateSelect(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentYear, currentMonth + 1, selectedDate.getDate());
    onDateSelect(newDate);
  };

  const handleDaySelect = (day: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      const newDate = new Date(currentYear, currentMonth, day);
      onDateSelect(newDate);
    }
  };

  const hasVisitsOnDay = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return false;
    const dayDate = new Date(currentYear, currentMonth, day);
    return getVisitsForDate(dayDate).length > 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Missed': return 'bg-red-100 text-red-800 border-red-200';
      case 'Planned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Rescheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>

        <div className="flex items-center justify-between mb-4">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h4 className="text-lg font-semibold">{months[currentMonth]} {currentYear}</h4>
          <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {generateCalendar().map((dayObj, index) => (
            <button
              key={index}
              onClick={() => handleDaySelect(dayObj.day, dayObj.isCurrentMonth)}
              className={`h-10 text-sm rounded-lg transition-colors relative ${
                dayObj.day === selectedDate.getDate() && dayObj.isCurrentMonth
                  ? 'bg-blue-600 text-white'
                  : dayObj.isCurrentMonth
                  ? hasVisitsOnDay(dayObj.day, dayObj.isCurrentMonth)
                    ? 'bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100'
                    : 'hover:bg-gray-100 text-gray-700'
                  : 'text-gray-300'
              }`}
            >
              {dayObj.day}
              {hasVisitsOnDay(dayObj.day, dayObj.isCurrentMonth) && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Date Visits */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Visits for {formatDate(selectedDate)}
          </h3>
        </div>

        {selectedDateVisits.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No visits scheduled for this date</p>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedDateVisits
              .sort((a, b) => (a.visit_time || '').localeCompare(b.visit_time || ''))
              .map((visit) => (
                <div key={visit.id} className="border rounded-lg p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{visit.doctor_name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        {visit.visit_time && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {visit.visit_time}
                          </div>
                        )}
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs border">
                          {visit.visit_type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(visit.status)}`}>
                        {visit.status}
                      </span>
                      <button
                        onClick={() => onEditVisit(visit)}
                        className="p-2 hover:bg-gray-100 rounded border"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {visit.products_promoted && visit.products_promoted.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-2">Products to Promote:</p>
                      <div className="flex gap-1 flex-wrap">
                        {visit.products_promoted.map((product, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs border">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {visit.notes && (
                    <p className="text-sm text-gray-600 mt-2">{visit.notes}</p>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
