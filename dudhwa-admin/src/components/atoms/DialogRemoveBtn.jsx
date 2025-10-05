import React from 'react';

    const DialogRemoveBtn = ({ children,onClick }) => {
      return (
        <button onClick={onClick} className="flex items-center justify-center px-10 py-2 text-base antialiased font-medium text-white transition-colors duration-300 cursor-pointer rounded-xl bg-primary hover:bg-primary/65">
          {children}
        </button>
      );
    };
    
    export default DialogRemoveBtn;
    
    