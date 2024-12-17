
import PropTypes from "prop-types"; 
import { Typography } from "@material-tailwind/react";

export function Footer({ brandName = "SCAT", brandLink = "", routes = [] }) {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content Area */}
      <div className="flex-grow">
        {/* Content goes here */}
      </div>

      {/* Footer */}
      <footer className="py-2 bg-gray-100">
        <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
          <ul className="flex items-center gap-4">
            {routes.map(({ name, path }) => (
              <li key={name}>
                <Typography
                  as="a"
                  href={path}
                  target="_blank"
                  variant="small"
                  className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
                >
                  {name}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center mt-4">
          <Typography variant="small" className="font-bold">
            © {year}-{year + 1} {brandName}
          </Typography>
        </div>
      </footer>
    </div>
  );
}

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
