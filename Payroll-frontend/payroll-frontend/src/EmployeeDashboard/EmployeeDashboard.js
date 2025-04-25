
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeProfile from './EmployeeProfile';
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState(null);
  const [manager, setManager] = useState(null);
  const [departmentName, setdepartmentName] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();

  useEffect(() => {
    axios.get(`${apiUrl}/data/employee-data`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setEmployee(res.data.profile);
      setManager(res.data.manager);
      setdepartmentName(res.data.departmentName);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching employee data:', err);
      setLoading(false);
    });
  }, [apiUrl, token]);

  if (loading) return <div>Loading...</div>;
  if (!employee) return <div>No employee data found.</div>;
  const isChildRouteActive = location.pathname !== '/dashboard';

  return (
    <div>
      <Navbar />
      {!isChildRouteActive && (
        <>
          <EmployeeProfile
            employee={employee}
            manager={manager}
            departmentName={departmentName}
          />

        </>
      )}
      <Outlet />
    </div>
  );
};


export default EmployeeDashboard;
