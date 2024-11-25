import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables } from "@/pages/dashboard";

import CropDetailsForm from "@/pages/dashboard/CropDetailsForm";
import CropOverview from "@/pages/dashboard/CropOverview";
import Address from "@/pages/dashboard/Address";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWheatAwn } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { faWheatAwnCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import { faUser } from '@fortawesome/free-solid-svg-icons';
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <FontAwesomeIcon icon={faUser} className="h-5 w-5" />, // Updated icon
        name: "Profile",
        path: "/profile",
        element: <Profile />, // Correct usage
      },
      {
        icon: <FontAwesomeIcon icon={faLocationCrosshairs} className="h-5 w-5" />, // Updated icon for location
        name: "Land Details",
        path: "/tables",
        element: <Tables />, // Correct usage
      },
      {
        icon: <FontAwesomeIcon icon={faAddressCard} className="h-5 w-5" />, // Updated icon
        name: "Address",
        path: "/address",
        element: <Address />, // Correct usage
      },
      
      {
        icon: <FontAwesomeIcon icon={faWheatAwn} className="h-5 w-5" />,
        name: "Crop Details",
        path: "/crop-details",
        element: <CropDetailsForm />, // Correct usage
      },
      {
        icon: <FontAwesomeIcon icon={faWheatAwnCircleExclamation} className="h-5 w-5" />,
        name: "Crop Overview", // Updated route name
        path: "/crop-overview", // Updated path
        element: <CropOverview />, // Updated element
      },
    ],
  },
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <RectangleStackIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

export default routes;
