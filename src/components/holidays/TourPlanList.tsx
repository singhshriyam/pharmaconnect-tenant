import React from 'react';
import { TourPlanListProps } from '../common/types';

interface TourPlanListPropsExtended extends TourPlanListProps {
  onAddTourPlan: () => void;
}

const TourPlanList: React.FC<TourPlanListPropsExtended> = ({ tourPlans, isLoading, onViewApproval, onAddTourPlan }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading tour plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Approve Tour Plan Card */}
          <div
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-teal-500"
            onClick={onViewApproval}
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Approve Tour Plan</h3>
            <p className="text-sm text-gray-600">Approve & unlock tour plans of employees for the selected month.</p>
          </div>

          {/* Add Tour Plan Card - Opens Modal */}
          <div
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-teal-500"
            onClick={onAddTourPlan}
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Add Tour Plan (Monthly)</h3>
            <p className="text-sm text-gray-600">Add monthly tour plan for employee.</p>
          </div>

          {/* Modify Tour Plan Card */}
          <div
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-teal-500"
            onClick={() => alert('Modify Tour Plan - This will navigate to a separate page')}
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Modify Tour Plan</h3>
            <p className="text-sm text-gray-600">Revised Tour Plan worked only in case of Approved or Not Submitted.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Deviation Approval Card */}
          <div
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-teal-500"
            onClick={() => alert('Deviation Approval - This will navigate to a separate page')}
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Deviation Approval</h3>
            <p className="text-sm text-gray-600">Approve & deny tour plans deviation request of employee.</p>
          </div>

          {/* View Tour Plan Card */}
          <div
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-teal-500"
            onClick={() => alert('View Tour Plan - This will navigate to a separate page')}
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">View Tour Plan</h3>
            <p className="text-sm text-gray-600">View the tour plans of the employees.</p>
          </div>

          {/* Tour Plan Block/Unblock Card */}
          <div
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-teal-500"
            onClick={() => alert('Tour Plan Block/Unblock - This will navigate to a separate page')}
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Tour Plan Block/Unblock</h3>
            <p className="text-sm text-gray-600">List of blocked employees Who have not submitted next month's tour plan before the submission day.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPlanList;
