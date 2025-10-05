import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../redux/slices/centralSlice";
// import GlobalIcon from "../assets/svgs/global.svg";
// import DownArrow from "../assets/svgs/downArrow.svg";

const LanguageSection = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((state) => state.central.language);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
console.log(selectedLanguage);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageChange = (language) => {
    dispatch(setLanguage(language));
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const languages = [
    {
      name: "en",
      flag: "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png",
    },
    {
      name: "fr",
      flag: "https://www.countryflags.com/wp-content/uploads/france-flag-png-large.png",
    },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="dropdown-btn flex items-center space-x-1 h-[47px] w-[74px] rounded-lg text-[#] bg-secondary/10 hover:bg-secondary/20 transition-bg-color duration-500 fa-bars"
        onClick={toggleDropdown}
      >
        {/* <GlobalIcon className="ml-[10px] h-7 w-7 antialiased" /> */}
        {/* <DownArrow className={`${isDropdownOpen ? "scale-y-[-1]" : ""}`} /> */}
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <ul className="p-2 min-w-[180px] rounded-lg shadow-xl absolute top-14 z-10 border border-gray-200 bg-white dropdown-list">
          {languages.map((lang) => (
            <li
              key={lang.name}
              className="flex items-center gap-2 py-1.5 px-2.5 rounded-md cursor-pointer hover:bg-gray-100"
              onClick={() => handleLanguageChange(lang.name)}
            >
              <img
                src={lang.flag}
                alt={`${lang.name} flag`}
                className="w-4 h-4 rounded-full"
              />
              <span className="text-sm capitalize text-heading">
                {lang.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
    
    export default LanguageSection;
