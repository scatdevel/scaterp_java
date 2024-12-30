// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
// import { loginUser, loginAdmin } from '../../components/api';
// import { useTranslation } from 'react-i18next'; 
// import { useDispatch } from 'react-redux'; //  Import useDispatch
// import { login } from '../../redux/userslice'; // Adjust the path as needed
// import './i18n'; 

// export function SignIn({ setAuthenticated, setIsAdmin }) {
//   const { t, i18n } = useTranslation();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [alertMessage, setAlertMessage] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [error, setError] = useState(null);
//   const [agree, setAgree] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch(); // Initialize dispatch

//   useEffect(() => {
//     const authToken = localStorage.getItem('jwtToken');
//     const tokenExpiration = localStorage.getItem('tokenExpiration');
//     const currentTime = new Date().getTime();
//     if (authToken && tokenExpiration && currentTime < tokenExpiration) {
//       const role = localStorage.getItem('userRole');
//       navigate(role === 'admin' ? '/admin-dashboard/home' : '/dashboard/home');
//     }
//   }, [navigate]);

//   const isValid = formData.email.length > 0 && formData.password.length > 0 && agree;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     if (name === 'email') {
//       setEmailError(validateEmail(value) ? '' : 'Please enter a valid email.');
//     }
//   };

//   const handleAgreeChange = () => {
//     setAgree(!agree);
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setShowAlert(false); 
  
  //   try {
  //     const emailDomain = formData.email.split('@')[1];
  //     let token, role, userId;
  
  //     if (emailDomain === 'admin.com') {
  //       const response = await loginAdmin(formData);
  //       token = response.token;
  //       role = 'admin';
  //       userId = response.id;
  //       setIsAdmin(true);
  //     } else {
  //       const response = await loginUser(formData);
  //       token = response.token;
  //       role = 'user';
  //       userId = response.id;
  //       setIsAdmin(false);
  //     }

  //     localStorage.setItem('jwtToken', token);
  //     localStorage.setItem('userRole', role);
  //     localStorage.setItem('id', userId); 
  //     localStorage.setItem('tokenExpiration', new Date().getTime() + 3600000);

  //     // Dispatch the login action
  //     dispatch(login({ userId, role ,token}));
  //     console.log("token :", token);
      

  //     setAuthenticated(true);
  //     setAlertMessage('Login successful!');
  //     setError(null);
  //     setShowAlert(true);
  
  //     setTimeout(() => {
  //       navigate(role === 'admin' ? '/admin-dashboard/home' : '/dashboard/home');
  //     }, 1500);
  //   } catch (err) {
  //     console.error('Login error:', err.response ? err.response.data : err.message);
  //     setError('Invalid email or password. Please try again.');
  //     setAlertMessage('');
  //     setShowAlert(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { loginUser, loginAdmin } from '../../components/api';
import { useTranslation } from 'react-i18next'; 
import { useDispatch } from 'react-redux'; // Import useDispatch
import { login } from '../../redux/userslice'; // Adjust the path as needed
import './i18n'; 

export function SignIn({ setAuthenticated, setIsAdmin, setIsOutlet }) {
  const { t, i18n } = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [alertMessage, setAlertMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState(null);
  const [agree, setAgree] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
  const [phoneNumError, setPhoneNumError] = useState('');


  useEffect(() => {
    const authToken = localStorage.getItem('jwtToken');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const currentTime = new Date().getTime();
    if (authToken && tokenExpiration && currentTime < tokenExpiration) {
      const role = localStorage.getItem('userRole');
      // Adjust the redirect logic based on the user's role (admin, user, or outlet)
      navigate(role === 'admin' ? '/admin-dashboard/home' : role === 'outlet' ? '/outlet-dashboard/home' : '/dashboard/home');
    }
  }, [navigate]);

  const isValid = formData.phone.length > 0 && formData.password.length > 0 && agree;



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'phone') {
      if (value && value.length < 12) {
        // Remove any non-digit characters (if entered) and make sure it starts with +91
        let cleanedValue = value.replace(/\D/g, '');
        if (cleanedValue.length > 10) cleanedValue = cleanedValue.slice(0, 10); // Limit to 10 digits
        // If no +91 is entered, add it by default
        if (cleanedValue.length === 10 && !value.startsWith('+91')) {
          cleanedValue = '+91' + cleanedValue;
        }
        setFormData((prevData) => ({
          ...prevData,
          phone: cleanedValue,
        }));

        setPhoneNumError(validatePhoneNumber(cleanedValue) ? '' : 'Please enter a valid phone number.');
      } else {
        setPhoneNumError('Please enter a valid phone number.');
      }
    }

  
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

  const validatePhoneNumber = (phone) => {
    // A regex for validating Indian phone numbers (starting with +91 and followed by 10 digits)
    const phoneRegex = /^\+91\d{10}$/;
    return phoneRegex.test(phone);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowAlert(false);
  
    // Validate phone number
    if (!formData.phone || !validatePhoneNumber(formData.phone)) {
      setPhoneNumError('Please enter a valid phone number.');
      setLoading(false);
      return;
    }
  
    // Ensure password exists and isn't empty
    if (!formData.password || formData.password.length === 0) {
      setError('Please enter both phone number and password.');
      setShowAlert(true);
      setLoading(false);
      return;
    }
  
    try {
      let token, role, userId;
  
      // Logic to check user type (admin, outlet, etc.)
      if (formData.phone.includes('admin')) {
        const response = await loginAdmin(formData); 
        token = response.token;
        role = 'admin';
        userId = response.id;
        setIsAdmin(true);
      } else if (formData.phone.includes('outlet')) {
        const response = await loginUser(formData); 
        token = response.token;
        role = 'outlet';
        userId = response.id;
        setIsOutlet(true);
      } else {
        const response = await loginUser(formData); 
        token = response.token;
        role = 'user';
        userId = response.id;
        setIsAdmin(false);
        setIsOutlet(false);
      }
  
      // Store token and role in localStorage
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('id', userId); 
      localStorage.setItem('tokenExpiration', new Date().getTime() + 3600000); // 1 hour expiration
  
      // Dispatch login action to Redux store
      dispatch(login({ userId, role, token }));
  
      setAuthenticated(true);
      setAlertMessage('Login successful!');
      setError(null);
      setShowAlert(true);
  
      // Redirect based on role
      setTimeout(() => {
        navigate(role === 'admin' ? '/admin-dashboard/home' : role === 'outlet' ? '/outlet-dashboard/home' : '/dashboard/home');
      }, 1500);
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError('Invalid phone number or password. Please try again.');
      setAlertMessage('');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };
  
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <section className="relative flex min-h-screen flex-col lg:flex-row">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 flex space-x-2 z-20">
        <img
          src="/img/en-flag.png"
          alt="English"
          className="w-8 h-8 cursor-pointer border border-gray-300 rounded-full shadow-sm"
          onClick={() => changeLanguage('en')}
        />
        <img
          src="/img/ta-flag.png"
          alt="Tamil"
          className="w-8 h-8 cursor-pointer border border-gray-300 rounded-full shadow-sm"
          onClick={() => changeLanguage('ta')}
        />
      </div>

     
      

        {/* Left Side: Image covering left section */}
      <div className="w-full lg:w-1/2 h-screen flex items-center justify-center overflow-hidden relative">
        {/* Scat Logo on top of the image */}
        <img 
          src="/img/Scat-web-logo.svg"
          alt="Scat Logo"
          className="absolute top-4 left-4 w-45 h-10 z-10" // Position logo on top-left of the image
        />
        <img 
          src="/img/3.png" 
          alt="Image" 
          className="w-full h-full object-cover" // Use object-cover to ensure it fills the space
        />
      </div>

      {/* Right Side: SignIn Form */}
      <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center items-center px-6 lg:px-12 bg-white bg-opacity-90">
        <div className="text-center mb-6">
          <Typography variant="h4" className="font-bold mb-2">{t('signIn')}</Typography>
          {/* <Typography variant="paragraph" color="blue-gray" className="text-lg">
            {t('Enter your Email and password to Sign In.')}
          </Typography> */}
           <div className="text-center mt-2">
            <Typography variant="paragraph" className="text-blue-gray-500 font-medium">
              {t('notRegistered')} 
              <Link to="/auth/sign-up" className="bold text-blue-600 transition-colors hover:text-blue-800">
                {t('createAccount')}
              </Link>
            </Typography>
          </div>
        </div>

       
          {/* <div>
            <Typography variant="small" color="blue-gray" className="font-medium mb-1">{t('Email')}</Typography>
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
          </div> */}

<form onSubmit={handleSubmit} className="space-y-6 mx-auto max-w-md">
<div>
    <Typography variant="small" color="blue-gray" className="font-medium mb-1">{t('Phone Number')}</Typography>
    <Input
      size="lg"
      placeholder="+91 XXXXXXXXXX"
      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
      labelProps={{
        className: "before:content-none after:content-none",
      }}
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      required
    />
    {phoneNumError && <Typography variant="small" color="red" className="mt-1 text-sm">{phoneNumError}</Typography>}
  </div>
          <div className="relative">
  <div className="mt-6 flex justify-between items-center ">
    <Typography variant="small" color="blue-gray" className="font-medium mb-1">{t('Password')}</Typography>
    
    {/* Forgot Password link aligned to the right */}
    <Typography variant="paragraph" className="text-blue-gray-500 font-medium ml-4">
      <Link to="/auth/forgot-password" className="bold text-blue-600 transition-colors hover:text-blue-800">
        {t('forgotPassword')}
      </Link>
    </Typography>
  </div>

  <div className="relative mt-2">
    <Input
      type={passwordVisible ? 'text' : 'password'}
      size="lg"
      placeholder="********"
      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
      labelProps={{ className: "before:content-none after:content-none" }}
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
    />
    
    {/* Eye Icon */}
    <button
      type="button"
      className="absolute right-3 top-1/2 transform -translate-y-1/2" // Keep the vertical centering
      onClick={() => setPasswordVisible(!passwordVisible)}
    >
      {/* Font Awesome Eye Icon */}
      <i className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} w-6 h-6`} aria-hidden="true"></i>
    </button>
  </div>
</div>

          {/* <div className="relative">
          <div className="mt-6 flex justify-between items-center">
          <Typography variant="paragraph" className="text-blue-gray-500 font-medium">
              
              <Link to="/auth/forgot-password" className="bold text-blue-600 transition-colors hover:text-blue-800">
                {t('forgotPassword')}
              </Link>
            </Typography>
          </div>
  <Typography variant="small" color="blue-gray" className="font-medium mb-1">{t('Password')}</Typography>
  <Input
    type={passwordVisible ? 'text' : 'password'}
    size="lg"
    placeholder="********"
    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
    labelProps={{ className: "before:content-none after:content-none" }}
    name="password"
    value={formData.password}
    onChange={handleChange}
    required
  />
    <button
      type="button"
      className="absolute right-3 top-1/2 transform -translate-y-1/2" // Adjust the vertical centering
      onClick={() => setPasswordVisible(!passwordVisible)}
    >
      {/* Font Awesome Eye Icon */}
      {/* <i className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} w-6 h-6`} aria-hidden="true"></i>
    </button>
</div>  */}
          <Checkbox
            checked={agree}
            onChange={handleAgreeChange}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-medium"
              >
                {t('agreeTerms')}&nbsp;
                <a
                  href="#"
                  className="font-normal text-blue-600 transition-colors hover:text-blue-800 underline"
                >
                  {t('Terms and Conditions')}
                </a>
              </Typography>
            }
          />
          <Button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-500 hover:bg-gradient-to-l text-white rounded-lg shadow-md"
            disabled={!isValid || loading}
          >
            {loading ? 'Signing in...' : t('signIn')}
          </Button>

          {showAlert && (
            <div className={`alert shadow-blue-500/40 hover:shadow-indigo-500/40 mt-6 content-center text-black text-center rounded-lg ${error ? 'bg-red-300' : 'bg-green-300'}`}>
              {error || alertMessage}
            </div>
          )}


         
        </form>
      </div>
    </section>
  );
}

export default SignIn;
