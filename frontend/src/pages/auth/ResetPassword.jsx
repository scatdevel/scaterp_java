import React, { useState, useEffect } from 'react';
import { Input, Button, Typography } from "@material-tailwind/react";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export function PasswordReset() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for password confirmation
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const isValid = newPassword.length > 0 && confirmPassword.length > 0;

  const token = new URLSearchParams(location.search).get('token'); // Extract token from URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      setError('Invalid or missing token.');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append('token', token);
      params.append('newPassword', newPassword);

      const response = await axios.post(`http://localhost:8080/users/reset-password`, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.status === 200) {
        setMessage('Password reset successful. You can now log in with your new password.');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after success
        }, 1000);
      }
    } catch (err) {
      console.error('Password reset error:', err.response ? err.response.data : err.message);
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-10 bg-white bg-opacity-90 rounded-lg shadow-lg z-10">
        <div className="text-center mb-6">
          <Typography variant="h4" className="font-bold mb-2 text-gray-800">Reset Your Password</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg">
            Enter your new password and confirm it.
          </Typography>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 mx-auto">
          <div>
            <Typography variant="small" color="blue-gray" className="font-medium mb-1">New Password</Typography>
            <Input
              type="password"
              size="lg"
              placeholder="New password"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="font-medium mb-1">Confirm Password</Typography>
            <Input
              type="password"
              size="lg"
              placeholder="Confirm new password"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              
            />
          </div>
          {error && (
            <Typography variant="small" color="red" className="mt-2 text-center text-sm">
              {error}
            </Typography>
          )}
          {message && (
            <Typography variant="small" color="green" className="mt-2 text-center text-sm">
              {message}
            </Typography>
          )}
          <Button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200">
            Reset Password
          </Button>
        </form>
      </div>
      <div className="absolute inset-0 hidden lg:block">
        <img src="/img/farmers1.jpg" alt="Background" className="w-full h-full object-cover" />
      </div>
    </section>
  );
}

export default PasswordReset;



