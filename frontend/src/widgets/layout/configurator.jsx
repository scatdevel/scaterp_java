import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faLock, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Button, IconButton, Typography } from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavType,
} from "@/context";

function formatNumber(number, decPlaces) {
  decPlaces = Math.pow(10, decPlaces);
  const abbrev = ["K", "M", "B", "T"];

  for (let i = abbrev.length - 1; i >= 0; i--) {
    let size = Math.pow(10, (i + 1) * 3);
    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;
      if (number === 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }
      number += abbrev[i];
      break;
    }
  }
  return number;
}

export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavType } = controller;
  const [stars, setStars] = React.useState(0);

  React.useEffect(() => {
    fetch("https://api.github.com/repos/creativetimofficial/material-tailwind-dashboard-react")
      .then((response) => response.json())
      .then((data) => setStars(formatNumber(data.stargazers_count, 1)));
  }, []);

  // Logout function
  const handleLogout = async () => {
   
    localStorage.removeItem('authToken'); // Remove the token from local storage
    localStorage.removeItem('tokenExpiration'); // Remove expiration time
    window.location.href = '/auth/sign-in'; // Redirect to the login page
  };

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${
        openConfigurator ? "translate-x-0" : "translate-x-96"
      }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            Account Settings
          </Typography>
          <a href="profile">
            <Typography variant="h8" color="blue-gray">
              <FontAwesomeIcon icon={faUserPen} className="text-black mr-2" />
              Edit Profile
            </Typography>
          </a>
        </div>
        <IconButton
          variant="text"
          color="green"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="py-4 px-6">
        <div className="mb-12">
          <div className="mt-3 flex flex-col px-6">
            <Button
              className=""
              variant={sidenavType === "white" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "none")}
            >
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Privacy
            </Button>
          </div>
        </div>
        <div className="mb-12">
          <hr />
          <div className="flex items-center px-6 py-4">
            <Button
              variant="gradient"
              className="flex justify-center gap-2"
              fullWidth
              onClick={handleLogout} // Added logout handler
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="text-white" />
              Log Out
            </Button>
          </div>
          <hr />
        </div>
      </div>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;
