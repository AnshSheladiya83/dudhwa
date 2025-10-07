import React, { useState, useRef, useEffect } from "react";
import { format, parseISO } from "date-fns";
import Axios from "../redux/helper/axios";
import { useDispatch, useSelector } from "react-redux";
import { bookingGetAvailability } from "../redux/services/bookings/bookingsServices";
import OffDateSelector from "../components/OffDateSelector";
import { useNavigate } from "react-router-dom";

const safariZones = ["Zone A", "Zone B", "Zone C"];
const maxPersons = 40;
const genders = ["Male", "Female", "Other"];
const safariFee = 1850; // Per person fee

// ✅ ID Validation Rules (based on Indian formats)
const idValidationRules = {
  Aadhar: /^[2-9]{1}[0-9]{11}$/, // 12 digits, first digit not 0/1
  Passport: /^[A-PR-WYa-pr-wy][1-9]\d{6}$/, // Indian passport format
  "Voter ID": /^[A-Z]{3}[0-9]{7}$/, // 3 letters + 7 digits
  "Pan Card": /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // PAN format
  "Driving Licence": /^[A-Z]{2}[0-9]{2}\d{11}$/, // e.g. MH1220150034761
};

function BookSafari() {
  const [step, setStep] = useState(1);
  const [zone, setZone] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("morning");
  const [availabilityMsg, setAvailabilityMsg] = useState("");
  const { availability } = useSelector((state) => state.bookings);
  const [bookedCar, setBookedCar] = useState("");
  const { profile } = useSelector((state) => state.auth);
const navigate = useNavigate();

  const dispatch = useDispatch();

  const [passengers, setPassengers] = useState([]);
  const dateInputRef = useRef(null);

  useEffect(() => {
    if (!date || !timeSlot) return;

    const token = localStorage.getItem("token"); // optional if auth required

    dispatch(
      bookingGetAvailability({
        token,
        safari_date: format(date, "yyyy-MM-dd"),
        time_slot: timeSlot,
      })
    )
      .unwrap()
      .then((res) => {
        console.log(res.data);

        // Check remaining tickets
        if (res.data.remaining <= 0) {
          setAvailabilityMsg(
            "⚠️ All tickets for this time slot are booked. Call the administrator to book offline."
          );
        } else if (res.data.remaining <= 40) {
          // optional threshold warning
          setAvailabilityMsg(
            `⚠️ Only ${res.data.remaining} tickets remaining for this time slot. Once full, online booking will be disabled.`
          );
        } else {
          setAvailabilityMsg("");
        }
      })
      .catch((err) => {
        console.error(err);
        setAvailabilityMsg("");
      });
  }, [date, timeSlot]);

  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.() || dateInputRef.current.click();
    }
  };
  // ✅ Razorpay Integration
  const openRazorpay = async () => {
  if (!window.Razorpay) {
    alert("Razorpay SDK not loaded yet. Please check index.html script tag.");
    return;
  }

  // ===== Fee Table =====
  const FEE_TABLE = {
    Indian: {
      adult: 200,
      child_5_18: 100,
      child_below_5: 0,
      vehicle_entry: 300,
      vehicle_charge: 1850,
    },
    Foreigner: {
      adult: 1600,
      child_5_18: 1400,
      child_below_5: 700,
      vehicle_entry: 300,
      vehicle_charge: 1850,
    },
  };

  const countTravellers = (nationality, type) =>
    passengers.filter((p) => {
      const isNationality = p.nationality === nationality;
      if (type === "adult") return isNationality && p.age >= 18;
      if (type === "child_5_18") return isNationality && p.age >= 5 && p.age < 18;
      if (type === "child_below_5") return isNationality && p.age < 5;
      return false;
    }).length;

  const calcTotal = (nat) => {
    const adults = countTravellers(nat, "adult");
    const children518 = countTravellers(nat, "child_5_18");
    const childrenBelow5 = countTravellers(nat, "child_below_5");

    const total =
      adults * FEE_TABLE[nat].adult +
      children518 * FEE_TABLE[nat].child_5_18 +
      childrenBelow5 * FEE_TABLE[nat].child_below_5;

    return { adults, children518, childrenBelow5, total };
  };

  const indian = calcTotal("Indian");
  const foreigner = calcTotal("Foreigner");

  const entryFee = indian.total + foreigner.total;

  // Vehicle + Extra only if hotel + car selected
  if (profile?.isHotel && !bookedCar) {
    alert("⚠️ Please select a car before proceeding.");
    return;
  }

  const extraFees =
    profile?.isHotel && bookedCar
      ? FEE_TABLE.Indian.vehicle_entry + FEE_TABLE.Indian.vehicle_charge
      : 0;

  const subtotal = entryFee + extraFees;
  const tax = Math.round(subtotal * 0.18);
  const totalPayable = subtotal + tax;

  const options = {
    key: "rzp_test_RPQ7YAm6RLNtFo",
    amount: totalPayable * 100, // in paise
    currency: "INR",
    name: "Dudhwa Safari Booking",
    description: "Safari Ticket Booking",
    image: "https://your-logo-url.com/logo.png",
    handler: async function (response) {
      const bookingData = {
        safari_zone: zone,
        safari_date: date,
        time_slot: timeSlot,
        passengers,
        indian_count: indian,
        foreigner_count: foreigner,
        entryFee,
        extraFees,
        tax,
        totalPayable,
        razorpay_payment_id: response.razorpay_payment_id,
        bookedCar: profile?.isHotel ? bookedCar : undefined,
      };

      try {
        const token = localStorage.getItem("token");
        const res = await Axios.post("/api/bookings", bookingData, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        if (res.data.success) {
          setStep(1);
          setZone("");
          setAdults(0);
          setChildren(0);
          setPassengers([]);
          navigate("/cong");
        } else {
          alert(`⚠️ Booking failed: ${res.data.message}`);
        }
      } catch (err) {
        console.error(err);
        alert(
          `⚠️ Booking API error: ${
            err?.response?.data?.message || err.message
          }`
        );
      }
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
      if (!p.name || !p.gender || !p.nationality || !p.age) {
        alert(`⚠️ Please fill all details for passenger ${i + 1}.`);
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

    // Adults
    for (let i = 0; i < adults; i++) {
      passengerList.push({
        id: passengerList.length + 1,
        type: "Adult",
        name: "",
        gender: "",
        nationality: "",
        age: "",
      });
    }

    // Children
    for (let i = 0; i < children; i++) {
      passengerList.push({
        id: passengerList.length + 1,
        type: "Children",
        name: "",
        gender: "",
        nationality: "",
        age: "",
      });
    }

    setPassengers(passengerList);
    setStep(2);
  } else if (step === 2) {
    if (!validateStep2()) return;
    setStep(3);
  } else if (step === 3) {
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
                <label>
                  {profile && profile?.isHotel
                    ? "Select  safari zone"
                    : "Select your safari zone"}
                </label>
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
              {profile && profile?.isHotel && (
                <div className="form-group">
                  <label>Select Car</label>
                  <select
                    value={bookedCar}
                    onChange={(e) => setBookedCar(e.target.value)}
                  >
                    <option value="">Select Car</option>
                    {["Car1", "Car2", "Car3"].map((car) => (
                      <option key={car} value={car}>
                        {car}
                      </option>
                    ))}
                  </select>
                </div>
              )}
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
                <div className="form-group date-group">
                  <OffDateSelector
                    selectedDate={date}
                    setSelectedDate={setDate}
                  />
                </div>
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

            {availabilityMsg && (
              <p className="mt-2 text-red-600 font-semibold text-sm">
                {availabilityMsg}
              </p>
            )}
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="passenger-step">
            {passengers.map((p, index) => (
              <div key={p.id} style={{ marginBottom: "1.5rem" }}>
                <div className="passenger-label">
                  {`ID of ${p.type} Passenger :${p.id}`}
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
                      value={p.nationality}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "nationality",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select Nationality</option>
                      {["Indian", "Foreigner"].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
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
          {idx + 1}. {p.name} ({p.gender?.[0] || "-"}) Age: {p.age || "-"} –{" "}
          {p.nationality}
        </li>
      ))}
    </ul>

    {(() => {
      // Fee table
      const FEE_TABLE = {
        Indian: {
          adult: 200,
          child_5_18: 100,
          child_below_5: 0,
          vehicle_entry: 300,
          vehicle_charge: 1850,
        },
        Foreigner: {
          adult: 1600,
          child_5_18: 1400,
          child_below_5: 700,
          vehicle_entry: 300,
          vehicle_charge: 1850,
        },
      };

      const countTravellers = (nationality, type) =>
        passengers.filter((p) => {
          const isNationality = p.nationality === nationality;
          if (type === "adult") return isNationality && p.age >= 18;
          if (type === "child_5_18") return isNationality && p.age >= 5 && p.age < 18;
          if (type === "child_below_5") return isNationality && p.age < 5;
          return false;
        }).length;

      const calcTotal = (nat) => {
        const adults = countTravellers(nat, "adult");
        const children518 = countTravellers(nat, "child_5_18");
        const childrenBelow5 = countTravellers(nat, "child_below_5");

        const total =
          adults * FEE_TABLE[nat].adult +
          children518 * FEE_TABLE[nat].child_5_18 +
          childrenBelow5 * FEE_TABLE[nat].child_below_5;

        return { adults, children518, childrenBelow5, total };
      };

      const indian = calcTotal("Indian");
      const foreigner = calcTotal("Foreigner");

      const entryFee = indian.total + foreigner.total;

      // Only apply vehicle + road + guide if hotel + car
      const extraFees =
        profile?.isHotel && bookedCar
          ? FEE_TABLE.Indian.vehicle_entry + FEE_TABLE.Indian.vehicle_charge
          : 0;

      const subtotal = entryFee + extraFees;
      const tax = Math.round(subtotal * 0.18);
      const totalPayable = subtotal + tax;

      return (
        <>
          <h4>Fee Details</h4>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "0.5rem",
            }}
          >
            <thead>
              <tr style={{ background: "#f8f8f8" }}>
                <th style={{ border: "1px solid #ddd", padding: "6px" }}>S.No</th>
                <th style={{ border: "1px solid #ddd", padding: "6px" }}>Item</th>
                <th style={{ border: "1px solid #ddd", padding: "6px" }}>
                  Indian (₹)
                </th>
                <th style={{ border: "1px solid #ddd", padding: "6px" }}>
                  Foreigner (₹)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "6px" }}>1</td>
                <td style={{ border: "1px solid #ddd", padding: "6px" }}>
                  Entry Fee per shift per person (Adult)
                </td>
                <td style={{ border: "1px solid #ddd", padding: "6px" }}>200</td>
                <td style={{ border: "1px solid #ddd", padding: "6px" }}>1600</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "6px" }}>2</td>
                <td style={{ border: "1px solid #ddd", padding: "6px" }}>
                  Entry Fee per shift per person (Children 5–18 yrs)
                </td>
                <td style={{ border: "1px solid #ddd", padding: "6px" }}>100</td>
                <td style={{ border: "1px solid #ddd", padding: "6px" }}>1400</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "6px" }}>3</td>
                <td style={{ border: "1px solid #ddd", padding: "6px" }}>
                  Entry Fee per shift per person (Children below 5 yrs)
                </td>
                <td style={{ border: "1px solid #ddd", padding: "6px" }}>0</td>
                <td style={{ border: "1px solid #ddd", padding: "6px" }}>700</td>
              </tr>

              {profile?.isHotel && bookedCar && (
                <>
                  <tr>
                    <td style={{ border: "1px solid #ddd", padding: "6px" }}>4</td>
                    <td style={{ border: "1px solid #ddd", padding: "6px" }}>
                      Vehicle Entry Fee
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "6px" }}>300</td>
                    <td style={{ border: "1px solid #ddd", padding: "6px" }}>300</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #ddd", padding: "6px" }}>5</td>
                    <td style={{ border: "1px solid #ddd", padding: "6px" }}>
                      Vehicle Charge
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "6px" }}>1850</td>
                    <td style={{ border: "1px solid #ddd", padding: "6px" }}>1850</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>

          <p style={{ marginTop: "10px" }}>
            <strong>Entry Fee Total:</strong> ₹{entryFee}
          </p>
          {profile?.isHotel && bookedCar && (
            <p>
              <strong>Extra Fees (Vehicle + Entry):</strong> ₹{extraFees}
            </p>
          )}
          <p>
            <strong>Subtotal:</strong> ₹{subtotal}
          </p>
          <p>
            <strong>Tax (18%):</strong> ₹{tax}
          </p>
          <p>
            <strong>Total Payable:</strong> ₹{totalPayable}
          </p>
        </>
      );
    })()}
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
