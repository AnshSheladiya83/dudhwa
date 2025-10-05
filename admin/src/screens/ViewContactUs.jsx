import React, { useState, useEffect } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useToast from "../hooks/useToast";
import { GetContactById } from "../redux/api/contactusApi";

const ViewContact = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.central.token);
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await GetContactById(token, id);
        setDetails(data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch contact message");
        setIsLoading(false);
        showToast("error", "Failed to fetch contact message");
      }
    };

    fetchContact();
  }, [id, token]);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!details) return null;

  return (
    <div className="flex flex-col min-h-screen bg-contentBg">
      {/* Header */}
      <div className="flex md:flex-row flex-col mt-6 ml-6 md:gap-[22px] gap-[15px]">
        <span className="font-urbanist font-semibold text-black text-[28px]">
          View Contact Message
        </span>
        <Breadcrumbs />
      </div>

      {/* Card */}
      <div className="mt-6 mx-6 rounded-2xl mb-10 bg-white shadow-md p-6">
        {/* Contact Info */}
     <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-6">
  {[
    { label: "First Name", value: details.firstName },
    { label: "Last Name", value: details.lastName },
    { label: "Email", value: details.email },
    { label: "Phone", value: details.contactNo },
    { label: "Country", value: details.country },
    { 
      label: "Date of Arrival", 
      value: details.dateOfArrival ? new Date(details.dateOfArrival).toLocaleDateString() : "—" 
    },
    { label: "Duration of Stay", value: details.durationOfStay },
    { label: "Number of Persons", value: details.numberOfPersons },
  ].map((item, idx) => (
    <div key={idx} className="flex justify-between border-b pb-2 text-sm">
      <span className="font-semibold text-gray-700">{item.label}</span>
      <span className="text-gray-900">{item.value ?? "—"}</span>
    </div>
  ))}
</div>

{/* Tour Description */}
<div className="mb-6">
  <h3 className="font-semibold text-lg mb-2">Tour Description</h3>
  <p className="text-gray-900 border rounded-lg p-3 bg-gray-50">
    {details.tourDescription || "—"}
  </p>
</div>

{/* Verification / Captcha */}
<div className="mb-6">
  <h3 className="font-semibold text-lg mb-2">Verification</h3>
  <div className="flex gap-4 items-center">
    <span className="text-gray-900">{details.verificationCode || "—"}</span>
  </div>
</div>

      </div>
    </div>
  );
};

export default ViewContact;