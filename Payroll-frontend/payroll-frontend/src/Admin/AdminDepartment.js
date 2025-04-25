
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../Admin/AdminNav';
import './AdminDepartment.css';

const AdminDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${apiUrl}/departments/empDepartCount`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setDepartments(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching departments:', err);
      setLoading(false);
    });
  }, [apiUrl, token]);

  if (loading) return <div>Loading departments...</div>;
  if (!departments.length) return <div>No departments found.</div>;

  return (
    <div className="admin-dashboard-container">
      <AdminNavbar />
    <div className="admin-departments">
      <h2>Departments</h2>
      <table className="departments-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>Employee Count</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.department_id}>
              <td>{dept.department_id}</td>
              <td>{dept.department_name}</td>
              <td>{dept.employee_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AdminDepartment;
