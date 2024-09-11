import Home from "@/pages/dashboard/Home";
import CropCategory from "@/pages/dashboard/CropCategory";
import FarmersList from "@/pages/dashboard/FarmersList";
import UserDetails from "./pages/dashboard/UserDetails";
import RolesPage from "./pages/dashboard/RolesPage";


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
        name: "Roles", 
        path: "/admin-dashboard/roles-page", // Use relative path
        element: <RolesPage /> 
      },
      { 
        name: "User Details", // New User List page
        path: "/admin-dashboard/user-details", 
        element: <UserDetails /> 
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
