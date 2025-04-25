CREATE DATABASE IF NOT EXISTS PayrollDB;

USE PayrollDB;

CREATE TABLE Departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    department_id INT NOT NULL,
    manager_id INT DEFAULT NULL,
    salary VARCHAR(255) DEFAULT NULL,
    hire_date DATE NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','manager','employee') NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    twoFactorSecret VARCHAR(255) DEFAULT NULL,
    mobile_number VARCHAR(20) DEFAULT NULL,
    date_of_birth DATE DEFAULT NULL,
    address VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id),
    FOREIGN KEY (manager_id) REFERENCES Employees(employee_id)
);

CREATE TABLE Attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    entry_time DATETIME NOT NULL,
    exit_time DATETIME NULL,
    date DATE NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
);

CREATE TABLE LeaveRequests (
    leave_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    leave_type ENUM('sick', 'vacation', 'personal', 'other') NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
);

CREATE TABLE Payroll (
    payroll_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    pay_period_start DATE NOT NULL,
    pay_period_end DATE NOT NULL,
    gross_salary DECIMAL(10,2) NOT NULL,
    income_tax DECIMAL(10,2) DEFAULT 0,
    health_insurance DECIMAL(10,2) DEFAULT 0,
    k401 DECIMAL(10,2) DEFAULT 0,
    ssn_tax DECIMAL(10,2) DEFAULT 0,
    net_salary DECIMAL(10,2) NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
);

CREATE TABLE AuditLogs (
    audit_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NULL,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE SET NULL
);
CREATE TABLE Payroll (
    payroll_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    pay_period_start DATE NOT NULL,
    pay_period_end DATE NOT NULL,
    gross_salary VARCHAR(255) NOT NULL,
    income_tax VARCHAR(255) DEFAULT '0',
    health_insurance VARCHAR(255) DEFAULT '0',
    k401 VARCHAR(255) DEFAULT '0',
    ssn_tax VARCHAR(255) DEFAULT '0',
    net_salary VARCHAR(255) NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
);

DELIMITER $$

CREATE TRIGGER trg_payroll_insert
AFTER INSERT ON Payroll
FOR EACH ROW
BEGIN
  INSERT INTO AuditLogs (employee_id, action, details)
  VALUES (
    NEW.employee_id,
    'INSERT',
    JSON_OBJECT(
      'table', 'Payroll',
      'old_record', NULL,
      'new_record', JSON_OBJECT(
        'payroll_id', NEW.payroll_id,
        'employee_id', NEW.employee_id,
        'pay_period_start', NEW.pay_period_start,
        'pay_period_end', NEW.pay_period_end,
        'gross_salary', NEW.gross_salary,
        'income_tax', NEW.income_tax,
        'health_insurance', NEW.health_insurance,
        'k401', NEW.k401,
        'ssn_tax', NEW.ssn_tax,
        'net_salary', NEW.net_salary,
        'generated_at', NEW.generated_at
      )
    )
  );
END$$

DELIMITER ;


select * from employees;
select * from Payroll;
select * from AuditLogs;
ALTER TABLE Payroll MODIFY COLUMN gross_salary VARCHAR(255) NOT NULL;
ALTER TABLE Payroll MODIFY COLUMN income_tax VARCHAR(255) DEFAULT '0';
ALTER TABLE Payroll MODIFY COLUMN health_insurance VARCHAR(255) DEFAULT '0';
ALTER TABLE Payroll MODIFY COLUMN k401 VARCHAR(255) DEFAULT '0';
ALTER TABLE Payroll MODIFY COLUMN ssn_tax VARCHAR(255) DEFAULT '0';
ALTER TABLE Payroll MODIFY COLUMN net_salary VARCHAR(255) NOT NULL;
DESCRIBE Payroll;
SELECT * FROM Payroll WHERE employee_id = 5;




