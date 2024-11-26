import React from 'react';
import Home from "@/pages/dashboard/Home"; // Ensure the path is correct

const godownRoutes = [
  {
    layout: "godown-dashboard", // Define the layout type
    pages: [
      { 
        name: "Home", 
        path: "/godown-dashboard/home", 
        element: <Home /> // The component to render for Home
      },
      // Add other routes if necessary
    ],
  },
];

export default godownRoutes; // Correct export
