import React from "react";
    import useIsMobile from "../../hooks/useIsMobile";
    
    const Pagination = ({ currentPage, totalPages, onPageChange }) => {
      const isMobile = useIsMobile();
    
      const handlePrevPage = () => {
        if (currentPage > 1) {
          onPageChange(currentPage - 1);
        }
      };
    
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          onPageChange(currentPage + 1);
        }
      };
    
      const handlePageChange = (page) => {
        onPageChange(page);
      };
    
      const renderPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 7) {
          for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
          }
        } else {
          pageNumbers.push(1);
          if (currentPage > 4) {
            pageNumbers.push("...");
          }
          const startPage = Math.max(2, currentPage - 1);
          const endPage = Math.min(totalPages - 1, currentPage + 1);
          for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
          }
          if (currentPage < totalPages - 3) {
            pageNumbers.push("...");
          }
          pageNumbers.push(totalPages);
        }
        return pageNumbers;
      };
    
      const renderMobilePagination = () => {
        const pageNumbers = [];
        for (let i = 0; i < Math.min(3, totalPages - currentPage + 1); i++) {
          pageNumbers.push(currentPage + i);
        }
    
        return (
          <ul className="inline-flex items-center space-x-1">
            <li>
              <button
                onClick={handlePrevPage}
                className="h-10 w-10 ml-0 center-both font-semibold text-xs rounded-lg outline-none text-primary bg-[#9199AF1A]/10"
                disabled={currentPage === 1}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5956 15.6973L8.16485 12.3704C7.94505 12.1572 7.94505 11.8427 8.16485 11.6296L14.7953 5.19988C15.2091 4.79868 16 5.04187 16 5.57029L16 11.2929L11.5956 15.6973Z"
                    fill="#282D34"
                  />
                  <path
                    opacity="0.5"
                    d="M16 12.7071L16 18.4297C16 18.9581 15.2091 19.2013 14.7953 18.8001L12.3136 16.3935L16 12.7071Z"
                    fill="#282D34"
                  />
                </svg>
              </button>
            </li>
            {pageNumbers.map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageChange(page)}
                  className={`h-10 w-10 leading-4 rounded-lg outline-none ${
                    currentPage === page
                      ? "bg-primary/5 text-black border border-2 border-primary"
                      : "bg-white text-black border border-opacity-10 hover:bg-[#9199AF1A]/10 hover:text-primary"
                  } text-base font-semibold`}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleNextPage}
                className="h-10 w-10 ml-0 center-both font-semibold text-xs rounded-lg outline-none text-primary bg-[#9199AF1A]/10"
                disabled={currentPage === totalPages}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.4044 15.6973L15.8351 12.3704C16.0549 12.1572 16.0549 11.8427 15.8351 11.6296L9.20467 5.19988C8.79094 4.79868 8 5.04187 8 5.57029L8 11.2929L12.4044 15.6973Z"
                    fill="#282D34"
                  />
                  <path
                    opacity="0.5"
                    d="M8 12.7071L8 18.4297C8 18.9581 8.79094 19.2013 9.20467 18.8001L11.6864 16.3935L8 12.7071Z"
                    fill="#282D34"
                  />
                </svg>
              </button>
            </li>
          </ul>
        );
      };
    
      const renderDesktopPagination = () => (
        <ul className="inline-flex items-center space-x-1 overflow-x-auto md:overflow-visible">
          <li>
            <button
              onClick={handlePrevPage}
              className="h-10 w-10 ml-0 center-both font-semibold text-xs rounded-lg outline-none text-primary bg-[#9199AF1A]/10"
              disabled={currentPage === 1}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5956 15.6973L8.16485 12.3704C7.94505 12.1572 7.94505 11.8427 8.16485 11.6296L14.7953 5.19988C15.2091 4.79868 16 5.04187 16 5.57029L16 11.2929L11.5956 15.6973Z"
                  fill="#282D34"
                />
                <path
                  opacity="0.5"
                  d="M16 12.7071L16 18.4297C16 18.9581 15.2091 19.2013 14.7953 18.8001L12.3136 16.3935L16 12.7071Z"
                  fill="#282D34"
                />
              </svg>
            </button>
          </li>
          {renderPageNumbers().map((page, index) => (
            <li key={index}>
              {typeof page === "number" ? (
                <button
                  onClick={() => handlePageChange(page)}
                  className={`h-10 w-10 leading-4 rounded-lg outline-none ${
                    currentPage === page
                      ? "bg-primary/5 text-black border border-2 border-primary"
                      : "bg-white text-black border border-opacity-10 hover:bg-[#9199AF1A]/10 hover:text-primary"
                  } text-base font-semibold`}
                >
                  {page}
                </button>
              ) : (
                <span className="flex items-center justify-center w-10 h-10 text-base font-semibold leading-4 text-gray-500 rounded-lg">
                  {page}
                </span>
              )}
            </li>
          ))}
          <li>
            <button
              onClick={handleNextPage}
              className="h-10 w-10 ml-0 center-both font-semibold text-xs rounded-lg outline-none text-primary bg-[#9199AF1A]/10"
              disabled={currentPage === totalPages}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.4044 15.6973L15.8351 12.3704C16.0549 12.1572 16.0549 11.8427 15.8351 11.6296L9.20467 5.19988C8.79094 4.79868 8 5.04187 8 5.57029L8 11.2929L12.4044 15.6973Z"
                  fill="#282D34"
                />
                <path
                  opacity="0.5"
                  d="M8 12.7071L8 18.4297C8 18.9581 8.79094 19.2013 9.20467 18.8001L11.6864 16.3935L8 12.7071Z"
                  fill="#282D34"
                />
              </svg>
            </button>
          </li>
        </ul>
      );
    
      return (
        <nav className="flex justify-end p-5 md:absolute md:bottom-0 md:right-0 center-h">
          {isMobile ? renderMobilePagination() : renderDesktopPagination()}
        </nav>
      );
    };
    
    export default Pagination;
    