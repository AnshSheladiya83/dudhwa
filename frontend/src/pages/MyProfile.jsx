import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authGetProfile, authUpdateProfile } from "../redux/services/auth/authServices";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { bookingGetAll } from "../redux/services/bookings/bookingsServices";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyProfilePage = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { bookings } = useSelector((state) => state.bookings || {});
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (token) {
      dispatch(authGetProfile({ token }));
      dispatch(bookingGetAll({ token }));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!token || !profile?._id) return;
    try {
      const res = await dispatch(
        authUpdateProfile({ token, id: profile._id, body: formData })
      ).unwrap();
      if (res.success) {
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error(err || "Failed to update profile");
    }
  };

const downloadTicketPDF = (b) => {
  const doc = new jsPDF("p", "mm", "a4");

  // ===== HEADER SECTION =====
  doc.setFillColor(209, 90, 9);
  doc.rect(0, 0, 210, 25, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text("Dudhwa National Park - Safari Ticket", 15, 17);

  // ===== BASIC INFO =====
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(`Booking ID: ${b._id}`, 15, 35);
  doc.text(`Safari Zone: ${b.safari_zone}`, 15, 43);
  doc.text(`Date: ${format(new Date(b.safari_date), "dd MMM yyyy")}`, 15, 51);
  doc.text(`Time Slot: ${b.time_slot}`, 15, 59);
  doc.text(`Booked Car: ${b.bookedCar || "N/A"}`, 15, 67);

  // ===== AMOUNT DETAILS =====
  doc.setFont("helvetica", "bold");
  doc.text("Payment Summary:", 15, 88);
  doc.setFont("helvetica", "normal");
  autoTable(doc, {
    startY: 92,
    theme: "grid",
    styles: { fontSize: 11 },
    headStyles: { fillColor: [209, 90, 9], halign: "center" },
    head: [["Description", "Amount (Rs)"]],
    body: [
      ["Entry Fee / Person", b.entryFee || "1850"],
      ["Vehicle Fee", b.vehicleFee || (b.bookedCar ? "1500" : "0")],
      ["Road Tax", b.roadTax || (b.bookedCar ? "500" : "0")],
      ["Tour Guide", b.tourGuide || (b.bookedCar ? "1000" : "0")],
      ["Tax (18%)", b.tax || Math.round(b.totalPayable * 0.18)],
      [{ content: "Total Payable", styles: { fontStyle: "bold" } }, `Rs.${b.totalPayable}`],
    ],
  });

  // ===== PASSENGER DETAILS =====
  if (b.passengers?.length > 0) {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [80, 80, 80], halign: "center" },
      head: [["#", "Name", "Gender", "Nationality", "Age", "Type"]],
      body: b.passengers.map((p, i) => [
        i + 1,
        p.name,
        p.gender,
        p.nationality,
        p.age,
        p.type,
      ]),
    });
  }

  // ===== FOOTER =====
  const finalY = doc.lastAutoTable?.finalY || 250;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Thank you for booking with Dudhwa Safari!", 15, finalY + 20);
  doc.text("For queries, contact: info@dudhwasafari.com", 15, finalY + 26);
  doc.text("Official Website: www.dudhwasafari.com", 15, finalY + 32);

  doc.setDrawColor(209, 90, 9);
  doc.line(15, finalY + 35, 195, finalY + 35);

  doc.save(`Safari_Ticket_${b._id}.pdf`);
};

  return (
    <div className="book-safari-container">
      <div className="safari-divider">
        <h2>My Account</h2>
      </div>

      <div className="booking-form" style={{ display: "flex", gap: "2rem" }}>
        {/* Sidebar */}
        <div className="sidebar" style={{ minWidth: "200px" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li
              className={activeTab === "profile" ? "active-tab" : ""}
              onClick={() => setActiveTab("profile")}
            >
              My Profile
            </li>
            <li
              className={activeTab === "bookings" ? "active-tab" : ""}
              onClick={() => setActiveTab("bookings")}
            >
              My Bookings
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content" style={{ flex: 1 }}>
          {activeTab === "profile" && (
            <div className="profile-tab">
              {!profile ? (
                <p>Loading...</p>
              ) : (
                <div className="passenger-step">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Account Created</label>
                      <input
                        type="text"
                        value={new Date(profile.created_at).toLocaleDateString()}
                        readOnly
                      />
                    </div>
                  </div>

                  <button
                    className="next-btn"
                    style={{ marginTop: "1rem" }}
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="bookings-tab" style={{ display: "grid", gap: "1.5rem" }}>
              {!bookings ? (
                <p>Loading bookings...</p>
              ) : bookings.length === 0 ? (
                <p>No bookings found.</p>
              ) : (
                bookings.map((b) => (
                  <div
                    key={b._id}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "12px",
                      padding: "1rem",
                      background: "#fff",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    <h3>Safari Zone: {b.safari_zone}</h3>
                    <p>
                      <strong>Date:</strong>{" "}
                      {format(new Date(b.safari_date), "d-MMM-yyyy")}
                    </p>
                    <p>
                      <strong>Time Slot:</strong> {b.time_slot}
                    </p>
                    <p>
                      <strong>Adults:</strong> {b.adults},{" "}
                      <strong>Children:</strong> {b.children}
                    </p>
                    <p>
                      <strong>Total Payable:</strong> ₹{b.totalPayable}
                    </p>
                    <p>
                      <strong>Payment Status:</strong>{" "}
                      <span
                        style={{
                          color:
                            b.payment_status === "success"
                              ? "green"
                              : b.payment_status === "pending"
                              ? "#d17f09"
                              : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {b.payment_status}
                      </span>
                    </p>

                    {b.bookedCar && (
                      <>
                        <hr />
                        <h4>Booked Car: {b.bookedCar}</h4>
                        <h5 style={{ marginTop: "0.5rem" }}>Travellers:</h5>
                        <table
                          style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginTop: "0.5rem",
                            fontSize: "0.9rem",
                          }}
                        >
                          <thead>
                            <tr style={{ background: "#f8f8f8" }}>
                              <th style={{ padding: "6px", border: "1px solid #ddd" }}>#</th>
                              <th style={{ padding: "6px", border: "1px solid #ddd" }}>Name</th>
                              <th style={{ padding: "6px", border: "1px solid #ddd" }}>Gender</th>
                              <th style={{ padding: "6px", border: "1px solid #ddd" }}>Nationality</th>
                              <th style={{ padding: "6px", border: "1px solid #ddd" }}>Age</th>
                              <th style={{ padding: "6px", border: "1px solid #ddd" }}>Type</th>
                            </tr>
                          </thead>
                          <tbody>
                            {b.passengers?.map((p, i) => (
                              <tr key={i}>
                                <td style={{ padding: "6px", border: "1px solid #ddd" }}>{i + 1}</td>
                                <td style={{ padding: "6px", border: "1px solid #ddd" }}>{p.name}</td>
                                <td style={{ padding: "6px", border: "1px solid #ddd" }}>{p.gender}</td>
                                <td style={{ padding: "6px", border: "1px solid #ddd" }}>{p.nationality}</td>
                                <td style={{ padding: "6px", border: "1px solid #ddd" }}>{p.age}</td>
                                <td style={{ padding: "6px", border: "1px solid #ddd" }}>{p.type}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    )}

                    <button
                      onClick={() => downloadTicketPDF(b)}
                      style={{
                        marginTop: "1rem",
                        background: "#d17f09",
                        color: "#fff",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Download Ticket (PDF)
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
