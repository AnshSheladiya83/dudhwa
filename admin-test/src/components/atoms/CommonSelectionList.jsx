import React, { useState, useRef, useEffect } from "react";
    // import DownArrow from "../../assets/svgs/downArrow.svg";
    
    const CommonSelectionList = ({ options, buttonText = "", onChange }) => {
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const dropdownRef = useRef(null);
    
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    
      const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
      };
    
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownOpen(false);
        }
      };
    
      return (
        <div ref={dropdownRef} className="relative inline-block text-left">
          <div className="relative">
            <button
              type="button"
              className="dropdown-btn flex items-center space-x-1 w-[73px] h-[47px] rounded-[10px] text-[#282D34] bg-white border border-gray-200 hover:bg-secondary/20 transition-bg-color duration-500"
              onClick={toggleDropdown}
            >
              <span className="px-2 text-base font-semibold font-urbanist">
                {buttonText}
              </span>
              {/* <DownArrow className="w-6 h-6 ml-2 text-primary" /> */}
              
            </button>
          </div>
    
          {/* Dropdown menu (adjust as per your requirement) */}
          {dropdownOpen && (
            <ul className="p-2 min-w-[180px] rounded-lg shadow-xl absolute top-[52px] z-10 border border-gray-200 bg-white dropdown-list">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 py-1.5 px-2.5 rounded-md cursor-pointer hover:bg-primary hover:bg-opacity-5 m-[2px] hover:rounded-lg hover:text-primary text-base font-medium"
                  onClick={() => {
                    onChange(option);
                    setDropdownOpen(false); // Close dropdown on option selection
                  }}
                >
                  <span className="text-sm capitalize text-heading">{option}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    };
    
    export default CommonSelectionList;
    