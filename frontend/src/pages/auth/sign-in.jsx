import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { loginUser, loginAdmin } from '../../components/api';

export function SignIn({ setAuthenticated, setIsAdmin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [alertMessage, setAlertMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState(null);
  const [agree, setAgree] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('jwtToken');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const currentTime = new Date().getTime();
    if (authToken && tokenExpiration && currentTime < tokenExpiration) {
      const role = localStorage.getItem('userRole');
      navigate(role === 'admin' ? '/admin-dashboard/home' : '/dashboard/home');
    }
  }, [navigate]);

  const isValid = formData.email.length > 0 && formData.password.length > 0 && agree;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'email') {
      setEmailError(validateEmail(value) ? '' : 'Please enter a valid email.');
    }
  };

  const handleAgreeChange = () => {
    setAgree(!agree);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowAlert(false); // Reset alert visibility
  
    try {
      const emailDomain = formData.email.split('@')[1];
      let token, role;
  
      if (emailDomain === 'admin.com') {
        ({ token, role } = await loginAdmin(formData));
        setIsAdmin(true);
        role = 'admin';
      } else {
        ({ token, role } = await loginUser(formData));
        setIsAdmin(false);
        role = 'user';
      }
  
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('tokenExpiration', new Date().getTime() + 3600000);
  
      setAuthenticated(true);
      setAlertMessage('Login successful!');
      setError(null);
      setShowAlert(true);
  
      setTimeout(() => {
        navigate(role === 'admin' ? '/admin-dashboard/home' : '/dashboard/home');
      }, 1500);
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError('Invalid email or password. Please try again.');
      setAlertMessage('');
      setShowAlert(true);
    } finally {
      setLoading(false);
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
          <Button type="submit" className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-500 hover:bg-gradient-to-l text-white rounded-lg shadow-md" disabled={!isValid || loading}>
            {loading ? 'Signing in...' : 'Sign In'}
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
