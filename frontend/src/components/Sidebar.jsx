// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-nav">
        <li className="nav-item">
          <Link to="/admin-dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin-dashboard/crop-category">Crop Category</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin-dashboard/farmers-list">Farmers List</Link>
        </li>
        {/* Removed Mail Configuration, SMS Configuration, and General Settings */}
      </ul>
    </aside>
  );
};

export default Sidebar;
