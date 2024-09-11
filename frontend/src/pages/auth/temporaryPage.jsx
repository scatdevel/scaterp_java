import React, { useState } from 'react';
import { Button, Typography, Input } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

export function TemporaryPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  const handleGoToReset = () => {
    if (token) {
      // Navigate to reset password page with the token as a query parameter
      navigate(`/auth/reset-password?token=${encodeURIComponent(token)}`);
    } else {
      console.error('Token is missing.');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-10 bg-white bg-opacity-90 rounded-lg shadow-lg z-10">
        <div className="text-center mb-6">
          <Typography variant="h4" className="font-bold mb-2 text-gray-800">Reset Link Sent!</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg">
            <b>Welcome, user!</b> Enter your email and click the reset link to reset your password.
          </Typography>
        </div>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="mb-4"
        />
        <Button
          onClick={handleGoToReset}
          disabled={email.length <= 1}  // Disable button if email length is 1 or less
          className="w-full mt-3 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200"
        >
          Go to Reset Password Page
        </Button>
      </div>
    </section>
  );
}

export default TemporaryPage;
