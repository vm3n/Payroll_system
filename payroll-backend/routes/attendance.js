const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const pool = require('../config/db');
const { parseISO, getDay } = require('date-fns');

router.post('/empAttendance', verifyToken, async (req, res) => {
  const { employeeId } = req.user;
  let { date, entry_time, exit_time } = req.body;

  if (!date || !entry_time) {
    return res.status(400).json({ message: 'Date and entry time are required.' });
  }

  console.log('Received date:', date);
  console.log('Received entry_time:', entry_time);
  console.log('Received exit_time:', exit_time);

  const givenDate = new Date(date + 'T00:00:00');
  const dayOfWeek = givenDate.getDay();

  console.log(`Parsed Date: ${givenDate.toString()}, Day of week: ${dayOfWeek}`);

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return res.status(400).json({
      message: 'Attendance can only be recorded on weekdays (Monday to Friday).'
    });
  }

  const entryDateTime = `${date} ${entry_time}:00`;
  const exitDateTime = exit_time ? `${date} ${exit_time}:00` : null;

  console.log('Entry DateTime:', entryDateTime);
  console.log('Exit DateTime:', exitDateTime);

  try {
    const [result] = await pool.query(
      'INSERT INTO Attendance (employee_id, entry_time, exit_time, date) VALUES (?, ?, ?, ?)',
      [employeeId, entryDateTime, exitDateTime, date]
    );
    res.json({ message: 'Attendance recorded successfully', attendanceId: result.insertId });
  } catch (err) {
    console.error('Error recording attendance:', err);
    res.status(500).json({ message: 'Error recording attendance', error: err.message });
  }
});



router.get('/attendances', verifyToken, async (req, res) => {
    const { employeeId } = req.user;
    try {
      const [rows] = await pool.query(
        'SELECT * FROM Attendance WHERE employee_id = ? ORDER BY date DESC',
        [employeeId]
      );
      res.json(rows);
    } catch (err) {
      console.error('Error fetching attendance records:', err);
      res.status(500).json({
        message: 'Error fetching attendance records',
        error: err.message,
      });
    }
  });

module.exports = router;
