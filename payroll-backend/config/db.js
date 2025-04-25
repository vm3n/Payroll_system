const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'Localhost_2',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Vineetha@1',
  database: process.env.DB_NAME || 'PayrollDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
