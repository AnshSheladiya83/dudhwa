import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authGetProfile, authUpdateProfile } from "../redux/services/auth/authServices";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { bookingGetAll } from "../redux/services/bookings/bookingsServices";

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
                      <strong>Adults:</strong> {b.adults}, <strong>Children:</strong>{" "}
                      {b.children}
                    </p>
                    <p>
                      <strong>Total Payable:</strong> ₹{b.totalPayable}
                    </p>
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
