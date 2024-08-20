import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/auth/sign-in';
import SignUp from './pages/auth/sign-up';
import UserList from './components/UserList';
import Dashboard from './layouts/dashboard';
import Auth from './layouts/auth';
import SettingsPage from './pages/dashboard/SettingsPage';
import Profile from './pages/dashboard/Profile';
import { Tables } from './pages/dashboard';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import TemporaryPage from './pages/auth/TemporaryPage';
import CropDetailsForm from './pages/dashboard/CropDetailsForm';
import CropOverview from './pages/dashboard/CropOverview';
import AdminLogin from './pages/auth/AdminLogin';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import Home from './pages/dashboard/Home';
import CropCategory from './pages/dashboard/CropCategory';
import FarmersList from './pages/dashboard/FarmersList';

const App = () => {
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

  return (
    
      <Routes>
        {/* User Routes */}
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/temporary" element={<TemporaryPage />} /> 
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/cropDetailsForm" element={<CropDetailsForm />} />
        <Route path="/crop-overview" element={<CropOverview />} />

        {/* Admin Routes */}
        <Route
          path="/admin-login"
          element={
            adminAuthenticated ? (
              <Navigate to="/admin-dashboard/home" />
            ) : (
              <AdminLogin setAdminAuthenticated={setAdminAuthenticated} />
            )
          }
        />
        <Route
          path="/admin-dashboard/*"
          element={
            adminAuthenticated ? (
              <AdminDashboard>
                <Route path="/admin-dashboard/home" element={<Home />} />
<Route path="/admin-dashboard/crop-categories" element={<CropCategory />} />
<Route path="/admin-dashboard/farmers-list" element={<FarmersList />} />

              </AdminDashboard>
            ) : (
              <Navigate to="/admin-login" />
            )
          }
        />

        {/* Redirect all other routes */}
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    
  );
};

export default App;
