import React, { useState, useEffect } from 'react';
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
import CropDetailsForm from './pages/dashboard/CropDetailsForm';
import CropOverview from './pages/dashboard/CropOverview';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import Home from './pages/dashboard/Home';
import CropCategory from './pages/dashboard/CropCategory';
import FarmersList from './pages/dashboard/FarmersList';
import UserDetails from './pages/dashboard/UserDetails';
import RolesPage from './pages/dashboard/RolesPage';
import Address from './pages/dashboard/Address';
import OutletDashboard from './pages/dashboard/OutletDashboard';

import Inventory from './pages/dashboard/Inventory'; // Import Inventory page
import Orders from './pages/dashboard/Orders'; // Import Orders page
import Customers from './pages/dashboard/Customers'; // Import Customers page
import GoDownDashboard from './pages/dashboard/GoDownDashboard';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOutlet, setIsOutlet] = useState(false); // Correct state name
  const [isGodown, setIsGodown] = useState(false); // Correct state name


  useEffect(() => {
    const authToken = localStorage.getItem('jwtToken');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const role = localStorage.getItem('userRole');
    const currentTime = new Date().getTime();

    if (authToken && tokenExpiration && currentTime < tokenExpiration) {
      setAuthenticated(true);
      setIsAdmin(role === 'admin');
      setIsOutlet(role== "outlet")
      setIsGodown(role=='godown')
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/auth/sign-in"
        element={
          authenticated ? (
            isAdmin ? (
              <Navigate to="/admin-dashboard/home" />
            ) : isOutlet ? ( <Navigate to="/outlet-dashboard/home" />
            )
              : (
              <Navigate to="/dashboard/home" />
            )
          ) : (
            <SignIn setAuthenticated={setAuthenticated} setIsAdmin={setIsAdmin} setIsOutlet={setIsOutlet}   setIsGodown={setIsGodown}/>
          )
        }
      />
      
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard/*" element={authenticated && !isAdmin &&  !isOutlet ? <Dashboard /> : <Navigate to="/auth/sign-in" />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/user-list" element={<UserList />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/profile" element={<Profile />} />
    
    
    
      <Route path="/tables" element={<Tables />} />
      <Route path="/address" element={<Address />} />
      <Route path="/cropDetailsForm" element={<CropDetailsForm />} />
      <Route path="/crop-overview" element={<CropOverview />} />

      {/* Admin Routes */}
      <Route
        path="/admin-dashboard/*"
        element={authenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/auth/sign-in" />}
      >
        {/* <Route path="home" element={<Home />} /> */}
        <Route path="crop-categories" element={<CropCategory />} />
        <Route path="farmers-list" element={<FarmersList />} />
        <Route path="user-details" element={<UserDetails />} />
        <Route path="roles-page" element={<RolesPage />} />
      </Route>



    <Route path="/outlet-dashboard/*" element={authenticated && isOutlet ? <OutletDashboard /> : <Navigate to="/auth/sign-in" />}>
  {/* Default route, will handle /outlet-dashboard as the home page */}
  {/* <Route index element={<Home />} /> */}

  {/* Other relative routes */}
  {/* <Route path="home" element={<Home />} /> */}
  <Route path="inventory" element={<Inventory />} />
  <Route path="orders" element={<Orders />} />
  <Route path="customers" element={<Customers />} />
  <Route path="profile" element={<Profile />} />
</Route>

      {/* Redirect all other routes */}
      {/* <Route path="*" element={<Navigate to={authenticated ? (isAdmin ? "/admin-dashboard/home" : "/dashboard/home") : "/auth/sign-in"} replace />} />
    </Routes> */}



<Route
        path="/godown-dashboard/*"
        element={authenticated && isGodown ? <GoDownDashboard /> : <Navigate to="/auth/sign-in" />}
      >
        <Route path="home" element={<Home />} />
</Route>
<Route
        path="*"
        element={
          authenticated
            ? isAdmin
              ? <Navigate to="/admin-dashboard/home" />
              : isOutlet
              ? <Navigate to="/outlet-dashboard/home" />
              : isGodown
              ? <Navigate to="/godown-dashboard/home" />
              : <Navigate to="/dashboard/home" />
            : <Navigate to="/auth/sign-in" />
        }
      />
    </Routes>
  );
};

export default App;


