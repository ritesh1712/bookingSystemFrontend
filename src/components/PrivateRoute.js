import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contextApi/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
