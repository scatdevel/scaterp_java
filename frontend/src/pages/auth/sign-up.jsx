// import React, { useState, useEffect } from 'react';
// import { registerUser, fetchRoles } from '../../components/api'; 
// import { Input, Checkbox, Button, Typography, Select, Option } from "@material-tailwind/react";
// import { Link, useNavigate } from "react-router-dom";
// import { useTranslation } from 'react-i18next';
// import './i18n'; 

// export function SignUp() {
//   const { t, i18n } = useTranslation();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     roleId: '' 
//   });

//   const [roles, setRoles] = useState([]); 
//   const [alertMessage, setAlertMessage] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [agree, setAgree] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function loadRoles() {
//       try {
//         const rolesData = await fetchRoles(); 
//         setRoles(rolesData);
//       } catch (error) {
//         console.error('Failed to fetch roles:', error);
//       }
//     }
//     loadRoles();
//   }, []);

//   useEffect(() => {
//     if (formData.email && !validateEmail(formData.email)) {
//       setEmailError(t('invalidEmailAddress'));
//     } else {
//       setEmailError('');
//     }
//   }, [formData.email, t]);

//   const isValid = formData.email.length > 0 && formData.password.length > 0 && agree && !emailError && formData.roleId;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleAgreeChange = () => {
//     setAgree(!agree);
//   };

//   const handleRoleChange = (value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       roleId: value
//     }));
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (emailError) {
//       setShowAlert(true);
//       return;
//     }

//     try {
//       await registerUser(formData); 
//       setSuccess(true);
//       setAlertMessage(t('registrationSuccess'));
//       setShowAlert(true);
//       setTimeout(() => {
//         navigate('/sign-in');
//       }, 2000); 
//     } catch (err) {
//       if (err.response) {
//         setError(`Error: ${err.response.data.message}`);
//       } else if (err.request) {
//         setError('Error: No response from server');
//       } else {
//         setError(`Error: ${err.message}`);
//       }
//       setAlertMessage(t('registrationFailed'));
//       setShowAlert(true);
//     }
//   };

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <section className="relative flex flex-col lg:flex-row items-center justify-center h-screen bg-gray-100">
      
//       <div className="absolute top-4 right-4 flex space-x-2 z-20">
//         <img
//           src="/img/en-flag.png"
//           alt="English"
//           className="w-8 h-8 cursor-pointer border border-gray-300 rounded-full shadow-sm"
//           onClick={() => changeLanguage('en')}
//         />
//         <img
//           src="/img/ta-flag.png"
//           alt="Tamil"
//           className="w-8 h-8 cursor-pointer border border-gray-300 rounded-full shadow-sm"
//           onClick={() => changeLanguage('ta')}
//         />
//       </div>
//       <div className="lg:w-1/2 p-8 lg:p-16 bg-white bg-opacity-90 rounded-lg shadow-lg z-10">
//         <div className="flex justify-center mb-8">
//   <img src="/img/Scat-web-logo.svg" className="w-45 h-10" alt="Logo" />
// </div>
//         <div className="text-center mb-8">
//           <Typography variant="h4" className="font-bold mb-2">{t('signUp')}</Typography>
//           <Typography variant="paragraph" color="blue-gray" className="text-lg">
//             {t('enterDetails')}
//           </Typography>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-6 mx-auto max-w-md">
//           <div>
//             <Typography variant="small" color="blue-gray" className="font-medium mb-1">{t('Username')}</Typography>
//             <Input
//               size="lg"
//               placeholder={t('username')}
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <Typography variant="small" color="blue-gray" className="font-medium mb-1">{t('Email')}</Typography>
//             <Input
//               size="lg"
//               placeholder="name@mail.com"
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             {emailError && <Typography variant="small" color="red" className="mt-1 text-sm">{emailError}</Typography>}
//           </div>
//           <div>
//             <Typography variant="small" color="blue-gray" className="font-medium mb-1">{t('Password')}</Typography>
//             <Input
//               type="password"
//               size="lg"
//               placeholder="********"
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <Typography variant="small" color="blue-gray" className="font-medium mb-1">{t('role')}</Typography>
//             <Select
//               size="lg"
//               placeholder={t('role')}
//               value={formData.roleId}
//               onChange={handleRoleChange}
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//             >
//               {roles.map((role) => (
//                 <Option key={role.id} value={role.id}>
//                   {role.name}
//                 </Option>
//               ))}
//             </Select>
//           </div>
//           <Checkbox
//             checked={agree}
//             onChange={handleAgreeChange}
//             label={
//               <Typography
//                 variant="small"
//                 color="gray"
//                 className="flex items-center font-medium"
//               >
//                 {t('agreeTerms')}&nbsp;
//                 <a
//                   href="#"
//                   className="font-normal text-blue-600 transition-colors hover:text-blue-800 underline"
//                 >
//                   {t('Terms and Conditions')}
//                 </a>
//               </Typography>
//             }
//           />
      

// <Button type="submit" className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-500 hover:bg-gradient-to-l text-white rounded-lg shadow-md" disabled={!isValid}>
//   {t('signUp')}
// </Button>

//           {showAlert && (
//             <div className={`alert shadow-blue-500/40 hover:shadow-indigo-500/40 mt-6 content-center text-black text-center rounded-lg ${success ? 'bg-green-300' : 'bg-red-300'}`}>
//               {error || alertMessage}
//             </div>
//           )}
//           <div className="mt-6 text-center">
//             <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md w-full border border-gray-300">
//               <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <g clipPath="url(#clip0_1156_824)">
//                   <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
//                   <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
//                   <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
//                   <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_1156_824">
//                     <rect width="16" height="16" fill="white" transform="translate(0.5)" />
//                   </clipPath>
//                 </defs>
//               </svg>
//               {t('Continue with Google')}
//             </Button>
//           </div>
//           <Typography color="gray" className="mt-4 text-center font-normal">
//             {t('alreadyHaveAccount')}&nbsp;
//             <Link
//               to="/sign-in"
//               className="font-medium text-black transition-colors hover:text-gray-900"
//             >
//               {t('signIn')}
//             </Link>
//           </Typography>
//         </form>
//       </div>
//       <div className="absolute inset-0 lg:hidden">
//         <img
//           src="/img/farmers1.jpg"
//           alt="Background"
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className="absolute inset-0 hidden lg:block">
//         <img
//           src="/img/farmers1.jpg"
//           alt="Background"
//           className="w-full h-full object-cover"
//         />
//       </div>
//     </section>
//   );
// }

// export default SignUp;
// import React, { useState, useEffect } from 'react';
// import { registerUser, fetchRoles } from '../../components/api'; 
// import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
// import { Link, useNavigate } from "react-router-dom";
// import { useTranslation } from 'react-i18next';
// import Select from 'react-select';  // Import React Select
// import './i18n';  

// export function SignUp() {
//   const { t, i18n } = useTranslation();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     roleId: '' 
//   });
//   const [passwordVisible, setPasswordVisible] = useState(false); 
//   const [roles, setRoles] = useState([]); 
//   const [alertMessage, setAlertMessage] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [agree, setAgree] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function loadRoles() {
//       try {
//         const rolesData = await fetchRoles(); 
//         setRoles(rolesData);
//       } catch (error) {
//         console.error('Failed to fetch roles:', error);
//       }
//     }
//     loadRoles();
//   }, []);

//   useEffect(() => {
//     if (formData.email && !validateEmail(formData.email)) {
//       setEmailError(t('invalidEmailAddress'));
//     } else {
//       setEmailError('');
//     }
//   }, [formData.email, t]);

//   const isValid = formData.email.length > 0 && formData.password.length > 0 && agree && !emailError && formData.roleId;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };
//   const handleRoleChange = (selectedOption) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       roleId: selectedOption ? selectedOption.value : ''
//     }));
//   };

//   const handleAgreeChange = () => {
//     setAgree(!agree);
//   };



//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (emailError) {
//       setShowAlert(true);
//       return;
//     }

//     try {
//       await registerUser(formData); 
//       setSuccess(true);
//       setAlertMessage(t('registrationSuccess'));
//       setShowAlert(true);
//       setTimeout(() => {
//         navigate('/sign-in');
//       }, 2000); 
//     } catch (err) {
//       if (err.response) {
//         setError(`Error: ${err.response.data.message}`);
//       } else if (err.request) {
//         setError('Error: No response from server');
//       } else {
//         setError(`Error: ${err.message}`);
//       }
//       setAlertMessage(t('registrationFailed'));
//       setShowAlert(true);
//     }
//   };

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };
//   const roleOptions = roles.map(role => ({
//     value: role.id,
//     label: role.name
//   }));

//   return (
//     <section className="relative flex items-center justify-center h-screen">
      
//       <div className="absolute top-4 right-4 flex space-x-2 z-20">
//         <img
//           src="/img/en-flag.png"
//           alt="English"
//           className="w-8 h-8 cursor-pointer border border-gray-300 rounded-full shadow-sm"
//           onClick={() => changeLanguage('en')}
//         />
//         <img
//           src="/img/ta-flag.png"
//           alt="Tamil"
//           className="w-8 h-8 cursor-pointer border border-gray-300 rounded-full shadow-sm"
//           onClick={() => changeLanguage('ta')}
//         />
//       </div>
      
//   {/* Left Side: Image covering left section */}
//   <div className="w-full lg:w-1/2 h-full flex items-center justify-center overflow-hidden relative">
//         <img 
//           src="/img/Scat-web-logo.svg"
//           alt="Scat Logo"
//           className="absolute top-4 left-4 w-45 h-10 z-10" // Position logo on top-left of the image
//         />
//         <img 
//           src="/img/3.png" 
//           alt="Image" 
//           className="w-full h-full object-cover" // Use object-cover to ensure it fills the space
//         />
//       </div>

//       {/* Right Side: SignUp Form */}
//       <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center px-6 lg:px-12 bg-white bg-opacity-90">
//         <div className="text-center mb-6">
//           <Typography variant="h5" className="font-bold mb-2">{t('createAccount')}</Typography>
//           <Typography variant="paragraph" color="blue-gray" className="text-base">
//             {t('enterDetails')}
//           </Typography>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-6 mx-auto max-w-md">
//           <div>
//             <Typography variant="small" color="blue-gray" className="font-medium mb-1">{t('Username')}</Typography>
//             <Input
//               size="lg"
//               placeholder={t('username')}
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <Typography variant="small" color="blue-gray" className="font-medium mb-1">{t('Email')}</Typography>
//             <Input
//               size="lg"
//               placeholder="name@mail.com"
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             {emailError && <Typography variant="small" color="red" className="mt-1 text-sm">{emailError}</Typography>}
//           </div>
//           <div className="relative">
//   <Typography variant="small" color="blue-gray" className="font-medium mb-1">{t('Password')}</Typography>
//   <Input
//     type={passwordVisible ? 'text' : 'password'}
//     size="lg"
//     placeholder="********"
//     className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//     labelProps={{ className: "before:content-none after:content-none" }}
//     name="password"
//     value={formData.password}
//     onChange={handleChange}
//     required
//   />
//   <button
//     type="button"
//     className="absolute right-3 top-1/2 transform -translate-y-1/10" // Keep the vertical centering
//     onClick={() => setPasswordVisible(!passwordVisible)}
//   >
//     {/* Font Awesome Eye Icon */}
//     <i className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} w-6 h-6`} aria-hidden="true"></i>
//   </button>
// </div>
//    {/* Phone number input with India country code */}
//    <div>
//             <Typography variant="small" color="blue-gray" className="font-medium mb-1">{t('Phone Number')}</Typography>
//             <Input
//               size="lg"
//               placeholder="+91 XXXXXXXXXX"
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//           </div>
//             {/* Role Dropdown with React Select */}
//             <div>
//             <Typography variant="small" color="blue-gray" className="font-medium mb-1 flex items-center">
//               {t('role')}
//               <span className="text-red-500 ml-1">*</span> {/* Red asterisk for required field */}
//             </Typography>

//             <Select
//               options={roleOptions}
//               value={roleOptions.find(option => option.value === formData.roleId)}
//               onChange={handleRoleChange}
//               placeholder={t('select')}
//               className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
//             />
//           </div>
//           <Checkbox
//             checked={agree}
//             onChange={handleAgreeChange}
//             label={
//               <Typography
//                 variant="small"
//                 color="gray"
//                 className="flex items-center font-medium"
//               >
//                 {t('agreeTerms')}&nbsp;
//                 <a
//                   href="#"
//                   className="font-normal text-blue-600 transition-colors hover:text-blue-800 underline"
//                 >
//                   {t('Terms and Conditions')}
//                 </a>
//               </Typography>
//             }
//           />
      

// <Button type="submit" className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-500 hover:bg-gradient-to-l text-white rounded-lg shadow-md" disabled={!isValid}>
//   {t('signUp')}
// </Button>

//           {showAlert && (
//             <div className={`alert shadow-blue-500/40 hover:shadow-indigo-500/40 mt-6 content-center text-black text-center rounded-lg ${success ? 'bg-green-300' : 'bg-red-300'}`}>
//               {error || alertMessage}
//             </div>
//           )}
//           {/* <div className="mt-6 text-center">
//             <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md w-full border border-gray-300">
//               <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <g clipPath="url(#clip0_1156_824)">
//                   <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
//                   <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
//                   <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
//                   <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_1156_824">
//                     <rect width="16" height="16" fill="white" transform="translate(0.5)" />
//                   </clipPath>
//                 </defs>
//               </svg>
//               {t('Continue with Google')}
//             </Button>
//           </div> */}
//           <Typography color="gray" className="mt-4 text-center font-normal">
//             {t('alreadyHaveAccount')}&nbsp;
//             <Link
//               to="/sign-in"
//               className="font-medium text-black transition-colors hover:text-gray-900"
//             >
//               {t('signIn')}
//             </Link>
//           </Typography>
//         </form>
//       </div>
//     </section>
//   );
// }

// export default SignUp;



import React, { useState, useEffect } from 'react';
import { registerUser, fetchRoles } from '../../components/api'; 
import { Input, Dialog, DialogBody, DialogFooter, Checkbox, Button, Typography } from "@material-tailwind/react";
// import { Dialog, DialogBody, DialogFooter, Button, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';


import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Select from 'react-select';  // Import React Select
import './i18n';  

export function SignUp() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '', // Added phone number
    aadharCardNumber:'',//aadharCard Number
    aadharImageUrl_1: '', // Added Aadhaar front card
    aadharImageUrl_2: '', // Added Aadhaar back card
    farmerCardNumber:'',
    farmerCardImage:'',
    roleId: ''
  });
  
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [roles, setRoles] = useState([]); 
  const [alertMessage, setAlertMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [agree, setAgree] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [frontAadharFile, setFrontAadharFile] = useState(null);
const [backAadharFile, setBackAadharFile] = useState(null);
const [frontAadharPreview, setFrontAadharPreview] = useState(null);
const [backAadharPreview, setBackAadharPreview] = useState(null);
const [showDialog, setShowDialog] = useState(false);
const [showFcDialog, setShowFcDialog] = useState(false);
const [farmerCardPreview, setFarmerCardPreview] = useState(null);


const [showFullImage, setShowFullImage] = useState(null);


  const navigate = useNavigate();

  const handleUploadFc = () => {
    // You can implement your upload functionality here.
    // For now, we'll close the dialog after selecting the files
    setShowFcDialog(false);
    setSuccess("Files uploaded successfully.");
  };

  const handleUpload = () => {
    // You can implement your upload functionality here.
    // For now, we'll close the dialog after selecting the files
    setShowDialog(false);
    setSuccess("Files uploaded successfully.");
  };


// Handle file change for both front and back images
const handleFileChange = (e, side) => {
  const file = e.target.files[0];
  if (side === "front") {
    setFrontAadharPreview(URL.createObjectURL(file));
    setFormData(prevState => ({
      ...prevState,
      aadharImageUrl_1: file // Save the file object in the formData state
    }));
  } else if (side === "back") {
    setBackAadharPreview(URL.createObjectURL(file));
    setFormData(prevState => ({
      ...prevState,
      aadharImageUrl_2: file // Save the file object in the formData state
    }));
  }
  else if (side === "farmerCard") {
    setFarmerCardPreview(URL.createObjectURL(file));
    setFormData(prevState => ({
      ...prevState,
      farmerCardImage: file // Save the file object in the formData state
    }));
  }
};


  const handleDelete = (type) => {
    if (type === 'front') {
      setFrontAadharPreview(null);
    } else {
      setBackAadharPreview(null);
    }
  };

  const handleDeleteFc = (type) => {
    if (type === 'farmerCard') {
      setFarmerCardPreview(null);
    } else {
      setFarmerCardPreview(null);
    }
  };

  const handleShowFullImage = (type) => {
    if (type === 'front') {
      setShowFullImage(frontAadharPreview);
    } else {
      setShowFullImage(backAadharPreview);
    }
  };
  const handleShowFullImageFc = (type) => {
    if (type === 'farmerCard') {
      setShowFullImage(farmerCardPreview);
    } else {
      setShowFullImage(backAadharPreview);
    }
  };
  


  useEffect(() => {
    async function loadRoles() {
      try {
        const rolesData = await fetchRoles(); 
        setRoles(rolesData);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    }
    loadRoles();
  }, []);

  useEffect(() => {
    if (formData.email && !validateEmail(formData.email)) {
      setEmailError(t('invalidEmailAddress'));
    } else {
      setEmailError('');
    }
  }, [formData.email, t]);

  const isValid = formData.email.length > 0 && formData.password.length > 0 && agree && !emailError && formData.roleId;

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value
  //   }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // If the input is for AadharCardNumber, apply formatting
    if (name === "aadharCardNumber") {
      // Remove any non-digit characters
      let formattedValue = value.replace(/\D/g, "");
  
      // Split the value into 4-digit chunks
      let chunks = [];
      for (let i = 0; i < formattedValue.length; i += 4) {
        chunks.push(formattedValue.slice(i, i + 4));
      }
  
      // Join the chunks with a space
      formattedValue = chunks.join(" ");
  
      // Update the state with formatted value
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedValue
      }));
    } else {
      // For other form fields, just update the value directly
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };
  

  const handleRoleChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      roleId: selectedOption ? selectedOption.value : ''
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
  
    // Create a FormData object to hold the form data and files
    const formDataToSend = new FormData();
    
    // Append form data fields
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('aadharCardNumber', formData.aadharCardNumber);
    formDataToSend.append('roleId', formData.roleId);
    formDataToSend.append('farmerCardNumber', formData.farmerCardNumber);

  
    // Append image files (Aadhar Card images)
    if (formData.aadharImageUrl_1) {
      formDataToSend.append('aadharImageUrl_1', formData.aadharImageUrl_1);
    }
    if (formData.aadharImageUrl_2) {
      formDataToSend.append('aadharImageUrl_2', formData.aadharImageUrl_2);
    }
    if (formData.farmerCardImage) {
      formDataToSend.append('farmerCardImage', formData.farmerCardImage);
    }
  
    // Send the request with FormData
    try {
      await registerUser(formDataToSend); // Assuming `registerUser` can handle FormData
      setSuccess(true);
      setAlertMessage(t('registrationSuccess'));
      setShowAlert(true);
      setTimeout(() => {
        navigate('/sign-in');
      }, 2000);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.message}`);
      } else if (err.request) {
        setError('Error: No response from server');
      } else {
        setError(`Error: ${err.message}`);
      }
      setAlertMessage(t('registrationFailed'));
      setShowAlert(true);
    }
  };
  

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const roleOptions = roles.map(role => ({
    value: role.id,
    label: role.name
  }));

  return (
    <section className="relative flex items-center justify-center h-screen">
      
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
  <div className="w-full lg:w-1/2 h-full flex items-center justify-center overflow-hidden relative">
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

      {/* Right Side: SignUp Form */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center px-6 lg:px-12 bg-white bg-opacity-90">
        <div className="text-center mb-6">
          <Typography variant="h5" className="font-bold mb-2">{t('createAccount')}</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-base">
            {t('enterDetails')}
          </Typography>
        </div>
        {/* <form onSubmit={handleSubmit} className="space-y-6 mx-auto max-w-md"> */}
        <div className="overflow-y-auto max-h-[80vh] w-full scrollbar-hidden">

        <form onSubmit={handleSubmit} className="space-y-6 mx-auto max-w-md overflow-y-auto max-h-[500px] scroll-smooth">

          <div>
            <Typography variant="small" color="blue-gray" className="font-medium mb-1">{t('Username')}</Typography>
            <Input
              size="lg"
              placeholder={t('username')}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
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
          </div>
          <div className="relative">
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
    className="absolute right-3 top-1/2 transform -translate-y-1/10" // Keep the vertical centering
    onClick={() => setPasswordVisible(!passwordVisible)}
  >
    {/* Font Awesome Eye Icon */}
    <i className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} w-6 h-6`} aria-hidden="true"></i>
  </button>
</div>

   {/* Phone number input with India country code */}
   <div>
            <Typography variant="small" color="blue-gray" className="font-medium mb-1">{t('Phone Number')}</Typography>
            <Input
              size="lg"
              placeholder="+91 XXXXXXXXXX"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

             {/* AadharCard Number input with India country code */}
   <div>
            <Typography variant="small" color="blue-gray" className="font-medium mb-1">{t('AadharCard Number')}</Typography>
            <Input
              size="lg"
              placeholder=""
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              // labelProps={{
              //   className: "before:content-none after:content-none",
              // }}
              name="aadharCardNumber"
              value={formData.aadharCardNumber}
              // type='number'
              onChange={handleChange}
              required
            />
          </div>

          
          
  {/* Aadhar Card Details with image */}
  <div>
  <Button
  type="button"
  className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-500 hover:bg-gradient-to-l text-white rounded-lg shadow-md flex items-center justify-center gap-2"
  onClick={() => setShowDialog(true)}
>
  {/* Add the FontAwesome Icon */}
  <FontAwesomeIcon icon={faCloudArrowUp} className="w-5 h-5" />
  {t('upload Aadhar Card')}
</Button>
      <div className="mt-4">
        {/* Front Aadhar Card */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, 'front')}
          style={{ display: 'none' }}
          id="front-aadhar-upload"
        />

        {/* Back Aadhar Card */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, 'back')}
          style={{ display: 'none' }}
          id="back-aadhar-upload"
        />

        {/* Image Previews in a Horizontal Line */}
        <div className="mt-4 flex flex-row space-x-4">
          {frontAadharPreview && (
            <div className="relative group">
              <img
                src={frontAadharPreview}
                alt="Front Aadhar Preview"
                className="w-50 h-40 object-cover rounded-md"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-gray-500 bg-opacity-50 transition-opacity">
                <Button
                  onClick={() => handleDelete('front')}
                  className="mr-2 bg-red-500 text-white p-2 rounded-full"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleShowFullImage('front')}
                  className="bg-blue-500 text-white p-2 rounded-full"
                >
                  Full Image
                </Button>
              </div>
            </div>
          )}
          {backAadharPreview && (
            <div className="relative group">
              <img
                src={backAadharPreview}
                alt="Back Aadhar Preview"
                className="w-50 h-40 object-cover rounded-md"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-gray-500 bg-opacity-50 transition-opacity">
                <Button
                  onClick={() => handleDelete('back')}
                  className="mr-2 bg-red-500 text-white p-2 rounded-full"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleShowFullImage('back')}
                  className="bg-blue-500 text-white p-2 rounded-full"
                >
                  Full Image
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Display Full Image if selected */}
      {showFullImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={showFullImage}
              alt="Full Aadhar Image"
              className="w-full max-w-xl max-h-full object-contain"
            />
            <Button
              onClick={() => setShowFullImage(null)}
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>



  {/* Dialog to upload aadhar Card image */}
          {showDialog && (
  <Dialog open={showDialog} handler={() => setShowDialog(false)}>
    <DialogBody>
      <div className="space-y-4">
        <div>
          <Typography variant="small" color="blue-gray" className="font-medium mb-1">
            {t('uploadAadharFront')}
          </Typography>
          <Input
            type="file"
            onChange={(e) => handleFileChange(e, 'front')}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          />
        </div>
        <div>
          <Typography variant="small" color="blue-gray" className="font-medium mb-1">
            {t('uploadAadharBack')}
          </Typography>
          <Input
            type="file"
            onChange={(e) => handleFileChange(e, 'back')}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          />
        </div>
      </div>
    </DialogBody>
    <DialogFooter>
      <Button
        variant="gradient"
        color="green"
        onClick={handleUpload}
      >
        {t('upload')}
      </Button>
      <Button
        variant="outlined"
        color="red"
        onClick={() => setShowDialog(false)}
      >
        {t('cancel')}
      </Button>
    </DialogFooter>
  </Dialog>
)}


          {/* FarmerCard Number input */}
          <div>
            <Typography variant="small" color="blue-gray" className="font-medium mb-1">{t('Farmer Card Number')}</Typography>
            <Input
              size="lg"
              placeholder=""
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              // labelProps={{
              //   className: "before:content-none after:content-none",
              // }}
              name="farmerCardNumber"
              value={formData.farmerCardNumber}
              // type='number'
              onChange={handleChange}
              required
            />
          </div>

          <Button
        type="button"
        className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-500 hover:bg-gradient-to-l text-white rounded-lg shadow-md flex items-center justify-center gap-2"
        onClick={() => setShowFcDialog(true)}
      >
        <FontAwesomeIcon icon={faCloudArrowUp} className="w-5 h-5 " />
        {t('upload Farmer Card')}
      </Button>
      <div className="mt-4">
        {/* FarmerCard Card */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, 'front')}
          style={{ display: 'none' }}
          id="farmerCard-upload"
        />
            {farmerCardPreview && (
            <div className="relative group">
              <img
                src={farmerCardPreview}
                alt="FarmerCard Preview"
                className="w-50 h-40 object-cover rounded-md"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-gray-500 bg-opacity-50 transition-opacity">
                <Button
                  onClick={() => handleDeleteFc('farmerCard')}
                  className="mr-2 bg-red-500 text-white p-2 rounded-full"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleShowFullImageFc('farmerCard')}
                  className="bg-blue-500 text-white p-2 rounded-full"
                >
                  Full Image
                </Button>
              </div>
            </div>
          )}
          </div>

          {/* Dialog to upload Farmer Card image */}
 {showFcDialog && (
  <Dialog open={showFcDialog} handler={() => setShowFcDialog(false)}>
    <DialogBody>
        <div>
          <Typography variant="small" color="blue-gray" className="font-medium mb-1">
            {t('uploadFarmerCard')}
          </Typography>
          <Input
            type="file"
            onChange={(e) => handleFileChange(e, 'farmerCard')}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          />
        </div>
      
    </DialogBody>
    <DialogFooter>
      <Button
        variant="gradient"
        color="green"
        onClick={handleUploadFc}
      >
        {t('upload')}
      </Button>
      <Button
        variant="outlined"
        color="red"
        onClick={() => setShowFcDialog(false)}
      >
        {t('cancel')}
      </Button>
    </DialogFooter>
  </Dialog>
)}

            {/* Role Dropdown with React Select */}
            <div>
            <Typography variant="small" color="blue-gray" className="font-medium mb-1 flex items-center">
              {t('role')}
              <span className="text-red-500 ml-1">*</span> {/* Red asterisk for required field */}
            </Typography>

            <Select
              options={roleOptions}
              value={roleOptions.find(option => option.value === formData.roleId)}
              onChange={handleRoleChange}
              placeholder={t('select')}
              className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
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
      

<Button type="submit" className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-500 hover:bg-gradient-to-l text-white rounded-lg shadow-md" disabled={!isValid}>
  {t('signUp')}
</Button>

          {showAlert && (
            <div className={`alert shadow-blue-500/40 hover:shadow-indigo-500/40 mt-6 content-center text-black text-center rounded-lg ${success ? 'bg-green-300' : 'bg-red-300'}`}>
              {error || alertMessage}
            </div>
          )}
          {/* <div className="mt-6 text-center">
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md w-full border border-gray-300">
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
              {t('Continue with Google')}
            </Button>
          </div> */}
          <Typography color="gray" className="mt-4 text-center font-normal">
            {t('alreadyHaveAccount')}&nbsp;
            <Link
              to="/sign-in"
              className="font-medium text-black transition-colors hover:text-gray-900"
            >
              {t('signIn')}
            </Link>
          </Typography>
        </form>
        </div>
      </div>
    </section>
  );
}


export default SignUp; //-------------------------------------------------------------------------