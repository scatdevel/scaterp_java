import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/auth/sign-in';
import SignUp from './pages/auth/sign-up';
import UserList from './components/UserList';
import Dashboard from './layouts/dashboard';
import Auth from './layouts/auth';
import SettingsPage from './pages/dashboard/SettingsPage'; // Import the SettingsPage component
import Profile from './pages/dashboard/Profile'; // Import the Profile component
import { Tables } from './pages/dashboard';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import CropDetailsForm from './pages/dashboard/CropDetailsForm';
import CropDetailsView from './pages/dashboard/CropDetailsView';

function App() {
  return (
    
      <Routes>
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/cropDetailsForm" element={<CropDetailsForm />} />
         <Route path="/saved-crops" element={<CropDetailsView />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    
  );
}

export default App;
