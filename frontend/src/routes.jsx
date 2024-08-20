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
import { SignIn, SignUp } from "@/pages/auth";



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
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Land Details",
        path: "/tables",
        element: <Tables />,
      },

      {
        icon: <TableCellsIcon {...icon} />,
        name: "Crop Details",
        path: "/crop-details",
        element: <CropDetailsForm />, // Correct usage
      },

      {
        icon: <TableCellsIcon {...icon} />,
        name: "Crop Overview", // Updated route name
        path: "/crop-overview", // Updated path
        element: <CropOverview />, // Updated element
      },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
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
