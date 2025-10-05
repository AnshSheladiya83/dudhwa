import React from 'react';
    import { FaChevronDown } from 'react-icons/fa';
    
    const SelectionButton = ({ icon, title, options, onClick }) => {
      return (
        <div className="relative inline-block">
          <button 
            className="h-[47px] w-[100px] flex center-both px-2 font-urbanist text-base font-semibold rounded-[10px] text-textPrimary  center-v  border border-[#1C1C1C] border-opacity-10 hover:bg-[#9199AF] hover:bg-opacity-[10%]"
            onClick={onClick} 
          >
            {icon && <span className="mr-1">{icon}</span>}
            <span className="">{title}</span>
          </button>
        </div>
      );
    };
    
    export default SelectionButton;
    