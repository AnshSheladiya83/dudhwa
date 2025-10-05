import React from 'react';

    const RadioButton = ({ id, value, name, label, checked, onChange }) => {
      return (
        <div className="inline-flex items-center">
          <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={id}>
            <input
              name={name}
              type="radio"
              value={value}
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-primary transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:before:bg-primary hover:before:opacity-10"
              id={id}
              checked={checked}
              onChange={onChange} // Call onChange when the radio button's value changes
            />
            <span className="absolute transition-opacity opacity-0 pointer-events-none text-primary top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
              </svg>
            </span>
          </label>
          <label className="mt-px text-sm font-medium cursor-pointer select-none font-urbanist text-rhythm" htmlFor={id}>
            {label}
          </label>
        </div>
      );
    };
    
    export default RadioButton;
    