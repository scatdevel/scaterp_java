// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/admin-dashboard">Admin Dashboard</Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/admin-dashboard/crop-category" className="nav-link">Crop Category</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin-dashboard/farmers-list" className="nav-link">Farmers List</Link>
        </li>
        {/* Removed Profile and Settings links */}
      </ul>
    </nav>
  );
};

export default Navbar;
