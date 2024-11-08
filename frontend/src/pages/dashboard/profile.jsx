import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'; // Import useSelector
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Box, TextField, Button as MUIButton, Avatar as MUIAvatar, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from 'axios';
import UserIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const useStyles = makeStyles(() => ({
  input: {
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #d1d1d1',
    backgroundColor: '#f5f5f5',
    padding: '12px 48px',
    fontWeight: '500',
    color: '#000',
    '&:focus': {
      borderColor: '#3f51b5' ,
    },
    '&::placeholder': {
      color: '#000',
    },
    '&.dark': {
      borderColor: '#333',
      backgroundColor: '#444',
      color: '#fff',
      '&::placeholder': {
        color: '#fff',
      },
      '&:focus': {
        borderColor: '#3f51b5',
      },
    },
  },
}));

const PhotoUpload = ({ onFileChange, previewUrl }) => {
  const { t } = useTranslation();
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <Box className="p-4 flex flex-col items-center">
      <Typography variant="h6" className="mb-4 text-center">{t('yourPhoto')}</Typography>
      <Box className="flex items-center justify-center my-4">
        <MUIAvatar
          src={previewUrl || "https://via.placeholder.com/150"}
          className="mr-4"
          sx={{ width: 100, height: 100 }}
        />
      </Box>
      <Box className="flex space-x-2 mb-4">
        <MUIButton variant="outlined" color="primary" onClick={() => onFileChange(null)}>{t('delete')}</MUIButton>
        <MUIButton variant="contained" color="primary" onClick={() => document.getElementById('fileInput').click()}>{t('update')}</MUIButton>
      </Box>
      <input
        id="fileInput"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".svg, .png, .jpg, .gif"
      />
    </Box>
  );
};


export function Profile() { 
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const userId = useSelector((state) => state.auth.userId); // Access user ID from Redux

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    username: '',
    bio: '',
    dob: ''
  });
  
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [fileState, setFileState] = useState({ selectedFile: null, previewUrl: null });
  const [errors, setErrors] = useState({ email: '', phoneNumber: '' });

  // Fetch user profile details
  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/users/get/${userId}`);
      const userData = response.data;
      setFormData({
        username: userData.username,
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        bio: userData.bio,
        dob: userData.dob
      });
      setFileState({ selectedFile: null, previewUrl: `http://localhost:8080/users/image/${userData.username}` }); 
    } catch (error) {
      setAlert({ message: 'Error fetching user profile', type: 'error' });
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId); // Call the function with the userId from Redux
    }
  }, [userId]);

  const isValidPhoneNumber = (number) => /^[0-9]{10}$/.test(number);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidDate = (date) => !isNaN(new Date(date).getTime());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file) => {
    setFileState({ 
      selectedFile: file,
      previewUrl: file ? URL.createObjectURL(file) : null
    });
  };

  const validateFields = () => {
    const { username, phoneNumber, email, dob } = formData;
    let hasError = false;
    const newErrors = { email: '', phoneNumber: '' };

    if (!username) {
      setAlert({ message: 'Username is required', type: 'error' });
      hasError = true;
    }
    if (!isValidPhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number (10 digits)';
      hasError = true;
    }
    if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      hasError = true;
    }
    if (!isValidDate(dob)) {
      setAlert({ message: 'Please enter a valid date of birth', type: 'error' });
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      const { fullName, phoneNumber, email, username, bio, dob } = formData;
      const formDataToSend = new FormData();
      formDataToSend.append('phoneNumber', phoneNumber);
      formDataToSend.append('email', email);
      formDataToSend.append('username', username);
        formDataToSend.append('fullName', fullName);
      formDataToSend.append('bio', bio);
      formDataToSend.append('dob', dob);
      if (fileState.selectedFile) {
        formDataToSend.append('image', fileState.selectedFile);
      }

      await axios.put(`http://localhost:8080/users/${username}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (fileState.selectedFile) {
        const fileFormData = new FormData();
        fileFormData.append('file', fileState.selectedFile);
        fileFormData.append('username', username);
        const token = localStorage.getItem('token');
        const uploadUrl = `http://localhost:8080/users/uploadProfilePicture`;
        const headers = { 'Content-Type': 'multipart/form-data', ...(token && { 'Authorization': `Bearer ${token}` }) };
        await axios.post(uploadUrl, fileFormData, { headers });
      }

      setAlert({ message: 'Profile updated successfully', type: 'success' });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error saving profile';
      setAlert({ message: `Error: ${errorMessage}`, type: 'error' });
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      username: '',
      bio: '',
      dob: ''
    });
    setAlert({ message: '', type: '' });
    setErrors({ email: '', phoneNumber: '' });
    setFileState({ selectedFile: null, previewUrl: null });
  };

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => setAlert({ message: '', type: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div className="relative mt-6">
        <div className="absolute inset-0 h-full w-full bg-gray-700/75 flex items-center justify-center">
          <div className="absolute top-1 right-14 flex space-x-2 z-20">
            <img
              src="/img/en-flag.png"
              alt="English"
              className="w-8 h-8 cursor-pointer border border-gray-300 rounded-full shadow-sm"
              onClick={() => handleLanguageChange('en')}
            />
            <img
              src="/img/ta-flag.png"
              alt="Tamil"
              className="w-8 h-8 cursor-pointer border border-gray-300 rounded-full shadow-sm"
              onClick={() => handleLanguageChange('ta')}
            />
          </div>
          <Typography variant="h3" className="text-white"></Typography>
        </div>
      </div>

      <div className="flex justify-center py-4">
        <Card className="mx-1 mb-1 lg:mx-1 shadow-lg w-64 bg-blue-50 border border-blue-200 rounded-lg overflow-hidden transition-transform hover:scale-105">
          <CardBody className="p-4">
            <div className="mb-4 flex items-center justify-center">
              <PhotoUpload 
                onFileChange={handleFileChange} 
                previewUrl={fileState.previewUrl} 
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <Box className="p-2">
        <Typography variant="h5" className="mb-6">{t('settingsPage')}</Typography>
        {alert.message && (
          <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            <Typography variant="body1" color={alert.type === 'success' ? 'green' : 'red'}>
              {alert.message}
            </Typography>
          </div>
        )}
        <Box className="mb-4">
          <Typography variant="h6" className="mb-2">{t('personal Information')}</Typography>
          <Grid container spacing={3}>
            {Object.keys(formData).map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  fullWidth
                  label={t(key)}
                  name={key}
                  variant="outlined"
                  className="my-2"
                  value={formData[key]}
                  onChange={handleInputChange}
                  error={Boolean(errors[key])}
                  helperText={errors[key]}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1 }}>
                        {key === 'username' || key === 'fullName' ? <UserIcon /> :
                         key === 'email' ? <EmailIcon /> :
                         key === 'phoneNumber' ? <PhoneIcon /> :
                         key === 'dob' ? <CalendarTodayIcon /> :
                         <InfoIcon />}
                      </Box>
                    ),
                  }}
                  type={key === 'dob' ? 'date' : 'text'}
                  multiline={key === 'bio'}
                  rows={key === 'bio' ? 4 : 1}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box className="flex justify-end space-x-4">
          <MUIButton variant="outlined" color="primary" onClick={handleCancel}>{t('cancel')}</MUIButton>
          <MUIButton variant="contained" color="primary" onClick={handleSave}>{t('save')}</MUIButton>
        </Box>
      </Box>
    </>
  );
}

export default Profile;

