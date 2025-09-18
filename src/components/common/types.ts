// Shared type definitions for the CRM application
export interface Visit {
  id: string;
  doctor_id: string;
  doctor_name: string;
  visit_date: string;
  visit_time: string;
  visit_type: string;
  status: 'Planned' | 'Completed' | 'Missed' | 'Rescheduled';
  products_promoted: string[];
  notes: string;
  next_visit_date: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  clinic_name: string;
  address: string;
  territory: string;
  phone: string;
  email: string;
  potential: 'High' | 'Medium' | 'Low';
  notes: string;
  location_lat?: number;
  location_lng?: number;
  created_date?: string;
}

export interface Employee {
  id: string;
  email: string;
  full_name: string;
  role: string;
  employee_id?: string;
  designation?: string;
  territory?: string;
  region?: string;
  phone?: string;
  manager_email?: string;
  joining_date?: string;
  status: 'active' | 'inactive';
  created_date?: string;
}

export interface Expense {
  id: string;
  expense_type: string;
  amount: number;
  expense_date: string;
  description: string;
  doctor_visited?: string;
  receipt_url?: string; // Keep as optional string for consistency
  status: 'Pending' | 'Approved' | 'Rejected' | 'Reimbursed';
  territory?: string;
  created_by?: string;
  comments?: string;
  approved_by?: string;
  approved_date?: string;
  created_date?: string;
}

// Form Data Types (for submissions without id/created_date)
export interface VisitFormData extends Omit<Visit, 'id'> {}
export interface DoctorFormData extends Omit<Doctor, 'id' | 'created_date'> {}
export interface EmployeeFormData extends Omit<Employee, 'id' | 'created_date' | 'email' | 'role'> {}
// Fix ExpenseFormData to have consistent receipt_url typing
export interface ExpenseFormData extends Omit<Expense, 'id' | 'created_date' | 'created_by' | 'approved_by' | 'approved_date'> {
  receipt_url?: string; // Ensure consistent typing
}

// Visit Planning Component Props
export interface CalendarViewProps {
  visits: Visit[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onEditVisit: (visit: Visit) => void;
}

export interface ListViewProps {
  visits: Visit[];
  onEditVisit: (visit: Visit) => void;
  isLoading?: boolean;
}

export interface RouteViewProps {
  visits: Visit[];
  selectedDate: Date;
}

export interface VisitFormProps {
  visit?: Visit | null;
  doctors: Doctor[];
  onSubmit: (visit: VisitFormData) => void;
  onCancel: () => void;
}

// Doctor Database Component Props
export interface DoctorListProps {
  doctors: Doctor[];
  isLoading: boolean;
  onEdit: (doctor: Doctor) => void;
  onDelete: (doctorId: string) => void;
}

export interface DoctorFormProps {
  doctor?: Doctor | null;
  onSubmit: (doctor: DoctorFormData) => void;
  onCancel: () => void;
}

// Employee Management Component Props
export interface EmployeeListProps {
  employees: Employee[];
  isLoading: boolean;
  onEdit: (employee: Employee) => void;
}

export interface AddEmployeeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void | Promise<void>; // Add onSuccess callback
}

export interface EditEmployeeFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee | null;
  onUpdate: () => void;
}

// Expense Management Component Props
export interface ExpenseListProps {
  expenses: Expense[];
  isLoading: boolean;
  userRole?: string;
  onEdit: (expense: Expense) => void;
  onStatusUpdate: (expense: Expense, newStatus: string, comments: string) => void;
}

export interface ExpenseFormProps {
  expense?: Expense | null;
  onSubmit: (expenseData: ExpenseFormData, receiptFile?: File | null) => void;
  onCancel: () => void;
}

// Page Component Props
export interface VisitPlanningPageProps {
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

export interface DoctorDatabasePageProps {
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

export interface EmployeesPageProps {
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

export interface ExpensesPageProps {
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

// Leave Request Types
export interface LeaveRequest {
  id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  total_days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  territory?: string;
  created_by?: string;
  manager_comments?: string;
  approved_by?: string;
  approved_date?: string;
  created_date?: string;
}

// Form Data Types for Leave Request
export interface LeaveRequestFormData extends Omit<LeaveRequest, 'id' | 'created_date' | 'created_by' | 'approved_by' | 'approved_date' | 'status'> {}

// Leave Management Component Props
export interface LeaveListProps {
  requests: LeaveRequest[];
  isLoading: boolean;
  userRole?: string;
  onStatusUpdate: (request: LeaveRequest, newStatus: string, comments: string) => void;
}

export interface LeaveFormProps {
  onSubmit: (leaveData: LeaveRequestFormData) => void;
  onCancel: () => void;
}

export interface HRPageProps {
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}
