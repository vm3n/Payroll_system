
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const verifyToken = require('../middleware/verifyToken');
const pool = require('../config/db');
const { encrypt } = require('../cryptoDesign');
const { decrypt } = require('../cryptoDesign');

require('dotenv').config();

const router = express.Router();

const otpStore = {};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/register', async (req, res) => {
  let {
    username,
    password,
    email,
    role,
    full_name,
    department_id,
    manager_id,
    salary,
    hire_date,
    mobile_number,
    date_of_birth,
    address
  } = req.body;
  console.log('Backend: Request body:', req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    let encryptedSalary = null;
    if ((role === 'employee' || role === 'manager') && salary) {
      encryptedSalary = encrypt(salary.toString());
    }
    const [result] = await pool.query(
      `INSERT INTO Employees 
       (username, password, email, role, full_name, department_id, manager_id, salary, hire_date, mobile_number, date_of_birth, address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        username,
        hashedPassword,
        email,
        role,
        full_name,
        department_id,
        manager_id || null,
        encryptedSalary,
        hire_date,
        mobile_number,
        date_of_birth,
        address
      ]
    );
    console.log('Backend: Employee registration successful:', result);
    res.status(201).json({ message: 'Employee registered successfully', employeeId: result.insertId });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Error registering employee', error: err.message });
  }
});

router.get('/employee-data', verifyToken, async (req, res) => {
  const { role, employee_id } = req.user;
  let query = '';
  let params = [];
  if (role === 'admin') {
    query = 'SELECT * FROM Employees';
  } else if (role === 'manager') {
    query = 'SELECT * FROM Employees WHERE manager_id = ? OR employee_id = ?';
    params = [employee_id, employee_id];
  } else if (role === 'employee') {
    query = 'SELECT * FROM Employees WHERE employee_id = ?';
    params = [employee_id];
  } else {
    return res.status(403).json({ message: 'Invalid role' });
  }
  const pool = pools[role];
  if (!pool) {
    return res.status(500).json({ message: 'No database connection available for your role.' });
  }
  try {
    const [rows] = await pool.query(query, params);
    const decryptedRows = rows.map(row => {
      if (row.salary) {
        row.salary = decrypt(row.salary);
      }
      return row;
    });
    res.json(decryptedRows);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ message: 'Database error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query(`SELECT * FROM Employees WHERE username = ?`, [username]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const user = rows[0];
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[user.email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000 
    };
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Your OTP for Login',
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending OTP email:', err);
        return res.status(500).json({ message: 'Failed to send OTP email' });
      }
      console.log('OTP email sent:', info.response);
      res.json({ message: 'OTP sent to your email', email: user.email });
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/verifyOTP', async (req, res) => {
    const { email, otp } = req.body;
    try {
      const record = otpStore[email];
      if (!record) {
        return res.status(400).json({ message: 'No OTP found for this email' });
      }
      if (Date.now() > record.expiresAt) {
        delete otpStore[email];
        return res.status(400).json({ message: 'OTP has expired' });
      }
      if (record.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
      delete otpStore[email];

      const [rows] = await pool.query(`SELECT * FROM Employees WHERE email = ?`, [email]);
      if (rows.length === 0) {
        return res.status(400).json({ message: 'User not found' });
      }
      const user = rows[0];

      const token = jwt.sign(
        { employeeId: user.employee_id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ message: 'OTP verified successfully', token });
    } catch (err) {
      console.error('OTP verification error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router;
