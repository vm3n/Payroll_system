const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const pool = require('../config/db');
const { decrypt, encrypt } = require('../cryptoDesign');

router.get('/empSalary', verifyToken, async (req, res) => {
  const { employeeId } = req.user;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM Payroll WHERE employee_id = ? ORDER BY generated_at DESC LIMIT 1',
      [employeeId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Payroll record not found for this employee' });
    }
    const payrollRecord = rows[0];
    payrollRecord.gross_salary = decrypt(payrollRecord.gross_salary);
    payrollRecord.income_tax = decrypt(payrollRecord.income_tax);
    payrollRecord.health_insurance = decrypt(payrollRecord.health_insurance);
    payrollRecord.k401 = decrypt(payrollRecord.k401);
    payrollRecord.ssn_tax = decrypt(payrollRecord.ssn_tax);
    payrollRecord.net_salary = decrypt(payrollRecord.net_salary);
    res.json(payrollRecord);
  } catch (err) {
    console.error('Error retrieving payroll record:', err);
    res.status(500).json({ message: 'Error retrieving payroll record', error: err.message });
  }
});

module.exports = router;
