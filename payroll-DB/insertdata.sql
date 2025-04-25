INSERT INTO Employees (
  employee_id, department_id, manager_id, salary, hire_date, 
  username, password, role, full_name, email, twoFactorSecret, 
  mobile_number, date_of_birth, address, created_at, updated_at
) VALUES

(5, 3, 3, 'cc4b4d726166ba3dca7b742ab1355dc9:03367c02013182020cf8c2ec2d83eac1', '2025-02-27',
 'john_richland', '$2b$05$6wky8hPDViWUYUdEOYuhIuzfwBaNGv3OlwyZXK2xb6uhR241cOXuy', 'employee',
 'John Richland', 'john_richland@outlook.com', NULL,
 '123456789', '2010-10-12', 'Nashville, TN', '2025-03-06 12:19:00', '2025-03-06 12:19:00'),

(6, 2, 3, NULL, '2025-02-28',
 'sample', '$2b$05$PFstzjncsymQgOl79c9au.lgI1mPER4Zze20qu5L5T5jM6RyVxd86', 'admin',
 'sample', 'projecttestmanual@gmail.com', NULL,
 '123456789', '2025-02-20', 'New york, NJ', '2025-03-06 14:20:58', '2025-03-07 00:36:33');

INSERT INTO Departments (department_name) VALUES
  ('HR'),
  ('Finance'),
  ('IT'),
  ('Sales');

INSERT INTO Attendance (employee_id, entry_time, exit_time, date) VALUES
  (3, '2023-02-01 09:05:00', '2023-02-01 17:10:00', '2023-02-01'),
  (5, '2023-02-01 08:55:00', '2023-02-01 16:50:00', '2023-02-01'),
  (6, '2023-02-01 09:00:00', '2023-02-01 17:00:00', '2023-02-01');

INSERT INTO LeaveRequests (employee_id, start_date, end_date, leave_type, status) VALUES
  (3, '2023-04-01', '2023-04-03', 'personal', 'pending'),
  (5, '2023-05-05', '2023-05-07', 'sick', 'approved'),
  (6, '2023-06-01', '2023-06-03', 'vacation', 'rejected');


