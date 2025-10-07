import React, { useState, useEffect, useRef } from "react";
import Table from "../components/Table/Table";
import Breadcrumbs from "../components/Breadcrumbs";
import CustomButton from "../components/atoms/CustomButton";
import FormField from "../components/molecules/FormField";
import Pagination from "../components/atoms/Pagination";
import LoaderComponent from "../components/atoms/LoaderComponent";
import useToast from "../hooks/useToast";
import useNavigation from "../hooks/useNavigation";
import { AddOffDates, GetAllOffDates } from "../redux/api/configApi";
import { useSelector } from "react-redux";
import { offDatesDataTitles, offDatesTableHeadCols } from "../data/TableConstants";

const OffDates = () => {
  const { showToast } = useToast();
  const { goToPage } = useNavigation();
  const token = useSelector((state) => state.central.token);

  const tableRef = useRef();

  const [offDates, setOffDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newOffDate, setNewOffDate] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch all off-dates
  const fetchOffDates = async () => {
    try {
      setLoading(true);
      const res = await GetAllOffDates(token);
      const data = Array.isArray(res?.data) ? res.data : res || [];
      setOffDates(data);
      setTotalPages(Math.ceil((data.length || 0) / pageSize));
    } catch (err) {
      setError(err?.message || "Failed to fetch off-dates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffDates();
  }, []);

  // Handle adding new off-date
  const handleAddOffDate = async () => {
    if (!newOffDate) {
      showToast("Please select a date to add.", "error");
      return;
    }
    try {
      const res = await AddOffDates(token, [newOffDate]);
      const updatedData = Array.isArray(res?.data) ? res.data : res || [];
      showToast("Off-date added successfully!", "success");
      setNewOffDate("");
      setOffDates(updatedData?.off_dates || []);
    } catch (err) {
      showToast(err?.message || "Failed to add off-date", "error");
    }
  };

  if (loading) return <LoaderComponent loading={true} />;
  if (error) {
    showToast(error);
    return null;
  }

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = Array.isArray(offDates)
    ? offDates.slice(startIndex, startIndex + pageSize)
    : [];

  // ✅ Transform into structured data for the Table
  const tableData = paginatedData.map((date, i) => ({
    index: startIndex + i + 1,
    date: date, // directly the date string
  }));

  return (
    <div className="flex flex-col min-h-screen bg-contentBg">
      {/* Header */}
      <div className="flex md:flex-row flex-col mt-6 ml-6 md:gap-[22px] gap-[15px]">
        <span className="font-urbanist font-semibold text-black text-[28px] leading-[33.6px]">
          Off-Dates
        </span>
        <Breadcrumbs />
      </div>

      {/* Main Card */}
      <div className="mt-6 mx-6 md:gap-[22px] gap-[15px] rounded-2xl mb-10 bg-white h-full">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:rounded-[22px] rounded-2xl min-h-[500px]">
          {/* Add Off-Date Section */}
          <div className="flex flex-col md:flex-row justify-between items-center p-3 bg-white md:p-6 gap-4">
            <FormField
              title="Select Off-Date"
              type="date"
              value={newOffDate}
              onChange={(value) => setNewOffDate(value)}
            />
            <CustomButton
              title="Add Off-Date"
              icon="https://cdn-icons-png.flaticon.com/128/3161/3161410.png"
              onClick={handleAddOffDate}
            />
          </div>

          {/* Table Section */}
          <div
            ref={tableRef}
            className="bg-white md:px-6 px-3 md:w-full w-[85vw] mt-4"
          >
            <Table
              headCols={offDatesTableHeadCols}
              data={tableData}
              dataTitles={offDatesDataTitles}
            />
          
            
          </div>

          {offDates.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OffDates;
