import React, { useState, useEffect } from 'react';
import { registerUser } from '../../components/api';
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [alertMessage, setAlertMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [agree, setAgree] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  // Validate email when formData.email changes
  useEffect(() => {
    if (formData.email && !validateEmail(formData.email)) {
      setEmailError('Invalid email address.');
    } else {
      setEmailError('');
    }
  }, [formData.email]);

  const isValid = formData.email.length > 0 && formData.password.length > 0 && agree && !emailError;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
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

    if (emailError) {
      setShowAlert(true);
      return;
    }

    try {
      await registerUser(formData);
      setSuccess(true);
      setAlertMessage('Registration successful! Redirecting to login...');
      setShowAlert(true);
      setTimeout(() => {
        navigate('/sign-in');
      }, 2000); // Redirect to login after 2 seconds
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.message}`);
      } else if (err.request) {
        setError('Error: No response from server');
      } else {
        setError(`Error: ${err.message}`);
      }
      setAlertMessage('Registration failed. Please try again.');
      setShowAlert(true);
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="flex justify-center items-center">
          <img src="/img/logo_scat.png" className="width-[30%]" alt="Logo" />
        </div>

        <div className="text-center">
          <Typography variant="h4" className="font-bold mb-4">Sign Up</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your details to create your account.
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your username"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
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
            {emailError && <Typography variant="small" color="red">{emailError}</Typography>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
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
                className="flex items-center justify-start font-medium"
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
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6" fullWidth disabled={!isValid}>
            Sign Up
          </Button>

          {showAlert && (
            <div className={`alert shadow-blue-500/40 hover:shadow-indigo-500/40 mt-6 content-center text-black text-center rounded-lg ${success ? 'bg-green-300' : 'bg-red-300'}`}>
              {error || alertMessage}
            </div>
          )}

          <div className="space-y-4 mt-8">
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1156_824)">
                  <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                  <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                  <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                  <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_1156_824">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </Button>
          </div>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?&nbsp;
            <Link
              to="/sign-in"
              className="font-medium text-black transition-colors hover:text-gray-900"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </div>
      <div className="relative hidden lg:block w-full lg:w-2/5">
        <img
          src="/img/Farmer3.jpeg"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}

export default SignUp;

