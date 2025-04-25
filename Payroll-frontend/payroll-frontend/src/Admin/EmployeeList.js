
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmployeeList.css';
import AdminNavbar from '../Admin/AdminNav';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      username: employee.username,
      email: employee.email,
      full_name: employee.full_name,
      department_id: employee.department_id,
      manager_id: employee.manager_id || '',
      mobile_number: employee.mobile_number || '',
      date_of_birth: employee.date_of_birth || '',
      address: employee.address || '',
      hire_date: employee.hire_date || '',
    });
  };
  const handleAddEmployee = () => {

    // Perform any actions if necessary, then navigate:
    navigate('/register');
  };
  const handlePayrollView = (employeeId) => {
    console.log('Navigating to payroll for employeeId:', employeeId);
    navigate(`/payrollview/${employeeId}`);
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/data/${editingEmployee.employee_id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.confirm('Employee updated successfully');
      const res = await axios.get(`${apiUrl}/data/getAll`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data);
      setEditingEmployee(null);
    } catch (err) {
      console.error('Error updating employee:', err);
      alert('Failed to update employee.');
    }
  };


  const handleDelete = async (employeeId) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await axios.delete(`${apiUrl}/data/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEmployees(employees.filter(emp => emp.employee_id !== employeeId));
    } catch (err) {
      console.error('Error deleting employee:', err);
      alert('Failed to delete employee.');
    }
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/data/admin/getAll`, {
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
  }, [apiUrl, token]);

  if (loading) return <div>Loading employees...</div>;
  if (!employees.length) return <div>No employees found.</div>;

  return (
    <div className="admin-dashboard-container">
      <AdminNavbar />
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
            <th>Manager ID</th>
            <th>Actions</th>
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
              <td>{emp.manager_id ? emp.manager_id : '-'}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button onClick={() => handleDelete(emp.employee_id)}>Delete</button>
                <button onClick={() => handlePayrollView(emp.employee_id)}>View Payroll</button>
              </td>
            </tr>
          ))}
        </tbody>
        <br>
        </br>
        <button onClick={handleAddEmployee}>Add New Employee</button>
      </table>


      {editingEmployee && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Employee</h3>
            <form onSubmit={handleUpdate}>
              <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </label>
              <label>
                Full Name:
                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
              </label>
              <label>
                Department ID:
                <input type="number" name="department_id" value={formData.department_id} onChange={handleChange} required />
              </label>
              <label>
                Manager ID:
                <input type="number" name="manager_id" value={formData.manager_id} onChange={handleChange} />
              </label>
              <label>
                Mobile Number:
                <input type="text" name="mobile_number" value={formData.mobile_number} onChange={handleChange} />
              </label>
              <label>
                Date of Birth:
                <input type="date" name="date_of_birth" value={formData.date_of_birth ? new Date(formData.date_of_birth).toISOString().split('T')[0] : ''} onChange={handleChange} />
              </label>
              <label>
                Address:
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
              </label>
              <label>
                Hire Date:
                <input type="date" name="hire_date" value={formData.hire_date ? new Date(formData.hire_date).toISOString().split('T')[0] : ''} required  onChange={handleChange} />
              </label>
              <div className="modal-actions">
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditingEmployee(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default EmployeeList;
