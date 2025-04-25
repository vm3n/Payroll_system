import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../Admin/AdminNav';
const GeneratePayroll = () => {
  const [payPeriodStart, setPayPeriodStart] = useState('');
  const [payPeriodEnd, setPayPeriodEnd] = useState('');
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!payPeriodStart || !payPeriodEnd) {
      alert('Please enter both start and end dates');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/data/payroll/generate`, {
        pay_period_start: payPeriodStart,
        pay_period_end: payPeriodEnd,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(response.data.message);
    } catch (err) {
      console.error('Error generating payroll:', err);
      alert('Failed to generate payroll.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="admin-dashboard-container">
      <AdminNavbar />
    <form onSubmit={handleSubmit}>
      <label>
        Pay Period Start:
        <input
          type="date"
          value={payPeriodStart}
          onChange={(e) => setPayPeriodStart(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Pay Period End:
        <input
          type="date"
          value={payPeriodEnd}
          onChange={(e) => setPayPeriodEnd(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Generating Payroll...' : 'Generate Payroll'}
      </button>
    </form>
    </div>
  );
};

export default GeneratePayroll;
