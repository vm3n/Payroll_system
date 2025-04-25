const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const pools = require('../config/dbpool');

router.get('/auditlogs', verifyToken, async (req, res) => {
  const { role } = req.user;

  if (role !== 'admin') {
    return res.status(400).json({ message: 'Admins only' });
  }
  const poolForUser = pools[role];
  try {
    const [rows] = await poolForUser.query('SELECT * FROM AuditLogs ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Error fetching audit logs' });
  }
});

module.exports = router;
