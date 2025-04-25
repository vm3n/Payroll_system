DELIMITER $$

CREATE TRIGGER audit_employees_update
AFTER UPDATE ON Employees
FOR EACH ROW
BEGIN
    INSERT INTO AuditLogs (employee_id, action, details)
    VALUES (
        NEW.employee_id,
        'UPDATE',
        JSON_OBJECT(
            'old_record', JSON_OBJECT(
                'employee_id', OLD.employee_id,
                'department_id', OLD.department_id,
                'manager_id', OLD.manager_id,
                'salary', OLD.salary,
                'hire_date', OLD.hire_date,
                'username', OLD.username,
                'password', OLD.password,
                'role', OLD.role,
                'full_name', OLD.full_name,
                'email', OLD.email,
                'twoFactorSecret', OLD.twoFactorSecret,
                'mobile_number', OLD.mobile_number,
                'date_of_birth', OLD.date_of_birth,
                'address', OLD.address,
                'created_at', OLD.created_at,
                'updated_at', OLD.updated_at
            ),
            'new_record', JSON_OBJECT(
                'employee_id', NEW.employee_id,
                'department_id', NEW.department_id,
                'manager_id', NEW.manager_id,
                'salary', NEW.salary,
                'hire_date', NEW.hire_date,
                'username', NEW.username,
                'password', NEW.password,
                'role', NEW.role,
                'full_name', NEW.full_name,
                'email', NEW.email,
                'twoFactorSecret', NEW.twoFactorSecret,
                'mobile_number', NEW.mobile_number,
                'date_of_birth', NEW.date_of_birth,
                'address', NEW.address,
                'created_at', NEW.created_at,
                'updated_at', NEW.updated_at
            )
        )
    );
END$$

DELIMITER ;

DELIMITER $$
CREATE TRIGGER audit_employees_insert
AFTER INSERT ON Employees
FOR EACH ROW
BEGIN
    INSERT INTO AuditLogs (employee_id, action, details)
    VALUES (
        NEW.employee_id,
        'INSERT',
        JSON_OBJECT(
            'old_record', NULL,
            'new_record', JSON_OBJECT(
                'employee_id', NEW.employee_id,
                'department_id', NEW.department_id,
                'manager_id', NEW.manager_id,
                'salary', NEW.salary,
                'hire_date', NEW.hire_date,
                'username', NEW.username,
                'password', NEW.password,
                'role', NEW.role,
                'full_name', NEW.full_name,
                'email', NEW.email,
                'twoFactorSecret', NEW.twoFactorSecret,
                'mobile_number', NEW.mobile_number,
                'date_of_birth', NEW.date_of_birth,
                'address', NEW.address,
                'created_at', NEW.created_at,
                'updated_at', NEW.updated_at
            )
        )
    );
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER audit_employees_delete
AFTER DELETE ON Employees
FOR EACH ROW
BEGIN
    INSERT INTO AuditLogs (employee_id, action, details)
    VALUES (
        OLD.employee_id,
        'DELETE',
        JSON_OBJECT(
            'old_record', JSON_OBJECT(
                'employee_id', OLD.employee_id,
                'department_id', OLD.department_id,
                'manager_id', OLD.manager_id,
                'salary', OLD.salary,
                'hire_date', OLD.hire_date,
                'username', OLD.username,
                'password', OLD.password,
                'role', OLD.role,
                'full_name', OLD.full_name,
                'email', OLD.email,
                'twoFactorSecret', OLD.twoFactorSecret,
                'mobile_number', OLD.mobile_number,
                'date_of_birth', OLD.date_of_birth,
                'address', OLD.address,
                'created_at', OLD.created_at,
                'updated_at', OLD.updated_at
            ),
            'new_record', NULL
        )
    );
END$$
DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_leaverequests_update
AFTER UPDATE ON LeaveRequests
FOR EACH ROW
BEGIN
  INSERT INTO AuditLogs (employee_id, action, details)
  VALUES (
    NEW.employee_id,
    'UPDATE',
    JSON_OBJECT(
      'table', 'LeaveRequests',
      'old_record', JSON_OBJECT(
        'leave_id', OLD.leave_id,
        'employee_id', OLD.employee_id,
        'start_date', OLD.start_date,
        'end_date', OLD.end_date,
        'leave_type', OLD.leave_type,
        'status', OLD.status,
        'created_at', OLD.created_at
      ),
      'new_record', JSON_OBJECT(
        'leave_id', NEW.leave_id,
        'employee_id', NEW.employee_id,
        'start_date', NEW.start_date,
        'end_date', NEW.end_date,
        'leave_type', NEW.leave_type,
        'status', NEW.status,
        'created_at', NEW.created_at
      )
    )
  );
END$$

DELIMITER ;


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

DELIMITER $$

CREATE TRIGGER trg_leaverequests_insert
AFTER INSERT ON LeaveRequests
FOR EACH ROW
BEGIN
  INSERT INTO AuditLogs (employee_id, action, details)
  VALUES (
    NEW.employee_id,
    'INSERT',
    JSON_OBJECT(
      'table', 'LeaveRequests',
      'old_record', NULL,
      'new_record', JSON_OBJECT(
        'leave_id', NEW.leave_id,
        'employee_id', NEW.employee_id,
        'start_date', NEW.start_date,
        'end_date', NEW.end_date,
        'leave_type', NEW.leave_type,
        'status', NEW.status,
        'created_at', NEW.created_at
      )
    )
  );
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_attendance_insert
AFTER INSERT ON Attendance
FOR EACH ROW
BEGIN
  INSERT INTO AuditLogs (employee_id, action, details)
  VALUES (
    NEW.employee_id,
    'INSERT',
    JSON_OBJECT(
      'table', 'Attendance',
      'old_record', NULL,
      'new_record', JSON_OBJECT(
        'attendance_id', NEW.attendance_id,
        'employee_id', NEW.employee_id,
        'entry_time', NEW.entry_time,
        'exit_time', NEW.exit_time,
        'date', NEW.date
      )
    )
  );
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_attendance_update
AFTER UPDATE ON Attendance
FOR EACH ROW
BEGIN
  INSERT INTO AuditLogs (employee_id, action, details)
  VALUES (
    NEW.employee_id,
    'UPDATE',
    JSON_OBJECT(
      'table', 'Attendance',
      'old_record', JSON_OBJECT(
        'attendance_id', OLD.attendance_id,
        'employee_id', OLD.employee_id,
        'entry_time', OLD.entry_time,
        'exit_time', OLD.exit_time,
        'date', OLD.date
      ),
      'new_record', JSON_OBJECT(
        'attendance_id', NEW.attendance_id,
        'employee_id', NEW.employee_id,
        'entry_time', NEW.entry_time,
        'exit_time', NEW.exit_time,
        'date', NEW.date
      )
    )
  );
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_attendance_delete
AFTER DELETE ON Attendance
FOR EACH ROW
BEGIN
  INSERT INTO AuditLogs (employee_id, action, details)
  VALUES (
    OLD.employee_id,
    'DELETE',
    JSON_OBJECT(
      'table', 'Attendance',
      'old_record', JSON_OBJECT(
        'attendance_id', OLD.attendance_id,
        'employee_id', OLD.employee_id,
        'entry_time', OLD.entry_time,
        'exit_time', OLD.exit_time,
        'date', OLD.date
      ),
      'new_record', NULL
    )
  );
END$$

DELIMITER ;

