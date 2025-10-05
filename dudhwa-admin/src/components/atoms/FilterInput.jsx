import React, { useState, useRef, useEffect } from "react";

    const FilterInput = ({ type, value, placeholder, onChange,title }) => {
      const [inputValue, setInputValue] = useState(value);
      const inputRef = useRef(null);
    
      const handleChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        onChange(newValue);
      };
    
      useEffect(() => {
        setInputValue(value);
      }, [value]);
    
      return (
        <div className="relative space-y-1 group">
          <div>
            <span className="font-urbanist font-semibold text-[16px] text-textPrimary">
              {title}
            </span>
          </div>
          <input
            ref={inputRef}
            type={type}
            className=" rounded-[10px] h-[50px] bg-[#F8F9FB] text-sm font-medium font-urbanist focus:outline-none focus:ring-2 focus:ring-[#008BD9] focus:ring-opacity-40 focus:border-transparent min-w-full flex-1 px-4 py-2  text-rhythm   focus:border-border  shadow-sm  placeholder-gray-400"
            value={inputValue}
            placeholder={placeholder}
            onChange={handleChange}
            min={type === "number" ? "0" : undefined}
            max={type === "number" ? "30000" : undefined}
          />
        </div>
      );
    };
    
    export default FilterInput;
    