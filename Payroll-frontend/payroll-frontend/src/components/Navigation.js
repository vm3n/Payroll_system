
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E90FF',
    padding: '10px 20px',
    color: '#fff'
  }}>
    <div>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px', fontWeight: 'bold', fontSize: '22px'}}>
        Payroll System
      </Link>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Link to="/leave-requests" style={{ color: '#fff', textDecoration: 'none', marginRight: '15px' }}>
        Leave Requests
      </Link>
      <Link to="/salary" style={{ color: '#fff', textDecoration: 'none', marginRight: '15px' }}>
        Salary
      </Link>
      <Link to="/attendance" style={{ color: '#fff', textDecoration: 'none', marginRight: '15px'}}>
        Attendance
      </Link>
      <Link to="/logout" style={{ color: '#fff', textDecoration: 'none'}}>
      Logout
      </Link>
    </div>
  </nav>
);

export default Navigation;
