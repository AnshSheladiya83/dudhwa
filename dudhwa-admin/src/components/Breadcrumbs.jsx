import React from "react";
    import { Link, useLocation } from "react-router-dom";
         
    const Breadcrumbs = () => {
      const location = useLocation();
      
      const pathnames = location.pathname.split("/").filter((x) => x);
      if (pathnames.length > 0 && /^[0-9a-fA-F]{24}$/.test(pathnames[pathnames.length - 1])) {
        pathnames.pop();
      }
      const formatName = (name) => {
        return name
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      };
       
      return (
        <nav
          aria-label="breadcrumb"
          className="flex justify-center w-max "
        >
          <ol className="flex justify-center w-full rounded-md bg-blue-gray-50 bg-opacity-60">
            <li className="flex items-center transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-light-blue-500 ">
              <Link to="/bookings" className="font-urbanist text-base  font-semibold leading-[19.2px] select-none text-independence">
                Home
              </Link>
              <span className="font-urbanist text-base  font-semibold leading-[19.2px] mx-2  pointer-events-none select-none text-independence">
                /
              </span>
            </li>
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const formattedName = formatName(name);
              const isLast = index === pathnames.length - 1;
              const isSecondLast = index === pathnames.length - 2;
              const isThirdLast = index === pathnames.length - 3;
              const disableLink = (isSecondLast && name.toLowerCase().includes("edit")) || ((isSecondLast || isThirdLast) && name.toLowerCase() === "settings");
              return (
                <li
                  key={index}
                  className="font-urbanist text-base  font-semibold leading-[19.2px] flex items-center  transition-colors duration-300 cursor-pointer"
                >
                  {!isLast ? (
                    <Link to={routeTo} className={disableLink ? `text-primary pointer-events-none select-none cursor-default` : "text-independence"} onClick={(e) => disableLink && e.preventDefault()}>
                      <span>{formattedName}</span>
                    </Link>
                  ) : (
                    <span className="text-primary">{formattedName}</span>
                  )}
                  {!isLast && (
                    <span className="font-urbanist text-base  font-semibold leading-[19.2px] mx-2  pointer-events-none select-none text-primary">
                      /
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      );
    };
    
    export default Breadcrumbs;