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
  registration_number?: string;
  doctor_code?: string;
  city?: string;
  hospital_name?: string;
  employee_name?: string;
  immediate_senior?: string;
  contact_no?: string;
  qualification?: string;
  division?: string;
  category?: string;
  zone?: string;
  gender?: string;
  date_of_birth?: string;
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
  code?: string;
  work_type?: string;
  assign_to?: string;
  city?: string;
  contact?: string;
  division_department?: string;
  zone?: string;
  state?: string;
  address?: string;
  date_of_birth?: string;
  date_of_joining?: string;
  gender?: string;
  marital_status?: string;
  anniversary?: string;
  alternate_contact?: string;
  permanent_address?: string;
  postal_code?: string;
  additional_division?: string;
  qualification?: string;
  aadhar_number?: string;
  pan_number?: string;
  pf_number?: string;
  esc_number?: string;
  pf_uan_number?: string;
  license_number?: string;
  license_expiry?: string;
  blood_group?: string;
  da_ex?: number;
  da_out?: number;
  da_rhq?: number;
  da_transit?: number;
  da_other?: number;
  account_holder_name?: string;
  account_number?: string;
  ifsc_number?: string;
  beneficiary_id?: string;
  bank_name?: string;
  branch_name?: string;
  nominee_name?: string;
  annual_income?: number;
}

export interface Expense {
  id: string;
  expense_type: string;
  amount: number;
  expense_date: string;
  description: string;
  doctor_visited?: string;
  receipt_url?: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Reimbursed';
  territory?: string;
  created_by?: string;
  comments?: string;
  approved_by?: string;
  approved_date?: string;
  created_date?: string;
}

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

export interface Holiday {
  id: string;
  zone: string;
  date: string;
  occasion: string;
  type: 'public' | 'restricted';
  created_date?: string;
}

export interface TourPlan {
  id: string;
  employee_name: string;
  designation: string;
  month: string;
  year?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approved_by?: string;
  approved_date?: string;
  planned_dates: string[];
  deviated_dates?: string[];
  created_date?: string;
  whole_month_tour_plan?: string;
}

// Form Data Interfaces
export interface VisitFormData extends Omit<Visit, 'id'> {}

export interface DoctorFormData extends Omit<Doctor, 'id' | 'created_date'> {
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
  registration_number?: string;
  doctor_code?: string;
  city?: string;
  hospital_name?: string;
  employee_name?: string;
  immediate_senior?: string;
  contact_no?: string;
  qualification?: string;
  division?: string;
  category?: string;
  zone?: string;
  gender?: string;
  date_of_birth?: string;
}

export interface EmployeeFormData extends Omit<Employee, 'id' | 'created_date' | 'email' | 'role'> {}

export interface ExpenseFormData extends Omit<Expense, 'id' | 'created_date' | 'created_by' | 'approved_by' | 'approved_date'> {
  receipt_url?: string;
}

export interface LeaveRequestFormData extends Omit<LeaveRequest, 'id' | 'created_date' | 'created_by' | 'approved_by' | 'approved_date' | 'status'> {}

export interface HolidayFormData extends Omit<Holiday, 'id' | 'created_date'> {
  zone: string;
  date: string;
  occasion: string;
  type: 'public' | 'restricted';
}

// Component Props Interfaces
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

export interface DoctorFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  doctor?: Doctor | null;
  onSubmit: (data: DoctorFormData) => void;
  title: string;
  submitButtonText: string;
}

export interface EmployeeListProps {
  employees: Employee[];
  isLoading: boolean;
  onEdit: (employee: Employee) => void;
  onDelete?: (id: string) => void;
}

export interface AddEmployeeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void | Promise<void>;
}

export interface EditEmployeeFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee | null;
  onUpdate: () => void;
}

export interface EmployeeFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee | null;
  onSuccess: () => void;
  title: string;
  submitButtonText: string;
}

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

export interface HolidayListProps {
  holidays: Holiday[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export interface TourPlanListProps {
  tourPlans: TourPlan[];
  isLoading: boolean;
  onViewApproval: () => void;
}

// Page Props Interfaces
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

export interface HRPageProps {
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

export interface HolidaysPageProps {
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

// Tab Props Interfaces
export interface PersonalInfoTabProps {
  formData: Partial<Employee>;
  onInputChange: (field: string, value: string | number) => void;
}

export interface ContactInfoTabProps {
  formData: Partial<Employee>;
  onInputChange: (field: string, value: string | number) => void;
}

export interface WorkInfoTabProps {
  formData: Partial<Employee>;
  onInputChange: (field: string, value: string | number) => void;
}

export interface OtherInfoTabProps {
  formData: Partial<Employee>;
  onInputChange: (field: string, value: string | number) => void;
}

export interface AccountInfoTabProps {
  formData: Partial<Employee>;
  onInputChange: (field: string, value: string | number) => void;
}

export interface DoctorBasicInfoTabProps {
  formData: Partial<DoctorFormData>;
  onInputChange: (field: string, value: string | number) => void;
}

export interface DoctorContactInfoTabProps {
  formData: Partial<DoctorFormData>;
  onInputChange: (field: string, value: string | number) => void;
}

export interface DoctorProfessionalInfoTabProps {
  formData: Partial<DoctorFormData>;
  onInputChange: (field: string, value: string | number) => void;
}

export interface TourPlanFormData {
  employee_name: string;
  designation: string;
  month: string;
  year: string;
  planned_dates: string[];
  deviated_dates?: string[];
  whole_month_tour_plan?: string;
}

export interface TourPlanApprovalListProps {
  tourPlans: TourPlan[];
  isLoading: boolean;
  onBack: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export interface AddTourPlanModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TourPlanFormData) => void;
}

export interface ViewTourPlanModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tourPlan: TourPlan;
}

export interface TourPlanListProps {
  tourPlans: TourPlan[];
  isLoading: boolean;
  onViewApproval: () => void;
  onAddTourPlan: () => void;
}

export interface ApproveTourPlanModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tourPlans: TourPlan[];
  onView: (plan: TourPlan) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}
