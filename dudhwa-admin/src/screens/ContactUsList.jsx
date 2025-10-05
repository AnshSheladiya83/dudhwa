import React, { useState, useEffect, useRef } from 'react';
import Table from '../components/Table/Table';
import SearchBar from '../components/atoms/SearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import CustomButton from '../components/atoms/CustomButton';
import * as XLSX from 'xlsx';
import { useReactToPrint } from 'react-to-print';
import Pagination from '../components/atoms/Pagination';
import useToast from '../hooks/useToast';
import LoaderComponent from '../components/atoms/LoaderComponent';
import { useSelector } from 'react-redux';
import { contactDataTitles, contactTableHeadCols } from '../data/TableConstants';
import { GetAllContacts } from '../redux/api/contactusApi';

const ContactUsPage = () => {
  const { showToast } = useToast();
  const token = useSelector((state) => state.central.token);
  const tableRef = useRef();

  const [contactData, setContactData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await GetAllContacts(token, searchQuery, pageSize, currentPage);
      setContactData(data?.data);
      setTotalPages(data?.meta?.total_pages);
      setTotalEntries(data?.meta?.total_results);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, searchQuery, pageSize, currentPage]);

  const handleSearch = (query) => setSearchQuery(query);
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  const handlePageChange = (page) => setCurrentPage(page);

  const handlePrint = useReactToPrint({ content: () => tableRef.current });

  const handleExportToXLS = () => {
    const worksheet = XLSX.utils.json_to_sheet(contactData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "contacts");
    XLSX.writeFile(workbook, "contacts.xlsx");
  };

  if (loading) return <LoaderComponent loading={true} />;
  if (error) {
    showToast(error);
    return null;
  }

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = currentPage === totalPages ? totalEntries : startIndex + pageSize - 1;

  return (
    <div className="flex flex-col min-h-screen sm:w-screen md:w-auto bg-contentBg">
      <div className="flex md:flex-row flex-col mt-6 ml-6 md:gap-[22px] gap-[15px]">
        <span className="font-urbanist font-semibold text-black text-[28px] leading-[33.6px]">
          Contact Messages
        </span>
        <Breadcrumbs />
      </div>

      <div className="mt-6 mx-6 md:gap-[22px] gap-[15px] rounded-2xl mb-10 bg-white h-full">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:rounded-[22px] rounded-2xl min-h-[870px]">
          <div className="flex flex-col justify-between p-3 bg-white md:p-6 center-v lg:flex-row">
            {/* <SearchBar
              onSearch={handleSearch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setCurrentPage={setCurrentPage}
              screenName="contact"
            /> */}
          </div>

          <div ref={tableRef} className="bg-white md:px-6 px-3 md:w-full w-[85vw]">
            <Table
              headCols={contactTableHeadCols}
              data={contactData}
              dataTitles={contactDataTitles}
            />
          </div>

          {totalEntries > 0 && (
            <>
              <div className="ml-3 text-base font-semibold text-textPrimary font-urbanist md:absolute bottom-5 left-5 md:ml-0">
                Showing {startIndex} to {endIndex} of {totalEntries} entries
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
