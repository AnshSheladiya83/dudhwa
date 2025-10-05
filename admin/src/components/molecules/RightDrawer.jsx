import React, { useState } from "react";
    import Filters from "../organism/Filters/Filters";
    import { MdOutlineDragIndicator } from "react-icons/md";
    
    const RightDrawer = ({
      isOpen,
      onClose,
      filterData,
      onFiltersChange,
      onApplyFilters,
      onFieldOrderChange,
      currentFieldOrder,
      hiddenFields,
      visibleFields,
      onFieldVisibilityChange,
    }) => {
      const [currentFilters, setCurrentFilters] = useState({});
      const [clearFilterFields, setClearFilterFields] = useState([]);
    
      const handleFilterChange = (filters) => {
        setCurrentFilters(filters);
        onFiltersChange(filters);
      };
    
      const handleApplyFilters = () => {
        onFiltersChange(currentFilters);
        onApplyFilters();
      };
    
      const handleClear = () => {
        setClearFilterFields(filterData.map((filter) => filter.fieldName));
        setCurrentFilters({});
        setTimeout(() => setClearFilterFields([]), 0);
      };
    
      const handleVisibilityChange = (field, isVisible) => {
        if (isVisible) {
          // Move from hiddenFields to visibleFields
          const updatedHiddenFields = hiddenFields.filter((f) => f !== field);
          const updatedVisibleFields = [...visibleFields, field];
          onFieldVisibilityChange(
            field,
            true,
            updatedHiddenFields,
            updatedVisibleFields
          );
        } else {
          // Move from visibleFields to hiddenFields
          const updatedVisibleFields = visibleFields.filter((f) => f !== field);
          const updatedHiddenFields = [...hiddenFields, field];
          onFieldVisibilityChange(
            field,
            false,
            updatedHiddenFields,
            updatedVisibleFields
          );
        }
      };
    
      const handleFieldOrderChange = (newOrder) => {
        onFieldOrderChange(newOrder);
      };
    
      return (
        <div className="fixed top-0 right-0 z-50 h-screen">
          {isOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={onClose}
            ></div>
          )}
    
          <div
            id="drawer-right-example"
            className={`fixed top-0 right-0 z-50 lg:h-[95%] h-[95%] overflow-y-auto overflow-hidden lg:w-[586px] md:w-[400px] rounded-[30px] px-[22px] pt-[31px] m-[23px] transition-transform ${
              isOpen ? "translate-x-0" : "translate-x-full"
            } bg-white w-80`}
            tabIndex="-1"
            aria-labelledby="drawer-right-label"
          >
            <h5 className="font-semibold text-[22px] font-urbanist text-textPrimary border-b pb-[19px] border-opacity-10">
              Filter
            </h5>
            <button
              type="button"
              onClick={onClose}
              className="absolute top-2.5 end-2.5 m-[23px] inline-flex items-center justify-center"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.2"
                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  fill="#282D34"
                />
                <path
                  d="M8.96967 9.46967C9.26256 9.17678 9.73744 9.17678 10.0303 9.46967L12 11.4394L13.9697 9.46969C14.2626 9.1768 14.7374 9.1768 15.0303 9.46969C15.3232 9.76258 15.3232 10.2375 15.0303 10.5304L13.0607 12.5L15.0303 14.4696C15.3232 14.7625 15.3232 15.2374 15.0303 15.5303C14.7374 15.8232 14.2625 15.8232 13.9696 15.5303L12 13.5607L10.0304 15.5303C9.73746 15.8232 9.26258 15.8232 8.96969 15.5303C8.6768 15.2374 8.6768 14.7626 8.96969 14.4697L10.9394 12L8.96967 10.5303C8.67678 10.2374 8.67678 9.76256 8.96967 9.46967Z"
                  fill="#282D34"
                />
              </svg>
            </button>
            <div className="mt-[32px]">
              <div className="mt-[32px] overflow-y-auto max-h-[800px]">
                <Filters
                  filterData={filterData}
                  onFilterChange={handleFilterChange}
                  clearFilterFields={clearFilterFields}
                />
                {/* Field Reordering Section */}
                <div className="px-6 pt-6 mt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-[22px] font-urbanist text-textPrimary">
                    Reorder Fields
                  </h3>
                  <div className="mt-4 space-y-2">
                    {currentFieldOrder.map((field, index) => (
                      <div
                        key={field}
                        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm cursor-move"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", index);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          const draggedIndex = e.dataTransfer.getData("text/plain");
                          const reorderedFields = Array.from(currentFieldOrder);
                          const [draggedField] = reorderedFields.splice(
                            draggedIndex,
                            1
                          );
                          reorderedFields.splice(index, 0, draggedField);
                          handleFieldOrderChange(reorderedFields);
                        }}
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {field}
                        </span>
                        <MdOutlineDragIndicator className="text-gray-500 hover:text-gray-700" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Field Visibility Section */}
                <div className="px-6 pt-6 mt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-[22px] font-urbanist text-textPrimary">
                    Column Visibility
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="text-sm font-medium text-center text-gray-700">
                        Visible Columns
                      </h4>
                      <div className="mt-2 space-y-2">
                        {visibleFields.map((field, index) => (
                          <div
                            key={field}
                            className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm cursor-move"
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData("text/plain", field);
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              const draggedField =
                                e.dataTransfer.getData("text/plain");
                              if (hiddenFields.includes(draggedField)) {
                                handleVisibilityChange(draggedField, true); // Move from hidden to visible
                              } else if (visibleFields.includes(draggedField)) {
                                handleVisibilityChange(draggedField, false); // Move from visible to hidden
                              }
                            }}
                          >
                            <span className="text-sm font-medium text-gray-700 capitalize">
                              {field}
                            </span>
                            <MdOutlineDragIndicator className="text-gray-500 hover:text-gray-700" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-center text-gray-700">
                        Hidden Columns
                      </h4>
                      <div className="mt-2 space-y-2">
                        {hiddenFields.map((field, index) => (
                          <div
                            key={field}
                            className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm cursor-move"
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData("text/plain", field);
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              const draggedField =
                                e.dataTransfer.getData("text/plain");
                              if (hiddenFields.includes(draggedField)) {
                                handleVisibilityChange(draggedField, true); // Move from hidden to visible
                              } else if (visibleFields.includes(draggedField)) {
                                handleVisibilityChange(draggedField, false); // Move from visible to hidden
                              }
                            }}
                          >
                            <span className="text-sm font-medium text-gray-700 capitalize">
                              {field}
                            </span>
                            <MdOutlineDragIndicator className="text-gray-500 hover:text-gray-700" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full mt-[32px] overflow-y-auto max-h-[300px]">
                <button
                  onClick={handleClear}
                  className={`h-[47px] w-full flex center-both px-2 font-urbanist text-base font-semibold rounded-[10px] text-textPrimary center-v border border-[#1C1C1C] border-opacity-10 hover:bg-[#9199AF] hover:bg-opacity-[10%]`}
                >
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.2"
                      d="M22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5Z"
                      fill="#282D34"
                    />
                    <path
                      d="M8.96967 9.46967C9.26256 9.17678 9.73744 9.17678 10.0303 9.46967L12 11.4394L13.9697 9.46969C14.2626 9.1768 14.7374 9.1768 15.0303 9.46969C15.3232 9.76258 15.3232 10.2375 15.0303 10.5304L13.0607 12.5L15.0303 14.4696C15.3232 14.7625 15.3232 15.2374 15.0303 15.5303C14.7374 15.8232 14.2625 15.8232 13.9696 15.5303L12 13.5607L10.0304 15.5303C9.73746 15.8232 9.26258 15.8232 8.96969 15.5303C8.6768 15.2374 8.6768 14.7626 8.96969 14.4697L10.9394 12L8.96967 10.5303C8.67678 10.2374 8.67678 9.76256 8.96967 9.46967Z"
                      fill="#282D34"
                    />
                  </svg>
    
                  <span className="ml-2 text-base font-semibold font-urbanist">
                    Clear
                  </span>
                </button>
                <button
                  onClick={handleApplyFilters}
                  className={`h-[47px] w-full flex items-center justify-center px-2 font-urbanist text-base font-semibold rounded-[10px] bg-primary hover:bg-[#0078C6] text-white border border-[#1C1C1C] border-opacity-10 ml-2`}
                >
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.6"
                      d="M20.3133 11.6566C20.3133 16.7137 16.2137 20.8133 11.1566 20.8133C6.09956 20.8133 2 16.7137 2 11.6566C2 6.59956 6.09956 2.5 11.1566 2.5C16.2137 2.5 20.3133 6.59956 20.3133 11.6566Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.8387 19.3387C19.121 19.0564 19.5787 19.0564 19.861 19.3387L21.7887 21.2664C22.071 21.5487 22.071 22.0064 21.7887 22.2887C21.5064 22.571 21.0487 22.571 20.7664 22.2887L18.8387 20.361C18.5564 20.0787 18.5564 19.621 18.8387 19.3387Z"
                      fill="white"
                    />
                  </svg>
    
                  <span className="ml-2 text-base font-semibold font-urbanist">
                    Apply
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default RightDrawer;
    