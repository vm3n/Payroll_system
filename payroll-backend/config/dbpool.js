
const mysql = require('mysql2/promise');
require('dotenv').config();

const pools = {
  admin: mysql.createPool({
    host: process.env.DB_HOST,
    user: 'adminUser',
    password: 'admin_password',
    database: process.env.DB_NAME,
    connectionLimit: 10,
  }),
  manager: mysql.createPool({
    host: process.env.DB_HOST,
    user: 'managerUser',
    password: 'manager_password',
    database: process.env.DB_NAME,
    connectionLimit: 10,
  }),
  employee: mysql.createPool({
    host: process.env.DB_HOST,
    user: 'employeeUser',
    password: 'employee_password',
    database: process.env.DB_NAME,
    connectionLimit: 10,
  }),
};

module.exports = pools;
