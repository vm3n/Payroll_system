import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendancePage = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(`${apiUrl}/attendance/attendances`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAttendanceRecords(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching attendance records:', err);
        setError(err);
        setLoading(false);
      }
    };
    fetchAttendance();
  }, [apiUrl, token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        date,
        entry_time: entryTime,
        exit_time: exitTime,
      };
      await axios.post(`${apiUrl}/attendance/empAttendance`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = await axios.get(`${apiUrl}/attendance/attendances`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttendanceRecords(res.data);
      setDate('');
      setEntryTime('');
      setExitTime('');
    } catch (err) {
      console.error('Error recording attendance:', err);
      setError(err);
    }
  };

  if (loading) return <div>Loading attendance records...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Attendance</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label htmlFor="date">Date (YYYY-MM-DD): </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="entryTime">Entry Time: </label>
          <input
            id="entryTime"
            type="time"
            value={entryTime}
            onChange={(e) => setEntryTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="exitTime">Exit Time: </label>
          <input
            id="exitTime"
            type="time"
            value={exitTime}
            onChange={(e) => setExitTime(e.target.value)}
          />
        </div>
        <button type="submit">Record Attendance</button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
        <thead>
          <tr>
            <th style={{ padding: '8px' }}>Date</th>
            <th style={{ padding: '8px' }}>Entry Time</th>
            <th style={{ padding: '8px' }}>Exit Time</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record.attendance_id}>
              <td style={{ padding: '8px' }}>{record.date}</td>
              <td style={{ padding: '8px' }}>{record.entry_time}</td>
              <td style={{ padding: '8px' }}>{record.exit_time || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePage;
