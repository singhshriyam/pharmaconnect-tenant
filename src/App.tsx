import React, { useState } from 'react';
import AdminDashboardPage from './pages/DashboardPage';
import VisitPlanningPage from './pages/VisitPlanningPage';
import DoctorDatabasePage from './pages/DoctorDatabasePage';
import EmployeesPage from './pages/EmployeesPage';
import ExpensesPage from './pages/ExpensesPage';
import HRLeavePage from './pages/HRLeavePage';
import HolidaysPage from './pages/HolidaysPage';

function App() {
  const [currentPage, setCurrentPage] = useState('admin-dashboard');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout clicked');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'admin-dashboard':
        return (
          <AdminDashboardPage
            onLogout={handleLogout}
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />
        );
      case 'visit-planning':
        return (
          <VisitPlanningPage
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        );
      case 'doctor-database':
        return (
          <DoctorDatabasePage
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        );
      case 'employees':
        return (
          <EmployeesPage
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        );
      case 'expenses':
        return (
          <ExpensesPage
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        );
      case 'hr-leave':
        return (
          <HRLeavePage
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        );
      case 'holidays':
        return (
          <HolidaysPage
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <AdminDashboardPage
            onLogout={handleLogout}
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  );
}

export default App;
