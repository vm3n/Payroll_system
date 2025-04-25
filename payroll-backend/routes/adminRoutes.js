const express = require('express');
const authorizeRoles = require('../middleware/authorize');
const router = express.Router();

router.get('/admin-data', authorizeRoles('admin', 'manager'), (req, res) => {
  res.json({ message: 'This data is accessible by admin and manager roles only.' });
});

router.get('/admin-only', authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'This route is restricted to admins only.' });
});

module.exports = router;
