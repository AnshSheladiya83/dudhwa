import React from 'react';
    import TableHeader from './TableHeader';
    import TableRow from './TableRow';
    import notFoundImage from '../../assets/NoDataFound.png'; 
    
    const Table = ({ headCols, data, dataTitles }) => {   
      return (
        <div className={`overflow-x-auto ${data.length > 0 ? "bg-white " : "flex center-both  bg-white/2"} rounded-t-[12px] md:mb-20 mb-5`} >
          {data.length > 0 ? (
            <table className="min-w-full text-sm text-left text-gray-500 rtl:text-right rounded-[12px]">
              <TableHeader headCols={headCols} dataTitles={dataTitles} /> 
              <tbody>
                {data.map((item, index) => (
                  <TableRow key={index} item={item} dataTitles={dataTitles} headCols={headCols}/>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full center-both select-none mt-[10%]" >
              <img src={notFoundImage} alt="No data found" style={{ height: 200, width: 200 }} />
            </div>
          )}
        </div>
      );
    }
    
    export default Table;
    