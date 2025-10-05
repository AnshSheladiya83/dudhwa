import React, { useState } from 'react';
    import CommonSelectionList from '../atoms/CommonSelectionList';
    
    const SortFilterButton = ({ onPageSizeChange }) => {
      const [selectedOption, setSelectedOption] = useState(10); // Default value
    
      const handleOptionChange = (selectedPageSize) => {
        setSelectedOption(selectedPageSize);
        onPageSizeChange(selectedPageSize);
      };
    
      return (
        <CommonSelectionList
          options={[10, 25, 50, 100, 500, 1000]}
          buttonText={selectedOption}
          onChange={handleOptionChange}
          value={selectedOption}
        />
      );
    };
    
    export default SortFilterButton;
    