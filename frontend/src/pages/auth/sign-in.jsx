import React, { useState, useEffect } from 'react';
import { loginUser } from '../../components/api';
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

export function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState(null);
  const [agree, setAgree] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const currentTime = new Date().getTime();
    if (authToken && tokenExpiration && currentTime < tokenExpiration) {
      navigate('/dashboard/home');
    }
  }, [navigate]);

  const isValid = formData.email.length > 0 && formData.password.length > 0 && agree;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'email') {
      if (!validateEmail(value)) {
        setEmailError('Please enter a valid email.');
      } else {
        setEmailError('');
      }
    }
  };

  const handleAgreeChange = () => {
    setAgree(!agree);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (formData.email && !validateEmail(formData.email)) {
      setEmailError('Please enter a valid email.');
    } else {
      setEmailError('');
    }
  }, [formData.email]);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email.');
      setError(null);
      setAlertMessage('');
      setShowAlert(true);
      return;
    }
  
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setEmailError('');
      setAlertMessage('');
      setShowAlert(true);
      return;
    }
  
    try {
      console.log('Submitting form with data:', formData);
      const token = await loginUser(formData);
      console.log('Login successful, received token:', token);
  
      const expirationTime = new Date().getTime() + (60 * 60 * 1000); // Token valid for 1 hour
      localStorage.setItem('authToken', token); // Store the token
      localStorage.setItem('tokenExpiration', expirationTime); // Store expiration time
  
      setAlertMessage('Login successful!');
      setError(null);
      setEmailError('');
      setShowAlert(true);
  
      setTimeout(() => {
        navigate('/dashboard/home');
      }, 1000);
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password.');
      } else {
        setError('An error occurred. Please try again later.');
      }
      setEmailError('');
      setAlertMessage('');
      setShowAlert(true);
    }
  };
  

  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="lg:w-1/2 p-8 lg:p-16 bg-white bg-opacity-90 rounded-lg shadow-lg z-10">
        <div className="flex justify-center mb-8">
          <img src="/img/logo_scat.png" className="w-24" alt="Logo" />
        </div>
        <div className="text-center mb-8">
          <Typography variant="h4" className="font-bold mb-2">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg">
            Enter your Email and password to Sign In.
          </Typography>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 mx-auto max-w-md">
          <div>
            <Typography variant="small" color="blue-gray" className="font-medium mb-1">Email</Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {emailError && <Typography variant="small" color="red" className="mt-1 text-sm">{emailError}</Typography>}
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="font-medium mb-1">Password</Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Checkbox
            checked={agree}
            onChange={handleAgreeChange}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-medium"
              >
                I agree to the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
          />
          <Button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white" disabled={!isValid}>
            Sign In
          </Button>
          
          {showAlert && (
            <div className={`alert shadow-blue-500/40 hover:shadow-indigo-500/40 mt-6 content-center text-black text-center rounded-lg ${error ? 'bg-red-300' : 'bg-green-300'}`}>
              {error || alertMessage}
            </div>
          )}

          <div className="mt-6 text-center">
            <Typography variant="paragraph" className="text-blue-gray-500 font-medium">
              Forgot your password?
              <Link to="/auth/forgot-password" className="text-gray-900 ml-1 underline">
                Reset it here
              </Link>
            </Typography>
          </div>

          <div className="text-center mt-2">
            <Typography variant="paragraph" className="text-blue-gray-500 font-medium">
              Not registered?
              <Link to="/auth/sign-up" className="text-gray-900 ml-1 underline">
                Create an account
              </Link>
            </Typography>
          </div>
        </form>
      </div>
      <div className="absolute inset-0 lg:hidden">
        <img
          src="/img/farmers1.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 hidden lg:block">
        <img
          src="/img/farmers1.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}

export default SignIn;
