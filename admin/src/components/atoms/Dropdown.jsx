import React, { useState } from 'react';

    const Dropdown = ({ options, title, required, value, onChange }) => {
      const [selectedOption, setSelectedOption] = useState(value || null);
      const [isOpen, setIsOpen] = useState(false);
    
      const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(option); // Assuming onChange will handle the selected option
      };
    
      return (
        <div className="relative space-y-1 group">
          <div>
            <span className="text-xs font-medium uppercase font-urbanist text-rhythm">
              {title} {required && <span className="text-sm text-primary">*</span>}
            </span>
          </div>
          <div className="vue-select direction-bottom db-field-control f-b-custom-select">
            <div className="vue-select-header">
              <div className="vue-input">
                <input
                  type="text"
                  value={selectedOption || ''}
                  placeholder="--"
                  readOnly
                  onClick={() => setIsOpen(!isOpen)}
                  tabIndex="0"
                  aria-autocomplete="list"
                  aria-expanded={isOpen}
                  aria-haspopup="listbox"
                  aria-labelledby="dropdown-label"
                  className="bg-[#F8F9FB] text-sm font-medium font-urbanist relative focus:outline-none focus:ring-2 focus:ring-[#008BD9] focus:ring-opacity-40   focus:border-transparent min-w-full flex-1 px-4 py-2 text-rhythm focus:border-border rounded-md shadow-sm placeholder-gray-400"
                />
              </div>
              <span className={`icon ${isOpen ? 'arrow-upward' : 'arrow-downward'}`} />
            </div>
            {isOpen && (
              <ul className="absolute left-0 z-50 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg vue-dropdown max-h-40">
                {options.map((option, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm font-medium border-b border-gray-200 cursor-pointer vue-dropdown-item hover:bg-gray-100 font-urbanist text-rhythm"
                    role="option"
                    aria-selected={selectedOption === option}
                    onClick={() => handleSelect(option)}
                  >
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
    };
    
    export default Dropdown;    
    