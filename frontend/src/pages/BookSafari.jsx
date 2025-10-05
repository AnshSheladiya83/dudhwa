import React, { useState, useRef } from "react";
import { format, parseISO } from "date-fns";

const safariZones = ["Zone A", "Zone B", "Zone C"];
const maxPersons = 6;
const genders = ["Male", "Female", "Other"];
const idTypes = ["Aadhar", "Passport", "Voter ID", "Pan Card", "Driving Licence"];
const safariFee = 1850; // Per person fee

// ✅ ID Validation Rules (based on Indian formats)
const idValidationRules = {
  Aadhar: /^[2-9]{1}[0-9]{11}$/, // 12 digits, first digit not 0/1
  Passport: /^[A-PR-WYa-pr-wy][1-9]\d{6}$/, // Indian passport format
  "Voter ID": /^[A-Z]{3}[0-9]{7}$/, // 3 letters + 7 digits
  "Pan Card": /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // PAN format
  "Driving Licence": /^[A-Z]{2}[0-9]{2}\d{11}$/ // e.g. MH1220150034761
};

function BookSafari() {
  const [step, setStep] = useState(1);
  const [zone, setZone] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("morning");

  const [passengers, setPassengers] = useState([]);
  const dateInputRef = useRef(null);

  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.() || dateInputRef.current.click();
    }
  };
 // ✅ Razorpay Integration
const openRazorpay = () => {
  if (!window.Razorpay) {
    alert("Razorpay SDK not loaded yet. Please check index.html script tag.");
    return;
  }

  const options = {
    key: "rzp_test_RPQ7YAm6RLNtFo", // 🔴 replace with your Razorpay Key
    amount: totalPayable * 100, // amount in paise
    currency: "INR",
    name: "Dudhwa Safari Booking",
    description: "Safari Ticket Booking",
    image: "https://your-logo-url.com/logo.png", // optional
    handler: function (response) {
      alert(`✅ Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
    },
    prefill: {
      name: passengers[0]?.name || "Guest",
      email: "guest@example.com",
      contact: "9999999999",
    },
    notes: {
      safari_zone: zone,
      date: format(date, "d-MMM-yyyy"),
    },
    theme: {
      color: "#D15A09",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};


  // ✅ STEP 1 Validation
  const validateStep1 = () => {
    if (!zone) {
      alert("⚠️ Please select a safari zone.");
      return false;
    }
    if (adults + children < 1) {
      alert("⚠️ Please select at least 1 traveler.");
      return false;
    }
    if (!date) {
      alert("⚠️ Please select a valid date.");
      return false;
    }
    return true;
  };

  // ✅ STEP 2 Validation (with ID checks)
  const validateStep2 = () => {
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.name || !p.gender || !p.idType || !p.idNumber || !p.age) {
        alert(`⚠️ Please fill all details for passenger ${i + 1}.`);
        return false;
      }

      // ID type based validation
      const regex = idValidationRules[p.idType];
      if (regex && !regex.test(p.idNumber)) {
        alert(`⚠️ Invalid ${p.idType} number for passenger ${i + 1}.`);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!validateStep1()) return;

      // Prepare passenger fields dynamically
      const passengerList = [];

      // Booker (Person booking)
      passengerList.push({
        id: 1,
        type: "Booker",
        name: "",
        gender: "",
        idType: "",
        idNumber: "",
        age: ""
      });

      // Adults
      for (let i = 0; i < adults; i++) {
        passengerList.push({
          id: passengerList.length + 1,
          type: "Adult",
          name: "",
          gender: "",
          idType: "",
          idNumber: "",
          age: ""
        });
      }

      // Children
      for (let i = 0; i < children; i++) {
        passengerList.push({
          id: passengerList.length + 1,
          type: "Children",
          name: "",
          gender: "",
          idType: "",
          idNumber: "",
          age: ""
        });
      }

      setPassengers(passengerList);
      setStep(2);
    } else if (step === 2) {
      if (!validateStep2()) return;
      setStep(3);
    }else if (step === 3) {
      // ✅ Trigger Razorpay Payment
      openRazorpay();
    } else {
      alert("✅ Booking Confirmed & Payment Done!");
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  // Fee Calculations
  const travelerCount = passengers.length;
  const totalFee = travelerCount * safariFee;
  const tax = Math.round(totalFee * 0.18);
  const totalPayable = totalFee + tax;

  return (
    <div className="book-safari-container">
      <div className="safari-divider">
        {step === 1 && (
          <>
            <h2>Book My Safari</h2>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="note-text">Note:</span>
              <span className="person-limit">Number of persons (up to 6)</span>
            </div>
          </>
        )}
        {step === 2 && <></>}
        {step === 3 && <h2>Booking Summary & Payment Details</h2>}
      </div>

      <div className="booking-form">
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Select your safari zone</label>
                <select value={zone} onChange={(e) => setZone(e.target.value)}>
                  <option value="">Select zone</option>
                  {safariZones.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Adults</label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                >
                  {Array.from({ length: maxPersons + 1 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Children (below 12y)</label>
                <select
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                >
                  {Array.from({ length: maxPersons + 1 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group date-group" onClick={openDatePicker}>
                <label>Select Visit Date</label>
                <div className="date-display">
                  <span className="date-number">{format(date, "d")}</span>
                  <span className="date-month">{format(date, "MMM'yy")}</span>
                  <span className="date-weekday">{format(date, "EEEE")}</span>
                </div>
                <input
                  type="date"
                  ref={dateInputRef}
                  value={format(date, "yyyy-MM-dd")}
                  onChange={(e) => setDate(parseISO(e.target.value))}
                  style={{
                    opacity: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                  }}
                />
              </div>
            </div>

            <div className="time-selection">
              <button
                className={timeSlot === "morning" ? "active" : ""}
                onClick={() => setTimeSlot("morning")}
              >
                🌞 Morning Safari
              </button>
              <button
                className={timeSlot === "afternoon" ? "active" : ""}
                onClick={() => setTimeSlot("afternoon")}
              >
                🌤️ Afternoon Safari
              </button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="passenger-step">
            {passengers.map((p, index) => (
              <div key={p.id} style={{ marginBottom: "1.5rem" }}>
                <div className="passenger-label">
                  {index === 0
                    ? "ID of Person booking the tickets"
                    : `ID of ${p.type} Passenger :${p.id}`}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Full Name (Same as ID)"
                      value={p.name}
                      onChange={(e) =>
                        handlePassengerChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <select
                      value={p.gender}
                      onChange={(e) =>
                        handlePassengerChange(index, "gender", e.target.value)
                      }
                    >
                      <option value="">Gender</option>
                      {genders.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <select
                      value={p.idType}
                      onChange={(e) =>
                        handlePassengerChange(index, "idType", e.target.value)
                      }
                    >
                      <option value="">Select ID Type</option>
                      {idTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="ID Number"
                      value={p.idNumber}
                      onChange={(e) =>
                        handlePassengerChange(index, "idNumber", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      placeholder="Age"
                      value={p.age}
                      onChange={(e) =>
                        handlePassengerChange(index, "age", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 3 - Summary */}
        {step === 3 && (
          <div className="summary-step">
            <p>
              <strong>Zone:</strong> {zone}
            </p>
            <p>
              <strong>Date:</strong> {format(date, "d-MMM-yyyy")}
            </p>
            <p>
              <strong>Time Slot:</strong> {timeSlot}
            </p>
            <h4>Traveler Details</h4>
            <ul>
              {passengers.map((p, idx) => (
                <li key={p.id}>
                  {idx + 1}. {p.name} ({p.gender?.[0] || "-"}) Age:{" "}
                  {p.age || "-"}
                </li>
              ))}
            </ul>

            <h4>Fee Details</h4>
            <p>
              Fee × Count: {safariFee} × {travelerCount} = {totalFee} /-
            </p>
            <p>Taxes (18%): {tax} /-</p>
            <p>
              <strong>Total Payable:</strong> {totalPayable} /- Rs
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          {step > 1 && (
            <button className="next-btn" onClick={handlePrevious}>
              Previous
            </button>
          )}
          <button className="next-btn" onClick={handleNext}>
            {step === 1 ? "Next" : step === 2 ? "Next" : "Confirm & Pay"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookSafari;
