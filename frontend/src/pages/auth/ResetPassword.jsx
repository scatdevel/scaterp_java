import React, { useState } from 'react';
import { resetPassword } from '../../components/api';
import { Input, Button, Typography } from "@material-tailwind/react";
import { useLocation, useNavigate } from 'react-router-dom';

export function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setMessage('');
    setShowAlert(false);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setShowAlert(true);
      return;
    }

    try {
      await resetPassword({ token, newPassword });
      setMessage('Password reset successful. You can now log in with your new password.');
      setShowAlert(true);

      setTimeout(() => {
        navigate('/sign-in');
      }, 2000);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
      setShowAlert(true);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-10 bg-white bg-opacity-90 rounded-lg shadow-lg z-10">
        <div className="text-center mb-6">
          <Typography variant="h4" className="font-bold mb-2 text-gray-800">Reset Your Password</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg">
            Enter and confirm your new password.
          </Typography>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 mx-auto">
          <div>
            <Typography variant="small" color="blue-gray" className="font-medium mb-1">New Password</Typography>
            <Input
              type="password"
              size="lg"
              placeholder="Enter new password"
              className="border-gray-300 focus:border-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="font-medium mb-1">Confirm Password</Typography>
            <Input
              type="password"
              size="lg"
              placeholder="Confirm new password"
              className="border-gray-300 focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {showAlert && (
            <Typography variant="small" className={`mt-2 text-center ${error ? 'text-red-500' : 'text-green-500'}`}>
              {error || message}
            </Typography>
          )}
          <Button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200">
            Reset Password
          </Button>
        </form>
      </div>
      <div className="absolute inset-0 hidden lg:block">
        <img
          src="/img/farmers1.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 lg:hidden">
        <img
          src="/img/farmers1.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}

export default ResetPassword;
