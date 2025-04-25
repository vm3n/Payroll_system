
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ManagerNavbar from './ManagerNavBar';
import axios from 'axios';

const ManagerDashboard = () => {
  const [managerProfile, setManagerProfile] = useState(null);
  const [manager, setManager] = useState(null);
  const [departmentName, setdepartmentName] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/data/manager-data`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setManagerProfile(res.data.profile);
      setManager(res.data.manager);
      setdepartmentName(res.data.departmentName);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching admin data:', err);
      setLoading(false);
    });
  }, [apiUrl, token]);

  if (loading) return <div>Loading admin data...</div>;
  if (!managerProfile) return <div>No admin data found.</div>;

  return (
    <div className="admin-dashboard-container">
      <ManagerNavbar />
      <div className="manager-dashboard-content" style={{ padding: '1rem' }}></div>
      <div className="admin-dashboard-content">
        <h2>Welcome, {managerProfile.full_name}</h2>
        <div className="profile-container">
        <div className="profile-left">
        <div className="employee-card">
          <h2 className="employee-name">{managerProfile.full_name}</h2>
          <p className="employee-position">{managerProfile.role || 'employee'}</p>
          <p className="employee-location">{managerProfile.address || 'Nashville, TN'}</p>
        </div>


        <div className="manager-card">
          <h3>Manager Details</h3>
          {manager ? (
            <>
              <p><strong>Name:</strong> {manager.full_name}</p>
              <p><strong>Email:</strong> {manager.email}</p>
            </>
          ) : (
            <p>No manager assigned.</p>
          )}
        </div>
      </div>

      <div className="profile-right">
        <div className="personal-details">
          <div className="details-header">
            <h3>Personal Details</h3>
          </div>
          <div className="details-body">
            <p><strong>Full Name:</strong> {managerProfile.full_name}</p>
            <p><strong>Position:</strong> {managerProfile.role}</p>
            <p><strong>Date of Birth:</strong> {managerProfile.date_of_birth}</p>
            <p><strong>Address:</strong> {managerProfile.address}</p>
            <p><strong>Mobile Number:</strong> {managerProfile.mobile_number}</p>
            <p><strong>Email:</strong> {managerProfile.email}</p>
            <p><strong>Department ID:</strong> {managerProfile.department_id}</p>
            <p><strong>Department Name:</strong> {departmentName}</p>
            <p><strong>Hire Date:</strong> {managerProfile.hire_date}</p>
          </div>
        </div>

        <div className="additional-info">
          <h3>Salary</h3>
          <p><strong>Base Salary:</strong> {managerProfile.salary}</p>
        </div>
        </div>
        </div>
        </div>
      <Outlet />

    </div>
  );
};

export default ManagerDashboard;
