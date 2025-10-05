import React from 'react';
    
    const TableHeader = ({ headCols, dataTitles }) => {
      // Function to convert camel case to title case with spaces
      const convertToTitleCase = (camelCase) => {
        return camelCase.replace(/([a-z])([A-Z])/g, '$1 $2');
      };
    
      return (
        <thead className="bg-gray-50">
          <tr>
            {headCols.map((col, index) => (
              
              <th key={index} scope="col" className="px-6 py-3 text-center font-urbanist text-rhythm font-semibold text-base tracking-[1%] leading-[21.6px]">
                {col === "Action" ? "Action" : (dataTitles[col] ? convertToTitleCase(dataTitles[col]) : convertToTitleCase(col))}
              </th>
            ))}
          </tr>
        </thead>
      );
    };
    
    export default TableHeader;
    