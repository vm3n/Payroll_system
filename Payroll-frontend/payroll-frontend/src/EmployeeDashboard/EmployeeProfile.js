import React from 'react';
import './EmployeeDashboard.css';

const EmployeeProfile = ({ employee, manager, departmentName }) => {
    console.log(departmentName);
  return (
    <div className="profile-container">
      <div className="profile-left">
        <div className="employee-card">
          <h2 className="employee-name">{employee.full_name}</h2>
          <p className="employee-position">{employee.role}</p>
          <p className="employee-location">{employee.address}</p>
        </div>

        <div className="manager-card">
          <h3>Manager Details</h3>
          {manager ? (
            <>
              <p><strong>Name:</strong> {manager.full_name}</p>
              <p><strong>Email:</strong> {manager.email}</p>
            </>
          ) : (
            <p>No manager assigned.</p>
          )}
        </div>
      </div>

      <div className="profile-right">
        <div className="personal-details">
          <div className="details-header">
            <h3>Personal Details</h3>
          </div>
          <div className="details-body">
            <p><strong>Full Name:</strong> {employee.full_name}</p>
            <p><strong>Position:</strong> {employee.role}</p>
            <p><strong>Date of Birth:</strong> {employee.date_of_birth}</p>
            <p><strong>Address:</strong> {employee.address}</p>
            <p><strong>Mobile Number:</strong> {employee.mobile_number}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Department ID:</strong> {employee.department_id}</p>
            <p><strong>Department Name:</strong> {departmentName}</p>
            <p><strong>Hire Date:</strong> {employee.hire_date}</p>
          </div>
        </div>

        <div className="additional-info">
          <h3>Salary</h3>
          <p><strong>Base Salary:</strong> {employee.salary}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
