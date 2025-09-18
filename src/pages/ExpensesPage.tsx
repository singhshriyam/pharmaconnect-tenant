import React, { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";

import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";
import Sidebar from "../components/dashboard/Sidebar";

// Import ALL types from centralized location - NO local interfaces
import { Expense, ExpenseFormData, ExpensesPageProps } from "../components/common/types";

// Mock user data
const mockUser = {
  id: '1',
  email: 'user@medrepcrm.com',
  full_name: 'John Doe',
  role: 'admin', // Change to 'user' to test regular user view
  territory: 'Delhi North'
};

// In-memory storage for mock data (this will actually persist during the session)
let mockExpenses: Expense[] = [
  {
    id: '1',
    expense_type: 'Travel',
    amount: 250.00,
    expense_date: '2024-09-15',
    description: 'Travel to client meeting in Mumbai',
    doctor_visited: 'Dr. Rajesh Kumar',
    receipt_url: 'https://example.com/receipt1.pdf',
    status: 'Pending',
    territory: 'Delhi North',
    created_by: 'user@medrepcrm.com',
    created_date: '2024-09-15'
  },
  {
    id: '2',
    expense_type: 'Meals',
    amount: 75.50,
    expense_date: '2024-09-14',
    description: 'Business lunch with Dr. Priya Sharma',
    doctor_visited: 'Dr. Priya Sharma',
    receipt_url: 'https://example.com/receipt2.pdf',
    status: 'Approved',
    territory: 'Delhi North',
    created_by: 'user@medrepcrm.com',
    approved_by: 'manager@medrepcrm.com',
    approved_date: '2024-09-16',
    comments: 'Approved by manager',
    created_date: '2024-09-14'
  },
  {
    id: '3',
    expense_type: 'Fuel',
    amount: 120.00,
    expense_date: '2024-09-13',
    description: 'Fuel for field visits in territory',
    status: 'Reimbursed',
    territory: 'Delhi North',
    created_by: 'user@medrepcrm.com',
    approved_by: 'manager@medrepcrm.com',
    approved_date: '2024-09-15',
    comments: 'Reimbursed via bank transfer',
    created_date: '2024-09-13'
  },
  {
    id: '4',
    expense_type: 'Accommodation',
    amount: 450.00,
    expense_date: '2024-09-12',
    description: 'Hotel stay for conference in Bangalore',
    status: 'Rejected',
    territory: 'Delhi North',
    created_by: 'user@medrepcrm.com',
    approved_by: 'manager@medrepcrm.com',
    approved_date: '2024-09-16',
    comments: 'Exceeded accommodation policy limit',
    created_date: '2024-09-12'
  },
  {
    id: '5',
    expense_type: 'Marketing',
    amount: 180.00,
    expense_date: '2024-09-11',
    description: 'Promotional materials for doctor visits',
    status: 'Pending',
    territory: 'Delhi North',
    created_by: 'user@medrepcrm.com',
    created_date: '2024-09-11'
  }
];

// Mock API functions that actually modify the mock data
const ExpenseAPI = {
  list: async (sort?: string): Promise<Expense[]> => {
    console.log('Loading expenses from mock storage:', mockExpenses.length);
    return [...mockExpenses];
  },

  create: async (data: ExpenseFormData): Promise<Expense> => {
    console.log('Creating expense:', data);
    const newExpense: Expense = {
      ...data,
      id: Date.now().toString(),
      created_by: mockUser.email,
      created_date: new Date().toISOString().split('T')[0]
    };

    // Actually add to the mock storage
    mockExpenses.unshift(newExpense); // Add to beginning
    console.log('Added expense. Total expenses:', mockExpenses.length);

    return newExpense;
  },

  update: async (id: string, data: Partial<Expense>): Promise<Expense> => {
    console.log('Updating expense:', id, data);

    // Find and update the expense in mock storage
    const expenseIndex = mockExpenses.findIndex(exp => exp.id === id);
    if (expenseIndex === -1) {
      throw new Error(`Expense with id ${id} not found`);
    }

    // Update the expense
    mockExpenses[expenseIndex] = {
      ...mockExpenses[expenseIndex],
      ...data
    };

    console.log('Updated expense:', mockExpenses[expenseIndex]);
    return mockExpenses[expenseIndex];
  },

  filter: async (filters: any, sort?: string): Promise<Expense[]> => {
    const allExpenses = await ExpenseAPI.list(sort);
    return allExpenses.filter(expense =>
      filters.created_by ? expense.created_by === filters.created_by : true
    );
  }
};

// Mock file upload function
const uploadFile = async (file: File): Promise<{ file_url: string }> => {
  console.log('Uploading file:', file.name);
  // Simulate file upload
  return { file_url: `https://example.com/receipts/${file.name}` };
};

const ExpensesPage: React.FC<ExpensesPageProps> = ({ onLogout, onNavigate }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [user] = useState(mockUser); // In real app, this would come from auth context
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [activeTab, setActiveTab] = useState('pending');

  // Use useCallback to memoize the loadData function
  const loadData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Managers see all expenses in their territory, reps see their own
      const expenseData = user.role === 'admin'
        ? await ExpenseAPI.list("-expense_date")
        : await ExpenseAPI.filter({ created_by: user.email }, "-expense_date");

      setExpenses(expenseData);
    } catch (error) {
      console.error("Failed to load expenses:", error);
    }
    setIsLoading(false);
  }, [user.role, user.email]); // Add dependencies

  useEffect(() => {
    loadData();
  }, [loadData]); // Include loadData in dependency array

  const handleEdit = (expense: Expense): void => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleSubmit = async (expenseData: ExpenseFormData, receiptFile?: File | null): Promise<void> => {
    try {
      let receipt_url = expenseData.receipt_url || null;
      if (receiptFile) {
        const { file_url } = await uploadFile(receiptFile);
        receipt_url = file_url;
      }

      const finalData: ExpenseFormData = {
        ...expenseData,
        receipt_url: receipt_url || '', // Ensure consistent type (string)
        territory: user.territory
      };

      if (editingExpense) {
        await ExpenseAPI.update(editingExpense.id, finalData);
      } else {
        await ExpenseAPI.create(finalData);
      }
      setShowForm(false);
      setEditingExpense(null);
      await loadData();
    } catch (error) {
      console.error("Failed to save expense:", error);
    }
  };

  const handleStatusUpdate = async (expense: Expense, newStatus: string, comments: string): Promise<void> => {
    try {
      console.log('Updating expense status:', { id: expense.id, newStatus, comments });
      const updatedExpense = await ExpenseAPI.update(expense.id, {
        status: newStatus as Expense['status'],
        comments,
        approved_by: user.email,
        approved_date: new Date().toISOString().split('T')[0]
      });
      console.log('Updated expense:', updatedExpense);
      await loadData();
    } catch (error) {
      console.error("Failed to update expense status:", error);
    }
  };

  const getFilteredExpenses = (status: string) => {
    return expenses.filter(e => e.status.toLowerCase() === status.toLowerCase());
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        onLogout={onLogout}
        currentPage="expenses"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Expense Management</h1>
                <p className="text-blue-600 mt-1">Log and track your work-related expenses</p>
              </div>
              <button
                onClick={() => {
                  setEditingExpense(null);
                  setShowForm(true);
                }}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Log New Expense
              </button>
            </div>

            {/* Expense Form */}
            {showForm && (
              <div className="mb-8 bg-white rounded-xl shadow-lg border p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {editingExpense ? 'Edit Expense' : 'Log New Expense'}
                </h3>
                <ExpenseForm
                  expense={editingExpense}
                  onSubmit={handleSubmit}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            )}

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                {['pending', 'approved', 'rejected', 'reimbursed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors capitalize ${
                      activeTab === tab
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Expense List */}
            <ExpenseList
              expenses={getFilteredExpenses(activeTab)}
              isLoading={isLoading}
              userRole={user?.role}
              onEdit={handleEdit}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
