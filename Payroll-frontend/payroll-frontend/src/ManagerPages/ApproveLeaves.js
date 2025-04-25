import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManagerNavbar from './ManagerNavBar';
const ManagerLeaveRequestsPage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/request/leaverequests/manager`, {
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

  useEffect(() => {
    fetchLeaveRequests();
  }, [apiUrl, token]);
  const handleApproval = async (leaveId, status) => {
    try {
      await axios.put(
        `${apiUrl}/request/leaverequest/${leaveId}/approval`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Leave request ${status}`);
      fetchLeaveRequests();
    } catch (err) {
      console.error('Error updating leave request:', err);
      alert('Error updating leave request');
    }
  };

  if (loading) return <div>Loading leave requests...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="admin-dashboard-container">
      <ManagerNavbar />
    <div style={{ padding: '20px' }}>
      <h2>Employee Leave Requests</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
        <thead>
          <tr>
            <th>Leave ID</th>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Leave Type</th>
            <th>Status</th>
            <th>Requested At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map(request => (
            <tr key={request.leave_id}>
              <td style={{ padding: '8px' }}>{request.leave_id}</td>
              <td style={{ padding: '8px' }}>{request.employee_id}</td>
              <td style={{ padding: '8px' }}>{request.full_name}</td>
              <td style={{ padding: '8px' }}>{request.email}</td>
              <td style={{ padding: '8px' }}>{request.start_date}</td>
              <td style={{ padding: '8px' }}>{request.end_date}</td>
              <td style={{ padding: '8px' }}>{request.leave_type}</td>
              <td style={{ padding: '8px' }}>{request.status}</td>
              <td style={{ padding: '8px' }}>{request.created_at}</td>
              <td style={{ padding: '8px' }}>
                {request.status === 'pending' && (
                  <>
                    <button
                      style={{ marginRight: '5px' }}
                      onClick={() => handleApproval(request.leave_id, 'approved')}
                    >
                      Approve
                    </button>
                    <button onClick={() => handleApproval(request.leave_id, 'rejected')}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ManagerLeaveRequestsPage;
