import React from 'react';
    import ButtonComponent from '../molecules/ButtonComponent';
    import useCurrentPath from '../../hooks/useCurrentPath';
    import { buttonConfigs } from '../../data/buttonConfig';
    
    const formatDateString = (dateString) => {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString; // Return as is if invalid
      }
    
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
    
      return `${day}-${month}-${year}`; // Format: DD-MM-YYYY
    };
    
    const formatDateTimeFields = (fieldName, fieldValue) => {
      const dateFields = ['startDate', 'endDate', 'anotherDate','date']; 
      if (dateFields.includes(fieldName)) {
        return formatDateString(fieldValue);
      }
      return fieldValue;
    };
    
    const TableRow = ({ item, headCols, dataTitles }) => {
      const { pathname } = useCurrentPath();
    
      // Find the configuration for the current route
      const currentConfig = buttonConfigs.find(config => config.route === pathname);
    
      return (
        <tr className="text-center bg-white border-b">
          {headCols.map((col, index) => (
            <td key={index} className="px-6 py-4">
              {col === "Action" ? (
                <div className="flex justify-center gap-2">
                  {currentConfig && currentConfig.btns && item.product !== 'Total' && (
                    currentConfig.btns.map((btn, index) => (
                      <ButtonComponent
                        key={index}
                        type={btn.type}
                        navigateTo={btn.navigate}
                        onClick={() => console.log(`Action for ${item._id}`)}
                        itemId={item._id}
                      />
                    ))
                  )}
                </div>
              ) : col === "status" ? (
                <span
                  className={`rounded-full px-5 p-2 font-urbanist text-base font-semibold ${
                    item[col] === 'active'
                      ? 'text-[#1F9030] bg-ufoGreen'
                      : 'text-primary bg-primary/5'
                  }`}
                >
                  {item[col] === 'active' ? 'Active' : 'Inactive'}
                </span>
              ) : (
                <span className='text-base font-semibold font-urbanist text-textPrimary'>
                  {item[col] !== undefined && item[col] !== null ? formatDateTimeFields(col, item[col]) : '-'}
                </span>
              )}
            </td>
          ))}
        </tr>
      );
    };
    
    export default TableRow;
