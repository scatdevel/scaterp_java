import Home from "@/pages/dashboard/Home";
import CropCategory from "@/pages/dashboard/CropCategory";
import FarmersList from "@/pages/dashboard/FarmersList";

// Admin routes configuration
const adminRoutes = [
  {
    layout: "admin-dashboard",
    pages: [
      { 
        name: "Home", 
        path: "/admin-dashboard/home", 
        element: <Home /> 
      },
      { 
        name: "Crop Categories",
        path: "/admin-dashboard/crop-categories", 
        element: <CropCategory /> 
      },
      { 
        name: "Farmers List", 
        path: "/admin-dashboard/farmers-list", 
        element: <FarmersList /> 
      },
      // Add more admin pages here
    ],
  },
];

export default adminRoutes;
