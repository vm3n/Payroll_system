
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../Admin/AdminNav';
import axios from 'axios';

const AdminDashboard = () => {
  const [adminProfile, setAdminProfile] = useState(null);
  const [manager, setManager] = useState(null);
  const [departmentName, setdepartmentName] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/data/admin-data`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setAdminProfile(res.data.profile);
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
  if (!adminProfile) return <div>No admin data found.</div>;

  return (
    <div className="admin-dashboard-container">
      <AdminNavbar />
      <div className="admin-dashboard-content">
        <h2>Welcome, {adminProfile.full_name}</h2>
        <div className="profile-container">
        <div className="profile-left">
        <div className="employee-card">
          <h2 className="employee-name">{adminProfile.full_name}</h2>
          <p className="employee-position">{adminProfile.role || 'employee'}</p>
          <p className="employee-location">{adminProfile.address || 'Nashville, TN'}</p>
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
            <p><strong>Full Name:</strong> {adminProfile.full_name}</p>
            <p><strong>Position:</strong> {adminProfile.role}</p>
            <p><strong>Date of Birth:</strong> {adminProfile.date_of_birth}</p>
            <p><strong>Address:</strong> {adminProfile.address}</p>
            <p><strong>Mobile Number:</strong> {adminProfile.mobile_number}</p>
            <p><strong>Email:</strong> {adminProfile.email}</p>
            <p><strong>Department ID:</strong> {adminProfile.department_id}</p>
            <p><strong>Department Name:</strong> {departmentName}</p>
            <p><strong>Hire Date:</strong> {adminProfile.hire_date}</p>
          </div>
        </div>

        <div className="additional-info">
          <h3>Salary</h3>
          <p><strong>Base Salary:</strong> {adminProfile.salary}</p>
        </div>
        </div>
        </div>
        </div>
      <Outlet />

    </div>
  );
};

export default AdminDashboard;
