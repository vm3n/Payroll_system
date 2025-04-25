const express = require('express');
const pools = require('../config/dbpool');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const { encrypt } = require('../cryptoDesign');
const { decrypt } = require('../cryptoDesign');


router.get('/admin-data', verifyToken, async (req, res) => {
  const { role, employeeId } = req.user;
  if (role !== 'admin') {
    return res.status(400).json({ message: 'Admins do not have an employee profile' });
  }
  const poolForUser = pools[role];
  try {
    const [employeeRows] = await poolForUser.query(
      'SELECT * FROM Employees WHERE employee_id = ?',
      [employeeId]
    );
    if (employeeRows.length === 0) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }
    const profile = employeeRows[0];
    if (profile.salary) {
      profile.salary = decrypt(profile.salary);
    }
    let manager = null;
    if (profile.manager_id) {
      const [managerRows] = await poolForUser.query(
        'SELECT * FROM Employees WHERE employee_id = ?',
        [profile.manager_id]
      );
      if (managerRows.length > 0) {
        manager = managerRows[0];
      }
    }
    let departmentName = null;
if (profile.department_id) {
  const [deptRows] = await poolForUser.query(
    'SELECT department_name FROM Departments WHERE department_id = ?',
    [profile.department_id]
  );
  if (deptRows.length > 0) {
    departmentName = deptRows[0].department_name;
  }
}
    res.json({ profile, manager, departmentName });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Database error' });
  }
});

router.get('/employee-data', verifyToken, async (req, res) => {
  const { role, employeeId } = req.user;
  if (role === 'admin') {
    return res.status(400).json({ message: 'Admins do not have an employee profile' });
  }
  const poolForUser = pools[role];
  try {
    const [employeeRows] = await poolForUser.query(
      'SELECT * FROM Employees WHERE employee_id = ?',
      [employeeId]
    );
    if (employeeRows.length === 0) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }
    const profile = employeeRows[0];
    if (profile.salary) {
      profile.salary = decrypt(profile.salary);
    }
    let manager = null;
    if (profile.manager_id) {
      const [managerRows] = await poolForUser.query(
        'SELECT * FROM Employees WHERE employee_id = ?',
        [profile.manager_id]
      );
      if (managerRows.length > 0) {
        manager = managerRows[0];
      }
    }
    let departmentName = null;
if (profile.department_id) {
  const [deptRows] = await poolForUser.query(
    'SELECT department_name FROM Departments WHERE department_id = ?',
    [profile.department_id]
  );
  if (deptRows.length > 0) {
    departmentName = deptRows[0].department_name;
  }
}  console.log(departmentName);
    res.json({ profile, manager, departmentName });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Database error' });
  }
});

router.get('/manager-data', verifyToken, async (req, res) => {
  const { role, employeeId } = req.user;
  if (role !== 'manager') {
    return res.status(403).json({ message: 'Access to Managers only' });
  }
  const poolForUser = pools[role];
  try {
    const [employeeRows] = await poolForUser.query(
      'SELECT * FROM Employees WHERE employee_id = ?',
      [employeeId]
    );
    if (employeeRows.length === 0) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }
    const profile = employeeRows[0];
    if (profile.salary) {
      profile.salary = decrypt(profile.salary);
    }
    let manager = null;
    if (profile.manager_id) {
      const [managerRows] = await poolForUser.query(
        'SELECT * FROM Employees WHERE employee_id = ?',
        [profile.manager_id]
      );
      if (managerRows.length > 0) {
        manager = managerRows[0];
      }
    }
    let departmentName = null;
if (profile.department_id) {
  const [deptRows] = await poolForUser.query(
    'SELECT department_name FROM Departments WHERE department_id = ?',
    [profile.department_id]
  );
  if (deptRows.length > 0) {
    departmentName = deptRows[0].department_name;
  }
}  console.log(departmentName);
    res.json({ profile, manager, departmentName });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Database error' });
  }
});

router.get('/admin/getAll', verifyToken, async (req, res) => {
  const { role, employeeId } = req.user;
  if (role !== 'admin') {
    return res.status(400).json({ message: 'Admins do not have  manager and employee profile' });
  }
  const poolForUser = pools[role];
  try {
    const [rows] = await poolForUser.query(`SELECT * FROM Employees`);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ message: 'Error fetching employees' });
  }
});


router.get('/:managerId', verifyToken, async (req, res) => {
  const { managerId } = req.params;
  const { role } = req.user;
  if (role !== 'manager') {
    return res.status(400).json({ message: 'Admins and employees do not have an manager profile' });
  }
  const poolForUser = pools[role];
  try {
    const [rows] = await poolForUser.query(
      'SELECT * FROM Employees WHERE manager_id = ?',
      [managerId]
    );
    res.json(rows);
    console.log(managerId);
  } catch (err) {
    console.error('Error fetching employees for manager:', err);
    res.status(500).json({ message: 'Error fetching employees for manager', error: err.message });
  }
});



router.delete('/:id', verifyToken, async (req, res) => {
  const { role } = req.user;
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }
  const { id } = req.params;
  try {
    const poolForUser = pools[role];
    const [result] = await poolForUser.query(
      `DELETE FROM Employees WHERE employee_id = ?`,
      [id]
    );
    res.json({ message: 'Employee deleted successfully', affectedRows: result.affectedRows });
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ message: 'Error deleting employee' });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  const { role } = req.user;
  console.log(role);
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }
  const { id } = req.params;
  let { username, email, full_name, department_id, manager_id, mobile_number, date_of_birth, address, hire_date } = req.body;
  if (date_of_birth) {
    date_of_birth = new Date(date_of_birth).toISOString().split('T')[0];
  }
  if (hire_date) {
    hire_date = new Date(hire_date).toISOString().split('T')[0];
  }
  try {
    const poolForUser = pools[role];
    const [result] = await poolForUser.query(
      `UPDATE Employees
       SET username = ?, email = ?, full_name = ?, department_id = ?, manager_id = ?, mobile_number = ?, date_of_birth = ?, address = ?, hire_date = ?
       WHERE employee_id = ?`,
      [username, email, full_name, department_id, manager_id || null, mobile_number, date_of_birth, address, hire_date, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee updated successfully', affectedRows: result.affectedRows });
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(500).json({ message: 'Error updating employee' });
  }
});

module.exports = router;


