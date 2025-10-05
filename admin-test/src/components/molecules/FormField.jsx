import React, { useState, useEffect, useRef } from 'react';
    import { ImEye, ImEyeBlocked } from 'react-icons/im';
    
    const FormField = ({ title, type, placeholder, required, value, onChange, disableInput }) => {
      const [showPassword, setShowPassword] = useState(false);
      const [inputValue, setInputValue] = useState(value);
      const inputRef = useRef(null);
    
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    
      const formatDateTime = (date) => {
        const currentTime = new Date();
        const combinedDateTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          currentTime.getHours(),
          currentTime.getMinutes(),
          currentTime.getSeconds(),
          currentTime.getMilliseconds()
        );
        return combinedDateTime.toISOString();
      };
    
      const handleChange = (event) => {
        let newValue = event.target.value;
    
        if (type === 'number' && isNaN(newValue)) {
          newValue = '';
        } else if (type === 'date') {
          const selectedDate = new Date(newValue);
          if (!isNaN(selectedDate.getTime())) {
            const formattedDate = formatDateTime(selectedDate);
            newValue = formattedDate;
          }
        }
    
        setInputValue(newValue);
        onChange(newValue);
      };
    
      useEffect(() => {
        setInputValue(value);
      }, [value]);
    
      const displayValue = () => {
        if (type === 'date') {
          const date = new Date(inputValue);
          if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0]; // Display only the date part
          }
          return '';
        }
        return inputValue;
      };
    
      return (
        <div className="space-y-1 group">
          <div>
            <span className="text-xs font-medium uppercase font-urbanist text-rhythm">
              {title} {required && <span className="text-sm text-primary">*</span>}
            </span>
          </div> 
          <div className="relative">
            <input
              ref={inputRef}
              type={showPassword && type === 'password' ? 'text' : type}
              className="bg-[#F8F9FB] text-sm font-medium font-urbanist relative focus:outline-none focus:ring-2 focus:ring-[#008BD9] focus:ring-opacity-40 border-opacity-40  focus:border-transparent min-w-full flex-1 px-4 py-2 text-rhythm focus:border-border rounded-md shadow-sm placeholder-gray-400"
              value={displayValue()}
              placeholder={placeholder}
              onChange={handleChange}
              min={type === 'number' ? '0' : undefined}
              max={type === 'number' ? '30000' : undefined}
              disabled={disableInput}
            />
            {type === 'password' && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute transform -translate-y-1/2 top-1/2 right-3"
              >
                {showPassword ? <ImEyeBlocked /> : <ImEye />}
              </button>
            )}
          </div>
        </div>
      );
    };
    
    export default FormField;
    