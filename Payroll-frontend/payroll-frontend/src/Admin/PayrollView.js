
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PayrollView = () => {
  const { employeeId } = useParams();
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!employeeId) {
      console.error("No employeeId found in URL.");
      setLoading(false);
      return;
    }
    axios
      .get(`${apiUrl}/data/payroll/employee/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPayroll(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching payroll details:', err);
        setLoading(false);
      });
  }, [apiUrl, token, employeeId]);

  if (loading) return <div>Loading payroll data...</div>;
  if (!payroll) return <div>No payroll record found for Employee ID: {employeeId}</div>;

  return (
    <div>
      <h2>Payroll Details for Employee ID: {employeeId}</h2>
      {Array.isArray(payroll) ? (
        payroll.map((record) => (
          <div key={record.payroll_id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '0.5rem' }}>
            <p><strong>Gross Salary:</strong> {record.gross_salary}</p>
            <p><strong>Income Tax:</strong> {record.income_tax}</p>
            <p><strong>Health Insurance:</strong> {record.health_insurance}</p>
            <p><strong>401k:</strong> {record.k401}</p>
            <p><strong>SSN Tax:</strong> {record.ssn_tax}</p>
            <p><strong>Net Salary:</strong> {record.net_salary}</p>
            <p><strong>Pay Period:</strong> {record.pay_period_start} to {record.pay_period_end}</p>
          </div>
        ))
      ) : (
        <div>
          <p><strong>Gross Salary:</strong> {payroll.gross_salary}</p>
          <p><strong>Income Tax:</strong> {payroll.income_tax}</p>
          <p><strong>Health Insurance:</strong> {payroll.health_insurance}</p>
          <p><strong>401k:</strong> {payroll.k401}</p>
          <p><strong>SSN Tax:</strong> {payroll.ssn_tax}</p>
          <p><strong>Net Salary:</strong> {payroll.net_salary}</p>
          <p><strong>Pay Period:</strong> {payroll.pay_period_start} to {payroll.pay_period_end}</p>
        </div>
      )}
    </div>
  );
};

export default PayrollView;
