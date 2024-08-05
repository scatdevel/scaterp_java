import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const currentTime = new Date().getTime();

    if (!authToken || !tokenExpiration || currentTime >= tokenExpiration) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('tokenExpiration');
      navigate('/auth/sign-in');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
