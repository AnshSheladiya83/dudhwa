import React, { useState, useRef, useEffect } from "react";
    import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
    
    const FilterDropdownInput = ({ value, placeholder, options, onChange,title }) => {
      const [selectedOption, setSelectedOption] = useState(value);
      const [isOpen, setIsOpen] = useState(false);
      const selectRef = useRef(null);
      const dropdownRef = useRef(null);
    
      const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedOption(newValue);
        onChange(newValue);
      };
    
      const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };
    
      const handleOptionClick = (option) => {
        setSelectedOption(option);
        onChange(option);
        setIsOpen(false);
      };
    
      useEffect(() => {
        setSelectedOption(value);
      }, [value]);
    
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    
      return (
        <div className="relative space-y-1 group">
          <div>
            <span className="font-urbanist font-semibold text-[16px]  text-textPrimary ">
              {title}
            </span>
          </div>
          <div className="relative">
            <input
              ref={selectRef}
              type="text"
              className=" rounded-[10px] h-[50px] bg-[#F8F9FB] text-sm font-medium font-urbanist focus:outline-none focus:ring-2 focus:ring-[#008BD9] focus:ring-opacity-40 focus:border-transparent min-w-full flex-1 px-4 py-2  text-rhythm   focus:border-border  shadow-sm  placeholder-gray-400"
              value={selectedOption}
              placeholder={placeholder}
              onChange={handleChange}
              readOnly
              onClick={toggleDropdown}
            />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {isOpen ? (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
             <path d="M8.30273 12.4044L11.6296 15.8351C11.8428 16.0549 12.1573 16.0549 12.3704 15.8351L18.8001 9.20467C19.2013 8.79094 18.9581 8 18.4297 8H12.7071L8.30273 12.4044Z" fill="#282D34"/>
             <path opacity="0.5" d="M11.2929 8H5.5703C5.04189 8 4.79869 8.79094 5.1999 9.20467L7.60648 11.6864L11.2929 8Z" fill="#282D34"/>
             </svg>
             
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="scale-y-[-1]">
              <path d="M8.30273 12.4044L11.6296 15.8351C11.8428 16.0549 12.1573 16.0549 12.3704 15.8351L18.8001 9.20467C19.2013 8.79094 18.9581 8 18.4297 8H12.7071L8.30273 12.4044Z" fill="#282D34"/>
              <path opacity="0.5" d="M11.2929 8H5.5703C5.04189 8 4.79869 8.79094 5.1999 9.20467L7.60648 11.6864L11.2929 8Z" fill="#282D34"/>
              </svg>
              
            )}
          </div>
            {isOpen && (
              <div className="absolute z-10 mt-1 lg:min-w-[250px] sm:min-w-64 bg-white rounded-md shadow-lg">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-100 text-rhythm font-urbanist "
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
            
          </div>
    
        </div>
      );
    };
    
    export default FilterDropdownInput;
    