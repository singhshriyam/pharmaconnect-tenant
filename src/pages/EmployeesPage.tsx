import React, { useState, useEffect, useCallback } from "react";
import { UserPlus, Download, Upload } from "lucide-react";

import EmployeeList from "../components/employees/EmployeeList";
import AddEmployeeModal from "../components/employees/AddEmployeeModal";
import EditEmployeeForm from "../components/employees/EditEmployeeForm";
import Sidebar from "../components/dashboard/Sidebar";

// Import ALL types from centralized location - NO local interfaces
import { Employee, EmployeesPageProps } from "../components/common/types";

// In-memory storage for mock data
let mockEmployees: Employee[] = [
  {
    id: '1',
    email: 'rajesh.kumar@medrepcrm.com',
    full_name: 'Rajesh Kumar',
    role: 'user',
    employee_id: 'EMP001',
    designation: 'Medical Representative',
    territory: 'Delhi North',
    region: 'North India',
    phone: '9876543210',
    manager_email: 'manager@medrepcrm.com',
    joining_date: '2024-01-15',
    status: 'active',
    created_date: '2024-01-15'
  },
  {
    id: '2',
    email: 'priya.sharma@medrepcrm.com',
    full_name: 'Priya Sharma',
    role: 'user',
    employee_id: 'EMP002',
    designation: 'Medical Representative',
    territory: 'Mumbai Central',
    region: 'West India',
    phone: '9876543211',
    manager_email: 'manager@medrepcrm.com',
    joining_date: '2024-01-20',
    status: 'active',
    created_date: '2024-01-20'
  },
  {
    id: '3',
    email: 'amit.patel@medrepcrm.com',
    full_name: 'Amit Patel',
    role: 'admin',
    employee_id: 'EMP003',
    designation: 'Area Manager',
    territory: 'Gujarat West',
    region: 'West India',
    phone: '9876543212',
    manager_email: 'director@medrepcrm.com',
    joining_date: '2024-02-01',
    status: 'active',
    created_date: '2024-02-01'
  },
  {
    id: '4',
    email: 'aisha.khan@medrepcrm.com',
    full_name: 'Aisha Khan',
    role: 'user',
    employee_id: 'EMP004',
    designation: 'Medical Representative',
    territory: 'Bangalore South',
    region: 'South India',
    phone: '9876543213',
    manager_email: 'manager@medrepcrm.com',
    joining_date: '2024-02-10',
    status: 'active',
    created_date: '2024-02-10'
  },
  {
    id: '5',
    email: 'vikram.singh@medrepcrm.com',
    full_name: 'Vikram Singh',
    role: 'user',
    employee_id: 'EMP005',
    designation: 'Territory Manager',
    territory: 'Chennai East',
    region: 'South India',
    phone: '9876543214',
    manager_email: 'director@medrepcrm.com',
    joining_date: '2024-02-15',
    status: 'inactive',
    created_date: '2024-02-15'
  }
];

// Mock API functions that actually modify data
const EmployeeAPI = {
  list: async (): Promise<Employee[]> => {
    console.log('Loading employees from mock storage:', mockEmployees.length);
    return [...mockEmployees];
  },

  create: async (data: Partial<Employee>): Promise<Employee> => {
    console.log('Creating employee:', data);
    const newEmployee: Employee = {
      id: Date.now().toString(),
      email: data.email || '',
      full_name: data.full_name || '',
      role: data.role || 'user',
      employee_id: data.employee_id,
      designation: data.designation,
      territory: data.territory,
      region: data.region,
      phone: data.phone,
      manager_email: data.manager_email,
      joining_date: data.joining_date,
      status: data.status || 'active',
      created_date: new Date().toISOString().split('T')[0],
      ...data
    };

    mockEmployees.unshift(newEmployee);
    console.log('Added employee. Total employees:', mockEmployees.length);
    return newEmployee;
  },

  update: async (id: string, data: Partial<Employee>): Promise<Employee> => {
    console.log('Updating employee:', id, data);

    const employeeIndex = mockEmployees.findIndex(emp => emp.id === id);
    if (employeeIndex === -1) {
      throw new Error(`Employee with id ${id} not found`);
    }

    mockEmployees[employeeIndex] = {
      ...mockEmployees[employeeIndex],
      ...data
    };

    console.log('Updated employee:', mockEmployees[employeeIndex]);
    return mockEmployees[employeeIndex];
  },

  delete: async (id: string): Promise<void> => {
    console.log('Deleting employee:', id);

    const employeeIndex = mockEmployees.findIndex(emp => emp.id === id);
    if (employeeIndex === -1) {
      throw new Error(`Employee with id ${id} not found`);
    }

    mockEmployees.splice(employeeIndex, 1);
    console.log('Deleted employee. Remaining employees:', mockEmployees.length);
  }
};

const exportToCsv = (filename: string, data: any[]): void => {
  const headers = ['Email', 'Full Name', 'Role', 'Employee ID', 'Designation', 'Territory', 'Phone', 'Manager Email', 'Status'];
  const csvContent = [
    headers.join(','),
    ...data.map((item: any) => [
      item.email || '',
      item.full_name || '',
      item.role || '',
      item.employee_id || '',
      item.designation || '',
      item.territory || '',
      item.phone || '',
      item.manager_email || '',
      item.status || ''
    ].map(field => `"${field}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

const EmployeesPage: React.FC<EmployeesPageProps> = ({ onLogout, onNavigate }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const loadEmployees = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const employeesData = await EmployeeAPI.list();
      setEmployees(employeesData);
    } catch (error) {
      console.error("Failed to load employees:", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const handleExport = (): void => {
    const dataToExport = employees.map(e => ({
      email: e.email,
      full_name: e.full_name,
      role: e.role,
      employee_id: e.employee_id,
      designation: e.designation,
      territory: e.territory,
      phone: e.phone,
      manager_email: e.manager_email,
      status: e.status
    }));
    exportToCsv("employees.csv", dataToExport);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("File upload:", file.name);
    alert("File upload functionality will be implemented with actual CSV parsing. Employees should be invited via the User Management system.");

    event.target.value = '';
  };

  const handleEdit = (employee: Employee): void => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (): Promise<void> => {
    console.log("Employee updated successfully!");
    await loadEmployees();
  };

  const handleAddSuccess = async (): Promise<void> => {
    console.log("Employee added successfully!");
    setIsAddModalOpen(false);
    await loadEmployees();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        onLogout={onLogout}
        currentPage="employees"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
                <p className="text-blue-600 mt-1">Manage your field force and administrative staff</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => document.getElementById('import-employees-input')?.click()}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </button>
                <input
                  type="file"
                  id="import-employees-input"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
                <button
                  onClick={handleExport}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Employee
                </button>
              </div>
            </div>

            {/* Employee List */}
            <EmployeeList
              employees={employees}
              isLoading={isLoading}
              onEdit={handleEdit}
            />

            {/* Add Employee Modal */}
            <AddEmployeeModal
              isOpen={isAddModalOpen}
              onOpenChange={setIsAddModalOpen}
              onSuccess={handleAddSuccess}
            />

            {/* Edit Employee Form */}
            {selectedEmployee && (
              <EditEmployeeForm
                isOpen={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                employee={selectedEmployee}
                onUpdate={handleUpdate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
