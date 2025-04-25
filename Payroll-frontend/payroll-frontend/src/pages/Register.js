
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DepartmentSelect from './department';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    role: 'employee',
    full_name: '',
    department_id: '',
    manager_id: '',
    salary: '',
    hire_date: '',
    mobile_number: '',
    date_of_birth: '',
    address: ''
  });
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/auth/register`, form, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Registration response:", res.data);
      alert('Registration successful. Employee ID: ' + res.data.employeeId);
      navigate('/login');
    } catch (err) {
      console.error("Registration error:", err);
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Register Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="register-input"
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
        />
        <select
          className="register-input"
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <DepartmentSelect
          value={form.department_id}
          onChange={handleChange}
        />
        <input
          className="register-input"
          type="number"
          name="manager_id"
          placeholder="Manager ID (optional)"
          value={form.manager_id}
          onChange={handleChange}
        />
        <input
          className="register-input"
          type="number"
          step="0.01"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          required
        />
        <label htmlFor="hire_date">Hire Date (e.g., MM/DD/YYYY):</label>
        <input
          className="register-input"
          type="date"
          name="hire_date"
          placeholder="Hire Date"
          value={form.hire_date}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="text"
          name="mobile_number"
          placeholder="Mobile Number"
          value={form.mobile_number}
          onChange={handleChange}
        />
        <label htmlFor="date_of_birth">Date of Birth (e.g., MM/DD/YYYY):</label>
        <input
          className="register-input"
          type="date"
          name="date_of_birth"
          placeholder="Date of Birth"
          value={form.date_of_birth}
          onChange={handleChange}
        />
        <textarea
          className="register-input"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        ></textarea>
        <button className="register-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
