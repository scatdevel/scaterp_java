import React, { useState } from 'react';
import { Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// import qs from 'qs'; // Import qs to stringify the form data

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const sendPasswordReset = async (emailData) => {
    try {
      const response = await axios.post('http://localhost:8080/users/forgot-password',
        new URLSearchParams(emailData).toString(), // Manually encode emailData
        {
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded' 
          }
        }
      );
      const {token} = response.data; 
      localStorage.setItem('token', token);
    return response;
      
    } catch (error) {
      console.error('Error sending password reset link:', error.response?.data || error.message);
      throw error;
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setMessage('');
    setShowAlert(false);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setShowAlert(true);
      return;
    }

    try {
      const response = await sendPasswordReset({ email });
      if (response.status === 200) {
        setMessage('Password reset link sent successfully. Please check your email.');
        setShowAlert(true);

        setTimeout(() => {
          navigate('/temporary'); // Navigate to the TemporaryPage
        }, 2000);
      }
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
      setShowAlert(true);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-10 bg-white bg-opacity-90 rounded-lg shadow-lg z-10">
        <div className="flex justify-center mb-6">
          <img src="/img/logo_scat.png" className="w-28" alt="Logo" />
        </div>
        <div className="text-center mb-6">
          <Typography variant="h4" className="font-bold mb-2 text-gray-800">Find Your Account</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg">
            Enter your email address to receive a password reset link.
          </Typography>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 mx-auto">
          <div>
            <Typography variant="small" color="blue-gray" className="font-medium mb-1">Your email</Typography>
            <Input
              type="email"
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <Typography variant="small" color="red" className="mt-1 text-sm">{emailError}</Typography>}
          </div>
          {showAlert && (
            <Typography variant="small" className={`mt-2 text-center ${error ? 'text-red-500' : 'text-green-500'}`}>
              {error || message}
            </Typography>
          )}
          <Button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200">
            Send Reset Link
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

export default ForgotPassword;