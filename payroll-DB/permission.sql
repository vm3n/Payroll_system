CREATE USER 'adminUser'@'localhost' IDENTIFIED BY 'admin_password';
GRANT ALL PRIVILEGES ON PayrollDB.* TO 'adminUser'@'localhost';


CREATE USER 'managerUser'@'localhost' IDENTIFIED BY 'manager_password';
GRANT SELECT, INSERT, UPDATE ON PayrollDB.Payroll TO 'managerUser'@'localhost';
GRANT SELECT, INSERT, UPDATE ON PayrollDB.Employees TO 'managerUser'@'localhost';
GRANT SELECT, INSERT, UPDATE ON PayrollDB.LeaveRequests TO 'managerUser'@'localhost';
GRANT SELECT, INSERT, UPDATE ON PayrollDB.Attendance TO 'managerUser'@'localhost';
GRANT SELECT, INSERT, UPDATE ON PayrollDB.Departments TO 'managerUser'@'localhost';


CREATE USER 'employeeUser'@'localhost' IDENTIFIED BY 'employee_password';
GRANT SELECT ON PayrollDB.Employees TO 'employeeUser'@'localhost';
GRANT SELECT ON PayrollDB.LeaveRequests TO 'employeeUser'@'localhost';
GRANT SELECT ON PayrollDB.Attendance TO 'employeeUser'@'localhost';
GRANT SELECT ON PayrollDB.Payroll TO 'employeeUser'@'localhost';
GRANT SELECT ON PayrollDB.Departments TO 'employeeUser'@'localhost';


FLUSH PRIVILEGES;
SHOW GRANTS FOR 'employeeUser'@'localhost';
SHOW GRANTS FOR 'managerUser'@'localhost';
SHOW GRANTS FOR 'adminUser'@'localhost';