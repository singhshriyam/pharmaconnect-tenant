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
    email: 'manishmashra1993@gmail.com',
    full_name: 'MANISH MASHRA',
    role: 'user',
    employee_id: 'EMP001',
    code: 'APL_02',
    work_type: 'ONFIELD',
    assign_to: 'ACHALENDRA KUMAR SINHA',
    city: 'Patna',
    contact: '9304386629',
    division_department: 'Main',
    zone: 'Bihar',
    state: 'BIHAR',
    address: 'korgawan, dist-west champaran,narkatiaganj-845453',
    designation: 'RBM',
    territory: 'Delhi North',
    region: 'North India',
    phone: '9304386629',
    manager_email: 'manager@medrepcrm.com',
    joining_date: '2024-01-15',
    date_of_birth: '1993-01-15',
    date_of_joining: '2024-01-15',
    status: 'active',
    created_date: '2024-01-15'
  },
  {
    id: '2',
    email: 'anujk3701@gmail.com',
    full_name: 'Anuj Kumar',
    role: 'user',
    employee_id: 'EMP002',
    code: 'APL_05',
    work_type: 'ONFIELD',
    assign_to: 'Vishal kumar srivastava',
    city: 'Bettiah',
    contact: '8052256423',
    division_department: 'Main',
    zone: 'Bihar',
    state: 'BIHAR',
    address: '',
    designation: 'MR',
    territory: 'Mumbai Central',
    region: 'West India',
    phone: '8052256423',
    manager_email: 'manager@medrepcrm.com',
    joining_date: '2024-01-20',
    date_of_birth: '1995-03-10',
    date_of_joining: '2024-01-20',
    status: 'active',
    created_date: '2024-01-20'
  },
  {
    id: '3',
    email: 'gopalprasad8012@gmail.com',
    full_name: 'GOPAL PRASAD',
    role: 'admin',
    employee_id: 'APLEMP0038',
    code: 'APLEMP0038',
    work_type: 'ONFIELD',
    assign_to: 'MANISH MASHRA',
    city: 'Munger',
    contact: '8809133396',
    division_department: 'Main',
    zone: 'Bihar',
    state: 'BIHAR',
    address: 'Near Girls High School Madhopour Basudeopur munger',
    designation: 'ASM',
    territory: 'Gujarat West',
    region: 'West India',
    phone: '8809133396',
    manager_email: 'director@medrepcrm.com',
    joining_date: '2024-02-01',
    date_of_birth: '1975-01-21',
    date_of_joining: '2024-02-01',
    status: 'active',
    created_date: '2024-02-01'
  },
  {
    id: '4',
    email: 'bharatwagalu@gmail.com',
    full_name: 'ATUL BHARATWALA',
    role: 'user',
    employee_id: 'APLEMP0033',
    code: 'APLEMP0033',
    work_type: 'ONFIELD',
    assign_to: 'GOPAL PRASAD',
    city: 'Lakhisarai',
    contact: '9523295353',
    division_department: 'Main',
    zone: 'Bihar Jharkhand',
    state: 'BIHAR',
    address: 's/o panchsand singh, po-sharma, lakhisarai',
    designation: 'MR',
    territory: 'Bangalore South',
    region: 'South India',
    phone: '9523295353',
    manager_email: 'manager@medrepcrm.com',
    joining_date: '2024-02-10',
    date_of_birth: '1977-05-11',
    date_of_joining: '2024-02-10',
    status: 'active',
    created_date: '2024-02-10'
  },
  {
    id: '5',
    email: 'nishukantha386@gmail.com',
    full_name: 'NISHKANT',
    role: 'user',
    employee_id: 'APLEMP0059',
    code: 'APLEMP0059',
    work_type: 'ONFIELD',
    assign_to: 'MANISH MASHRA',
    city: 'Bhagalpur',
    contact: '7992485542',
    division_department: 'Main',
    zone: 'Bihar',
    state: 'BIHAR',
    address: 'CO BALANANAD PRASAD SHIV BHAWAN COMPOUND POLICE LINE ROAD BHAGALPUR',
    designation: 'MR',
    territory: 'Chennai East',
    region: 'South India',
    phone: '7992485542',
    manager_email: 'director@medrepcrm.com',
    joining_date: '2024-02-15',
    date_of_birth: '1990-01-01',
    date_of_joining: '2024-02-15',
    status: 'active',
    created_date: '2024-02-15'
  },
  {
    id: '6',
    email: 'anandkmaurya8@gmail.com',
    full_name: 'ANAND KUMAR',
    role: 'user',
    employee_id: 'APLEMP0069',
    code: 'APLEMP0069',
    work_type: 'ONFIELD',
    assign_to: 'GOPAL PRASAD',
    city: 'Munger',
    contact: '7717793960',
    division_department: 'Main',
    zone: 'Bihar',
    state: 'BIHAR',
    address: 'POST-PRASANDOD PS-KHASAGPUR-MUNGER',
    designation: 'MR',
    territory: 'Kolkata Central',
    region: 'East India',
    phone: '7717793960',
    manager_email: 'manager@medrepcrm.com',
    joining_date: '2024-03-01',
    date_of_birth: '1990-10-01',
    date_of_joining: '2024-03-01',
    status: 'active',
    created_date: '2024-03-01'
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
      code: data.code,
      work_type: data.work_type || 'ONFIELD',
      assign_to: data.assign_to,
      city: data.city,
      contact: data.contact,
      division_department: data.division_department || 'Main',
      zone: data.zone,
      state: data.state,
      address: data.address,
      designation: data.designation,
      territory: data.territory,
      region: data.region,
      phone: data.phone,
      manager_email: data.manager_email,
      joining_date: data.joining_date,
      date_of_birth: data.date_of_birth,
      date_of_joining: data.date_of_joining,
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
  const headers = [
    'Code', 'Name', 'Work Type', 'Assign To', 'Email', 'City',
    'Contact', 'Division/Department', 'Zone', 'State', 'Address',
    'Designation', 'Date Of Birth', 'Date Of Joining', 'Status'
  ];
  const csvContent = [
    headers.join(','),
    ...data.map((item: any) => [
      item.code || '',
      item.full_name || '',
      item.work_type || '',
      item.assign_to || '',
      item.email || '',
      item.city || '',
      item.contact || '',
      item.division_department || '',
      item.zone || '',
      item.state || '',
      item.address || '',
      item.designation || '',
      item.date_of_birth || '',
      item.date_of_joining || '',
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
      code: e.code,
      full_name: e.full_name,
      work_type: e.work_type,
      assign_to: e.assign_to,
      email: e.email,
      city: e.city,
      contact: e.contact,
      division_department: e.division_department,
      zone: e.zone,
      state: e.state,
      address: e.address,
      designation: e.designation,
      date_of_birth: e.date_of_birth,
      date_of_joining: e.date_of_joining,
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
