import {jwtDecode} from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManagerNavbar from './ManagerNavBar';
const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');


  let managerId;
  try {
    const decoded = jwtDecode(token);
    if (decoded.role === 'manager') {
      managerId = decoded.manager_id|| decoded.employeeId;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
  }

  useEffect(() => {
    if (!managerId) {
        console.error('No manager ID found.');
        setLoading(false);
        return;
      }
    axios
      .get(`${apiUrl}/data/${managerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching employees:', err);
        setLoading(false);
      });
  }, [apiUrl, token, managerId]);
  console.log(managerId);
  console.log(token);
  console.log(apiUrl);

  if (loading) return <div>Loading employees...</div>;
  if (!employees.length) return <div>No employees found.</div>;

  return (
    <div className="admin-dashboard-container">
      <ManagerNavbar />
    <div className="admin-employees">
      <h2>Employees List</h2>
      <table className="employees-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department ID</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.employee_id}>
              <td>{emp.employee_id}</td>
              <td>{emp.username}</td>
              <td>{emp.full_name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>{emp.department_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default EmployeeManager;
