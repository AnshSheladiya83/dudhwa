import React, { useState } from "react";
    // import BellIcon from "../assets/svgs/bell.svg";
    
    const NotificationSection = () => {
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const [showNotificationDot, setShowNotificationDot] = useState(true); // Assuming you want to show the dot initially
    
      const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
    
      return (
        <div className="relative inline-block text-left">
          <div className="relative">
            <button
              type="button"
              className="dropdown-btn flex items-center space-x-1 w-[47px] h-[47px] rounded-lg text-[#282D34] bg-secondary/10 hover:bg-secondary/20 transition-bg-color duration-500 fa-bars"
              onClick={toggleDropdown}
            >
              {/* <BellIcon className="ml-[10px]" /> */}
            </button>
            {/* Red notification dot */}
            {showNotificationDot && (
              <div className="absolute top-0 right-0">
                <span className="absolute top-[8px] right-[15px] h-3 w-3 rounded-full bg-primary animate-ping "></span>
                <span className="absolute top-[10px] right-[17px] h-2 w-2 rounded-full bg-primary ring-2 ring-[#EEECE8]"></span>
              </div>
            )}
          </div>
    
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <ul className="p-2 min-w-[180px] rounded-lg shadow-xl absolute top-14 z-10 border border-gray-200 bg-white dropdown-list">
              <li className="flex items-center gap-2 py-1.5 px-2.5 rounded-md cursor-pointer hover:bg-gray-100">
                <span className="text-sm capitalize text-heading">Notification 1</span>
              </li>
              <li className="flex items-center gap-2 py-1.5 px-2.5 rounded-md cursor-pointer hover:bg-gray-100">
                <span className="text-sm capitalize text-heading">Notification 2</span>
              </li>
              <li className="flex items-center gap-2 py-1.5 px-2.5 rounded-md cursor-pointer hover:bg-gray-100">
                <span className="text-sm capitalize text-heading">Notification 3</span>
              </li>
            </ul>
          )}
        </div>
      );
    };
    
    export default NotificationSection;
    