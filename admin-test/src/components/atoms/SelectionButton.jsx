import React, { useState } from "react";
    import { FaChevronDown } from "react-icons/fa";
    // import DownArrow from "../../assets/svgs/downArrow.svg";
    
    const SelectionButton = ({ icon, title, options = [], onOptionSelect }) => {
      const [showOptions, setShowOptions] = useState(false);
    
      const handleOptionClick = (option) => {
        onOptionSelect(option);
        setShowOptions(false);
      };
    
      return (
        <div className="relative inline-block">
          <button
            className="w-[106px] px-[14px] border border-gray-200 center-v  font-normal text-sm focus:ring-primary/25 focus:border-primary/25 focus:ring-primary focus:border-primary outline-none bg-white h-[47px] rounded-[10px] text-[#282D34] bg-secondary/10 hover:bg-secondary/20 transition-bg-color duration-500"
            onClick={() => setShowOptions(!showOptions)}
          >
            {icon && <span className="mr-1">{icon}</span>}
            <span className="mr-4 text-base font-semibold font-urbanist">
              {title}
            </span>
          </button>
          {/* <DownArrow className="absolute w-6 h-6 transform -translate-y-1/2 pointer-events-none text-primary right-2 top-1/2" /> */}
    
          {/* <FaChevronDown className="absolute w-3 h-3 transform -translate-y-1/2 pointer-events-none text-primary right-2 top-1/2"/> */}
          {showOptions && (
            <ul className="absolute right-0 z-10 w-full mt-1 bg-white rounded-lg shadow-lg">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer font-urbanist  hover:bg-primary hover:bg-opacity-5 m-[2px] hover:rounded-lg hover:text-primary text-base font-medium"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    };
    
    export default SelectionButton;
    