import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/authSlice';

const ProtectedRoute = ({ children }) => {
  const token = useSelector(selectCurrentToken);
  if (!token) return <Navigate to="/signin" replace />;
  return children;
};

export default ProtectedRoute;
