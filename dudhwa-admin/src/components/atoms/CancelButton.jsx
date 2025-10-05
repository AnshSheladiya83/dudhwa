import React from 'react';

    const CancelButton = ({ onClick,children }) => {
      return (
        <button onClick={onClick}  className="flex m-1 sm:h-[40px] h-[42px] w-[148px] sm:w-[125px] items-center  justify-center rounded-xl py-2 bg-[#FAFAFB]  hover:bg-gray-100 text-base font-medium antialiased px-10 cursor-pointer  text-black transition-colors duration-300">
          {children}
        </button>
      );
    };
    
    export default CancelButton;
    
    