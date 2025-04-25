
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const verifyToken = require('../middleware/verifyToken');
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT department_id, department_name FROM Departments');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching departments:', err);
    res.status(500).json({ message: 'Error fetching departments' });
  }
});

router.get('/empDepartCount', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT d.department_id, d.department_name, COUNT(e.employee_id) AS employee_count
       FROM Departments d
       LEFT JOIN Employees e ON d.department_id = e.department_id
       GROUP BY d.department_id, d.department_name`
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching departments:', err);
    res.status(500).json({ message: 'Error fetching departments' });
  }
});

module.exports = router;
