import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './Login/Login';
import Register from './pages/Register';
import AdminDashboard from './Admin/AdminDashboard';
import AdminDepartment from './Admin/AdminDepartment';
import ManagerDashboard from './ManagerPages/ManagerDashboard';
import EmployeeDashboard from './EmployeeDashboard/EmployeeDashboard';
import EmployeeList from './Admin/EmployeeList';
import EmployeeManager from './ManagerPages/Employee_Manager';
import ProtectedRoute from './components/ProtectedRoute';
import PayrollView from './Admin/PayrollView';
import SalaryPage from './pages/Salary';
import AuditLogPage from './Admin/Auditlog';
import GeneratePayroll from './Admin/GeneratePayroll';
import LeaveRequestPage from './pages/Leaves';
import ManagerLeaveRequestsPage from './ManagerPages/ApproveLeaves';
import Navigation from './components/Navigation';
import AttendancePage from './pages/AttendancePage'

const AppLayout = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const hideNav = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {token && !hideNav && <Navigation />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/departments"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDepartment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <EmployeeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payroll"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <GeneratePayroll />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/auditlog"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AuditLogPage />
            </ProtectedRoute>
          }
        />
        <Route path="/payrollview/:employeeId" element={<PayrollView />} />
        <Route
          path="/manager/*"
          element={
            <ProtectedRoute allowedRoles={['manager']}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/employees"
          element={
            <ProtectedRoute allowedRoles={['manager']}>
              <EmployeeManager />
            </ProtectedRoute>
          }
        />
        <Route path="/manager/manager-leaves" element={<ManagerLeaveRequestsPage />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/leaves"
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <LeaveRequestPage />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/dashboard/salary" element={<SalaryPage />} /> */}
        <Route path="/leave-requests" element={<LeaveRequestPage />} />
        <Route path="/salary" element={<SalaryPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
