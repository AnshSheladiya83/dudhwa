import React, { useState, useEffect } from "react";
    import FilterInput from "../../atoms/FilterInput";
    import FilterDropdownInput from "../../atoms/FilterDropdownInput";
    
    const Filters = ({ filterData, onFilterChange, clearFilterFields }) => {
      const [filters, setFilters] = useState(() => {
        return filterData.reduce((acc, filter) => {
          acc[filter.fieldName] = "";
          return acc;
        }, {});
      });
    
      useEffect(() => {
        if (clearFilterFields.length > 0) {
          setFilters((prevFilters) => {
            const newFilters = { ...prevFilters };
            clearFilterFields.forEach((field) => {
              newFilters[field] = "";
            });
            onFilterChange(newFilters);
            return newFilters;
          });
        }
      }, [clearFilterFields, filterData, onFilterChange]);
    
      const handleInputChange = (fieldName, value) => {
        setFilters((prevFilters) => {
          const newFilters = { ...prevFilters, [fieldName]: value };
          onFilterChange(newFilters);
          return newFilters;
        });
      };
    
      return (
        <div className="grid gap-4 m-3 lg:grid-cols-2">
          {filterData.map((filter, index) => {
            if (filter.filterType === "selection") {
              return (
                <FilterDropdownInput
                  title={filter.titleName}
                  key={index}
                  options={filter.selectionOptions}
                  onChange={(selectedOption) =>
                    handleInputChange(filter.fieldName, selectedOption)
                  }
                  placeholder={filter.titleName}
                  value={filters[filter.fieldName]} // bind the dropdown value to the state
                />
              );
            } else {
              return (
                <FilterInput
                  title={filter.titleName}
                  key={index}
                  type={filter.filterType}
                  onChange={(newValue) =>
                    handleInputChange(filter.fieldName, newValue)
                  }
                  value={filters[filter.fieldName]} // bind the input value to the state
                />
              );
            }
          })}
        </div>
      );
    };
    
    export default Filters;
    