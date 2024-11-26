import React from 'react';
import Home from "@/pages/dashboard/Home";  // Import the Home page for the outlet dashboard
import Inventory from "@/pages/dashboard/Inventory";  // Import Inventory page
import Orders from "@/pages/dashboard/Orders";  // Import Orders page
import Customers from "@/pages/dashboard/Customers";  // Import Customers page
import Pricing from "@/pages/dashboard/Pricing";  // Add this import if you have the Pricing component

const outletRoutes = [
  {
    layout: "outlet-dashboard", // Define the layout type
    pages: [
      { 
        name: "Home", 
        path: "/outlet-dashboard/home", 
        element: <Home /> // The component to render for Home
      },
      {
        name: "Inventory",
        path: "/outlet-dashboard/inventory", 
        element: <Inventory /> // The component to render for Inventory
      },
      {
        name: "Orders",
        path: "/outlet-dashboard/orders", 
        element: <Orders /> // The component to render for Orders
      },
      {
        name: "Customers",
        path: "/outlet-dashboard/customers", 
        element: <Customers /> // The component to render for Customers
      },
      {
        name: "Pricing and Transactions",
        path: "/outlet-dashboard/pricing", 
        element: <Pricing /> // The component to render for Reports
      },
    ],
  },
];

export default outletRoutes;
