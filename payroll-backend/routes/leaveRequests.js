const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const pool = require('../config/db');
const pools = require('../config/dbpool');

router.post('/leaverequests', verifyToken, async (req, res) => {
  const { employeeId } = req.user;
  const { start_date, end_date, leave_type } = req.body;

  if (!start_date || !end_date || !leave_type) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO LeaveRequests (employee_id, start_date, end_date, leave_type) VALUES (?, ?, ?, ?)',
      [employeeId, start_date, end_date, leave_type]
    );
    const [rows] = await pool.query(
      'SELECT * FROM LeaveRequests WHERE leave_id = ?',
      [result.insertId]
    );
    res.json({ message: 'Leave request submitted successfully', leaveRequest: rows[0] });
  } catch (error) {
    console.error('Error submitting leave request:', error);
    res.status(500).json({ message: 'Error submitting leave request', error: error.message });
  }
});


router.get('/leaverequest', verifyToken, async (req, res) => {
    const { employeeId } = req.user;
    try {
      const [rows] = await pool.query(
        'SELECT * FROM LeaveRequests WHERE employee_id = ? ORDER BY created_at DESC',
        [employeeId]
      );
      res.json(rows);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      res.status(500).json({ message: 'Error fetching leave requests', error: error.message });
    }
  });


router.get('/leaverequests/:manager', verifyToken, async (req, res) => {
  if(req.user.role !== 'manager') {
      return res.status(403).json ({message: 'Only  managers can view employee leave requests'});
  }
  const managerId = req.user.employeeId;

  try{
      const [rows] = await pool.query(
          `SELECT lr.*, e.full_name, e.email
          FROM LeaveRequests lr
          JOIN Employees e ON lr.employee_id = e.employee_id
          where e.manager_id = ?
          order by lr.created_at DESC`,
          [managerId]
      );
      res.json(rows);
  } catch(error) {
      console.error('Error fetching leave requests for manager :', error);
      res.status(500).json({ message: 'Error fetching leave requests', error:error.message});
  }

});

router.put('/leaverequest/:leaveId/approval', verifyToken, async (req, res) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Only managers can approve or reject leave requests' });
  }

  const managerId = req.user.employeeId;
  const { leaveId } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value. Only "approved" or "rejected" are allowed.' });
  }

  const poolForUser = pools[req.user.role];
  try {
    const [leaveRows] = await poolForUser.query('SELECT * FROM LeaveRequests WHERE leave_id = ?', [leaveId]);
    if (leaveRows.length === 0) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    const employeeId = leaveRows[0].employee_id;

    const [employeeRows] = await poolForUser.query('SELECT * FROM Employees WHERE employee_id = ?', [employeeId]);
    if (employeeRows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    if (employeeRows[0].manager_id !== managerId) {
      return res.status(403).json({ message: 'You are not authorized to approve this leave request' });
    }

    await poolForUser.query('UPDATE LeaveRequests SET status = ? WHERE leave_id = ?', [status, leaveId]);
    res.json({ message: `Leave request ${status} successfully` });
  } catch (err) {
    console.error('Error updating leave request:', err);
    res.status(500).json({ message: 'Error updating leave request', error: err.message });
  }
});
module.exports = router;
