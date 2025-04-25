# Payroll Management System

A secure, role-based Payroll Management System built with React.js as frontend and Node.js as backend. This project implements two-way authentication (password verification and one-time email OTP), role-based access control (admin, manager, employee), encryption for sensitive data (salary details), audit logging, and scheduled backups which we plan having backup once a week using cron jobs.

## Overview

The Payroll Management System is designed to securely manage payroll operations for an organization. Different dashboards are provided based on the user role (admin, manager, employee), and data is encrypted and audited for security.

## Features

- **Two-Factor Authentication:**
  User login with password and email OTP verification.

- **Hashing for Password:**
  Hashing to store employee password.

- **Role-Based Access Control:**
  - **Admin:** Full access to payroll, manager and employee management, departments, and audit logs.
  - **Manager:** Access to view/manage their team members.
  - **Employee:** Access to their own profile, leave records, and salary details.

- **Data Encryption:**
  Sensitive data (salary) is encrypted using AES-256 encryption.

- **Audit Logging:**
  Changes to data are logged for security and tracking.

- **Database Backup:**
  Scheduled cron jobs are set up to backup the database.

## Tech Stack

- **Frontend:**
  React.js

- **Backend:**
  Node.js, Express.js, MySQL.

- **Other Tools:**
  postman, corn jobs.

-**SQL Database:**
In order to create database, run the files in folder:payroll-DB

- **To run the application in backend:**
  -cd payroll-backend
  -npm install
  -node app.js

-**To run the frontend:**
-cd payroll-frontend
-npm install
-npm start
