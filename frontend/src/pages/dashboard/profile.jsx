import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'; // Import useSelector
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Box, TextField, Button as MUIButton, Avatar as MUIAvatar, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
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
      borderColor: '#3f51b5',
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
        <MUIButton variant="outlined" color="primary" onClick={() => handleFileChange(null)}>{t('delete')}</MUIButton>
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
    dob: '',
    gender: '',
    houseNumber: '',
    street: '',
    landmark: '',
    locality: '',
    city: '',
    state: '',
    pinCode: '',
    country: ''
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
        dob: userData.dob,
        gender: userData.gender || '', // Assuming gender is in user data
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

    if (!isValidDate(dob)) {
      setAlert({ message: 'Please enter a valid date of birth', type: 'error' });
      hasError = true;
    } else {
      const age = calculateAge(new Date(dob)); // Calculate age from DOB
      if (age < 18) {
        newErrors.age = 'You must be at least 18 years old.';
        hasError = true;
      }
    }

    if (!formData.houseNumber || !formData.street || !formData.city || !formData.state || !formData.pinCode || !formData.country) {
      setAlert({ message: 'Please fill in all address fields', type: 'error' });
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      const { fullName, phoneNumber, email, username, bio, dob, gender } = formData;
      const formDataToSend = new FormData();
      formDataToSend.append('phoneNumber', phoneNumber);
      formDataToSend.append('email', email);
      formDataToSend.append('username', username);
      formDataToSend.append('fullName', fullName);
      formDataToSend.append('bio', bio);
      formDataToSend.append('dob', dob);
      formDataToSend.append('gender', gender);
      if (fileState.selectedFile) {
        formDataToSend.append('image', fileState.selectedFile);
      }

      await axios.put(`http://localhost:8080/users/${username}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

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
    fetchUserProfile(userId);
  }, [userId]);

  return (
    <div>
      <Card>
        <CardBody>
          <Typography variant="h5" gutterBottom>{t('profile')}</Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="fullName"
                  label={t('fullName')}
                  value={formData.fullName}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phoneNumber"
                  label={t('phoneNumber')}
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  fullWidth
                  error={Boolean(errors.phoneNumber)}
                  helperText={errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label={t('email')}
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="username"
                  label={t('username')}
                  value={formData.username}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="bio"
                  label={t('bio')}
                  value={formData.bio}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>{t('gender')}</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    fullWidth
                  >
                    <MenuItem value="male">{t('male')}</MenuItem>
                    <MenuItem value="female">{t('female')}</MenuItem>
                    <MenuItem value="other">{t('other')}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box mt={3} className="flex justify-between">
              <MUIButton onClick={handleCancel} variant="outlined">{t('cancel')}</MUIButton>
              <MUIButton color="primary" onClick={handleSave} variant="contained">{t('save')}</MUIButton>
            </Box>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
