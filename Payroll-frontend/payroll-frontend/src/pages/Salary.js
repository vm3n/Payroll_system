// src/pages/SalaryPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SalaryPage = () => {
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`${apiUrl}/data/salary/empSalary`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSalary(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching salary details:', err);
        setLoading(false);
      });
  }, [apiUrl, token]);

  if (loading) return <div>Loading salary details...</div>;
  if (!salary) return <div>No salary details found.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Salary Details</h2>
      <div>
        <p><strong>Gross Salary:</strong> {salary.gross_salary}</p>
        <p><strong>Income Tax:</strong> {salary.income_tax}</p>
        <p><strong>Health Insurance:</strong> {salary.health_insurance}</p>
        <p><strong>401k:</strong> {salary.k401}</p>
        <p><strong>SSN Tax:</strong> {salary.ssn_tax}</p>
        <p><strong>Net Salary:</strong> {salary.net_salary}</p>
        <p>
          <strong>Pay Period:</strong> {salary.pay_period_start} to {salary.pay_period_end}
        </p>
      </div>
    </div>
  );
};

export default SalaryPage;
