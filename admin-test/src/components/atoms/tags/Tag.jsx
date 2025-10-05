import React from 'react';

    const Tag = ({ tag, index, removeTag }) => {
      return (
        <div className="inline-flex items-center ml-2 m-1  justify-between space-x-1 bg-[#F0F0F0] text-[#081225] px-2 py-0.5 rounded-md text-sm">
          <div className="text-sm select-none opacity-80">{tag}</div>
          <button onClick={() => removeTag(index)} className="text-sm">
            X
          </button>
        </div>
      );
    };
    
    export default Tag;
    