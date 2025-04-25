
import React from 'react';
import { Link } from 'react-router-dom';
import '../Admin/AdminNav.css';

const ManagerNavBar = () => {
  return (
    <nav className="admin-navbar">
      <div className="navbar-brand">
        <Link to="/manager">Manager Dashboard</Link>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/manager/employees">Employees</Link></li>
        <li><Link to="/manager/manager-leaves">Leaves Approve</Link></li>
      </ul>
    </nav>
  );
};

export default ManagerNavBar;
