import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gray-900 text-white shadow-lg",
    light: "bg-white text-gray-900 shadow-md",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-full"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-64 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-gray-300`}
    >
      <div className="relative p-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={brandImg} alt="Logo" className="h-8 mr-2" />
          <Typography variant="h5" className="font-bold text-green-600">
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="gray"
          size="sm"
          ripple={false}
          className="xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
      </div>
      <div className="p-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="flex flex-col gap-3">
            {title && (
              <li>
                <Typography variant="small" className="font-semibold uppercase text-gray-500 opacity-75">
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant="text"
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive ? 'bg-green-600 text-white' : 'hover:bg-gray-200'
                      }`}
                      fullWidth
                    >
                      <span className="flex-shrink-0 text-lg">{icon}</span>
                      <Typography className="font-medium capitalize">{name}</Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "SCAT ERP",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.jsx";

export default Sidenav;
