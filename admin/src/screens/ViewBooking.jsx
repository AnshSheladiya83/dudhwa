import React, { useState, useEffect } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { useParams } from "react-router-dom";
import { GetBookingById } from "../redux/api/bookingApi";
import { useSelector } from "react-redux";
import useToast from "../hooks/useToast";
import { format } from "date-fns";

const ViewBooking = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.central.token);
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await GetBookingById(token, id);
        setDetails(data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch booking data");
        setIsLoading(false);
        showToast("error", "Failed to fetch booking data");
      }
    };

    fetchBooking();
  }, [id, token]);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!details) return null;

  return (
    <div className="flex flex-col min-h-screen bg-contentBg">
      {/* Header */}
      <div className="flex md:flex-row flex-col mt-6 ml-6 md:gap-[22px] gap-[15px]">
        <span className="font-urbanist font-semibold text-black text-[28px]">
          View Booking
        </span>
        <Breadcrumbs />
      </div>

      {/* Card */}
      <div className="mt-6 mx-6 rounded-2xl mb-10 bg-white shadow-md p-6">
        {/* Booking Info */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-6">
          {[
            { label: "Safari Zone", value: details.safari_zone },
            { label: "Safari Date", value: details.safari_date ? format(new Date(details.safari_date), "PPP") : "—" },
            { label: "Time Slot", value: details.time_slot },
            { label: "Adults", value: details.adults },
            { label: "Children", value: details.children },
            { label: "Amount", value: details.amount },
            { label: "Tax", value: details.tax },
            { label: "Total Payable", value: details.totalPayable },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between border-b pb-2 text-sm">
              <span className="font-semibold text-gray-700">{item.label}</span>
              <span className="text-gray-900">{item.value ?? "—"}</span>
            </div>
          ))}
        </div>

        {/* Passenger Details */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Passengers</h3>
          {details.passengers?.length > 0 ? (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              {details.passengers.map((p, idx) => (
                <div key={idx} className="border rounded-lg p-3 shadow-sm">
                  <p><span className="font-semibold">Name:</span> {p.name}</p>
                  <p><span className="font-semibold">Gender:</span> {p.gender}</p>
                  <p><span className="font-semibold">Nationality:</span> {p.nationality}</p>
                  <p><span className="font-semibold">Age:</span> {p.age}</p>
                  <p><span className="font-semibold">Type:</span> {p.type}</p>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-gray-500">No passengers added</span>
          )}
        </div>

        {/* Payment Info */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Payment Info</h3>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-700">Razorpay Payment ID</span>
              <span className="text-gray-900">{details.razorpay_payment_id || "—"}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-700">Razorpay Order ID</span>
              <span className="text-gray-900">{details.razorpay_order_id || "—"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBooking;
