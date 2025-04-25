const express = require('express');
const router = express.Router();
const pools = require('../config/dbpool');
const pool = require('../config/db');
const verifyToken = require('../middleware/verifyToken');
const { decrypt, encrypt } = require('../cryptoDesign');

const INCOME_TAX_RATE = 10;
const HEALTH_INSURANCE_AMOUNT = 150.00;
const K401_RATE = 5;
const SSN_TAX_RATE = 3;

router.post('/generate', verifyToken, async (req, res) => {
  const { role } = req.user;
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }

  const { pay_period_start, pay_period_end } = req.body;
  if (!pay_period_start || !pay_period_end) {
    return res.status(400).json({ message: 'Please provide both pay_period_start and pay_period_end dates' });
  }

  const pool = pools['admin'];

  try {
    const [employees] = await pool.query(`SELECT employee_id, salary FROM Employees`);

    for (const emp of employees) {
      let grossSalary = 0;
      if (emp.salary) {
        grossSalary = parseFloat(decrypt(emp.salary));
      }

      const incomeTax = (grossSalary * INCOME_TAX_RATE) / 100;
      const healthInsurance = HEALTH_INSURANCE_AMOUNT;
      const k401 = (grossSalary * K401_RATE) / 100;
      const ssnTax = (grossSalary * SSN_TAX_RATE) / 100;
      const totalDeductions = incomeTax + healthInsurance + k401 + ssnTax;
      const netSalary = grossSalary - totalDeductions;
      const encryptedGrossSalary = encrypt(grossSalary.toString());
      const encryptedIncomeTax = encrypt(incomeTax.toString());
      const encryptedHealthInsurance = encrypt(healthInsurance.toString());
      const encryptedK401 = encrypt(k401.toString());
      const encryptedSSNTax = encrypt(ssnTax.toString());
      const encryptedNetSalary = encrypt(netSalary.toString());
      await pool.query(
        `INSERT INTO Payroll
         (employee_id, pay_period_start, pay_period_end, gross_salary, income_tax, health_insurance, k401, ssn_tax, net_salary)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
         [emp.employee_id, pay_period_start, pay_period_end, encryptedGrossSalary, encryptedIncomeTax, encryptedHealthInsurance, encryptedK401, encryptedSSNTax, encryptedNetSalary]
      );
    }

    res.json({ message: 'Payroll generated successfully for all employees.' });
  } catch (err) {
    console.error('Error generating payroll:', err);
    res.status(500).json({ message: 'Error generating payroll', error: err.message });
  }
});

router.get('/employee/:employeeId', verifyToken, async (req, res) => {
  const { employeeId } = req.params;
  const { role } = req.user;
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }
  const pool = pools['admin'];
  try {
    const [rows] = await pool.query(
      'SELECT * FROM Payroll WHERE employee_id = ?',
      [employeeId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Payroll record not found for this employee' });
    }
    rows.forEach(record => {
      record.gross_salary = decrypt(record.gross_salary);
      record.income_tax = decrypt(record.income_tax);
      record.health_insurance = decrypt(record.health_insurance);
      record.k401 = decrypt(record.k401);
      record.ssn_tax = decrypt(record.ssn_tax);
      record.net_salary = decrypt(record.net_salary);
    });
    res.json(rows);
  } catch (err) {
    console.error('Error retrieving payroll record:', err);
    res.status(500).json({ message: 'Error retrieving payroll record', error: err.message });
  }
});



module.exports = router;
