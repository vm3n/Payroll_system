
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(decoded.role)) {
    if (decoded.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (decoded.role === 'manager') {
      return <Navigate to="/manager" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;

