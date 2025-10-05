import React from 'react';

    const CustomButton = ({ bgColor, textColor, icon, title, onClick }) => {
        const isIconUrl = typeof icon === 'string';
    
        return (
            <button 
                className={`cursor-pointer h-[47px] md:mt-0 mt-2 flex center-both px-2 font-urbanist text-base font-semibold rounded-[10px] bg-primary hover:bg-[#0078C6] text-white  center-v  border border-[#1C1C1C] border-opacity-10 `}
                onClick={onClick} // Attach onClick function
            >
                {isIconUrl ? (
                    <img src={icon} alt="icon" className="me-1 relative bottom-[1px] h-4 w-4 invert mr-2" />
                ) : (
                    icon && <span className="me-1 relative bottom-[1px]">{icon}</span>
                )}
                <span className="text-sm font-semibold font-urbanist">{title}</span>
            </button>
        );
    };
    
    export default CustomButton;
    
    