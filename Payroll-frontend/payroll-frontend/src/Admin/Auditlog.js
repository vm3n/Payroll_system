import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../Admin/AdminNav';

const AuditLogPage = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${apiUrl}/audit/auditlogs`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setAuditLogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching audit logs:', err);
        setError(err);
        setLoading(false);
      });
  }, [apiUrl, token]);

  if (loading) return <div>Loading audit logs...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="admin-dashboard-container">
      <AdminNavbar />
      <div className="admin-dashboard-content">
        <h2>Audit Logs</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Audit ID</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Employee ID</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Action</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Details</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Created At</th>
            </tr>
          </thead>
          <tbody>
  {auditLogs.map((log) => (
    <tr key={log.audit_id}>
      <td style={{ border: '1px solid #ccc', padding: '8px' }}>{log.audit_id}</td>
      <td style={{ border: '1px solid #ccc', padding: '8px' }}>{log.employee_id}</td>
      <td style={{ border: '1px solid #ccc', padding: '8px' }}>{log.action}</td>
      <td style={{ border: '1px solid #ccc', padding: '8px' }}>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0 }}>
          {(() => {
            try {
              const detailsObject =
                typeof log.details === 'string'
                  ? JSON.parse(log.details)
                  : log.details;
              return JSON.stringify(detailsObject, null, 2);
            } catch (error) {
              return log.details;
            }
          })()}
        </pre>
      </td>
      <td style={{ border: '1px solid #ccc', padding: '8px' }}>{log.created_at}</td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default AuditLogPage;
