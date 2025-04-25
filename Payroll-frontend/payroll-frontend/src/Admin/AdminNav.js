import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNav.css';

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="navbar-brand">
        <Link to="/admin">Admin Dashboard</Link>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/admin/employees">Employees</Link></li>
        <li><Link to="/admin/departments">Departments</Link></li>
        <li><Link to="/admin/payroll">Payroll</Link></li>
        <li><Link to="/admin/auditLog">Audit Logs</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
