import React from 'react';
    import { FiTrash } from 'react-icons/fi'; // Assuming you're using react-icons for icons
    
    const RemoveButton = ({ onClick }) => {
      return (
        <div className="w-8 h-8 font-medium rounded-lg cursor-pointer center-both text-primary bg-primary/5" onClick={onClick} >
          <FiTrash className="" />
        </div>
      );
    };
    
    export default RemoveButton;
    