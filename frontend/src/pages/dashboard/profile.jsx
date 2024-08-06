import React, { useState,useEffect } from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Box, TextField, Button as MUIButton, Avatar as MUIAvatar ,Grid} from "@mui/material";
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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      onFileChange(file);
    }
  };

  return (
    <Box className="p-4 flex flex-col items-center">
      <Typography variant="h6" className="mb-4 text-center">Your Photo</Typography>
      <Box className="flex items-center justify-center my-4">
        <MUIAvatar
          src={previewUrl || "https://via.placeholder.com/150"}
          className="mr-4"
          sx={{ width: 100, height: 100 }}
        />
      </Box>
      <Box className="flex space-x-2 mb-4">
        <MUIButton variant="outlined" color="primary" onClick={() => onFileChange(null)}>Delete</MUIButton>
        <MUIButton variant="contained" color="primary" onClick={() => document.getElementById('fileInput').click()}>Update</MUIButton>
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
  const classes = useStyles();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [dob, setDob] = useState(''); 
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const isValidPhoneNumber = (number) => /^[0-9]{10}$/.test(number);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidDate = (date) => !isNaN(new Date(date).getTime());

  const handleSave = async () => {
    let hasError = false;

    if (!username) {
      setAlert({ message: 'Username is required', type: 'error' });
      hasError = true;
    }
    if (hasError) return;
    if (!isValidPhoneNumber(phoneNumber)) {
      setPhoneNumberError('Please enter a valid phone number (10 digits)');
      hasError = true;
    } else {
      setPhoneNumberError('');
    }
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    } else {
      setEmailError('');
    }
 if (!isValidDate(dob)) {
      setAlert({ message: 'Please enter a valid date of birth', type: 'error' });
      hasError = true;
    }
  

    try {
      const userData = {
        fullName,
        phoneNumber,
        email,
        username,
        bio
      };

      await axios.put(`http://localhost:8080/users/${username}`, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('username', username);

        const token = localStorage.getItem('token');
        const uploadUrl = `http://localhost:8080/users/uploadProfilePicture`;

        const headers = {
          'Content-Type': 'multipart/form-data',
          ...(token && { 'Authorization': `Bearer ${token}` })
        };

        await axios.post(uploadUrl, formData, { headers });
        setAlert({ message: 'Profile updated and photo uploaded successfully', type: 'success' });
      } else {
        setAlert({ message: 'Profile updated successfully', type: 'success' });
      }
    } catch (error) {
      if (error.response) {
        setAlert({ message: `Error: ${error.response.data.message || 'Error saving profile'}`, type: 'error' });
      } else if (error.request) {
        setAlert({ message: 'Error: No response received from server', type: 'error' });
      } else {
        setAlert({ message: 'Error: Request failed', type: 'error' });
      }
    }
  };

  const handleCancel = () => {
    setFullName('');
    setPhoneNumber('');
    setEmail('');
    setUsername('');
    setBio('');
    setDob(''); 
    setAlert({ message: '', type: '' });
    setEmailError('');
    setPhoneNumberError('');
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ message: '', type: '' });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <>
      <div className="relative mt-6 h-32 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-700/75 flex items-center justify-center">
          <Typography variant="h3" className="text-white"> </Typography>
        </div>
      </div>
      <Card className="mx-1 -mt-6 mb-2 lg:mx-2 shadow-lg">
        <CardBody className="p-1">
          <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
            <div className="w-64 flex items-center">
              <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
              <Typography variant="h6" className="inline-block">App</Typography>
            </div>
          </div>
          <PhotoUpload onFileChange={(file) => {
            setSelectedFile(file);
            setPreviewUrl(file ? URL.createObjectURL(file) : null);
          }} previewUrl={previewUrl} />
        </CardBody>
      </Card>
      <Box className="p-2">
        <Typography variant="h5" className="mb-6">Settings Page</Typography>
        {alert.message && (
          <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            <Typography variant="body1" color={alert.type === 'success' ? 'green' : 'red'}>
              {alert.message}
            </Typography>
          </div>
        )}
            <Box className="mb-4">
          <Typography variant="h6" className="mb-2">Personal Information</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                className="my-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1 }}>
                      <UserIcon />
                    </Box>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                className="my-2"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1 }}>
                      <UserIcon />
                    </Box>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                className="my-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(emailError)}
                helperText={emailError}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1 }}>
                      <EmailIcon />
                    </Box>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                className="my-2"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                error={Boolean(phoneNumberError)}
                helperText={phoneNumberError}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1 }}>
                      <PhoneIcon />
                    </Box>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                variant="outlined"
                className="my-2"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1 }}>
                      <CalendarTodayIcon />
                    </Box>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                variant="outlined"
                className="my-2"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1 }}>
                      <InfoIcon />
                    </Box>
                  ),
                }}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className="flex justify-end space-x-4">
          <MUIButton variant="outlined" color="primary" onClick={handleCancel}>Cancel</MUIButton>
          <MUIButton variant="contained" color="primary" onClick={handleSave}>Save</MUIButton>
        </Box>
      </Box>
    </>
  );
}

export default Profile;
