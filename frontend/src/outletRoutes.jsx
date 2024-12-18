import React from 'react';
import Home from "@/pages/dashboard/Home";  // Import the Home page for the outlet dashboard
import Inventory from "@/pages/dashboard/Inventory";  // Import Inventory page
import Orders from "@/pages/dashboard/Orders";  // Import Orders page
import Customers from "@/pages/dashboard/Customers";  // Import Customers page
import Profile from "@/pages/dashboard/Profile"
const outletRoutes = [
  {
    layout: "outlet-dashboard", // Define the layout type
    pages: [
      // { 
      //   name: "Home", 
      //   path: "/outlet-dashboard/home", 
      //   element: <Home /> // The component to render for Home
      // },

      {
        name: "Profile", // Name for the profile page
        path: "/profile",  // Path for ProfileCard page
        element: <Profile />  // The ProfileCard component to render
      },
      {
        name: "Inventory",
        path: "/inventory", 
        element: <Inventory /> // The component to render for Inventory
      },
      {
        name: "Orders",
        path: "/orders", 
        element: <Orders /> // The component to render for Orders
      },
      {
        name: "Customers",
        path: "/customers", 
        element: <Customers /> // The component to render for Customers
      },
      
    ],
  },
];

export default outletRoutes;
