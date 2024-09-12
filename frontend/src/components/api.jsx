import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getAllUsers = async () => {
    try {
      const response = await axios.get(API_URL)/users;
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };



  export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // If you need to send cookies
      });
      console.log('User registered successfully', response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(`Error registering user: ${error.response.status} - ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Error registering user: No response from server');
      } else {
        console.error(`Error registering user: ${error.message}`);
      }
      throw error;
    }
  };


  export const loginUser = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      // Check if the response contains the token
      if (response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        return token;
      } else {
        throw new Error('Token not found in the response');
      }
    } catch (error) {
      if (error.response) {
        console.error(`Login error: ${error.response.status} - ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Login error: No response from server');
      } else {
        console.error(`Login error: ${error.message}`);
      }
      throw error;
    }
  };

  export const sendPasswordReset = async (contactInfo) => {
    try {
      const response = await axios.post(`${API_URL}/users/forgot-password`, contactInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Password reset request successful', response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(`Error sending password reset request: ${error.response.status} - ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Error sending password reset request: No response from server');
      } else {
        console.error(`Error sending password reset request: ${error.message}`);
      }
      throw error;
    }
  };
  export const resetPassword = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/users/reset-password`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Password reset successful', response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(`Error resetting password: ${error.response.status} - ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Error resetting password: No response from server');
      } else {
        console.error(`Error resetting password: ${error.message}`);
      }
      throw error;
    }
  };