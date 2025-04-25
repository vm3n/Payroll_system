
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveRequestPage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveType, setLeaveType] = useState('sick');
  useEffect(() => {
    fetchLeaveRequests();
  }, [apiUrl, token]);
  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/request/leaverequest`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaveRequests(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching leave requests:', err);
      setError(err);
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        start_date: startDate,
        end_date: endDate,
        leave_type: leaveType,
      };
      await axios.post(`${apiUrl}/request/leaverequests`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLeaveRequests();
      setStartDate('');
      setEndDate('');
      setLeaveType('sick');
    } catch (err) {
      console.error('Error submitting leave request:', err);
      setError(err);
    }
  };
  if (loading) return <div>Loading leave requests...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div style={{ padding: '20px' }}>
      <h2>Leave Requests</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label htmlFor="startDate">Start Date: </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date: </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="leaveType">Leave Type: </label>
          <select
            id="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="sick">Sick</option>
            <option value="vacation">Vacation</option>
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit">Submit Leave Request</button>
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
        <thead>
          <tr>
            <th>Leave ID</th>
            <th>Employee ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Leave Type</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request.leave_id}>
              <td style={{ padding: '8px' }}>{request.leave_id}</td>
              <td style={{ padding: '8px' }}>{request.employee_id}</td>
              <td style={{ padding: '8px' }}>{request.start_date}</td>
              <td style={{ padding: '8px' }}>{request.end_date}</td>
              <td style={{ padding: '8px' }}>{request.leave_type}</td>
              <td style={{ padding: '8px' }}>{request.status}</td>
              <td style={{ padding: '8px' }}>{request.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequestPage;
