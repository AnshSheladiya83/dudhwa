import React from 'react';

// NOTE: Ensure these imports are correct relative to this file's location
// If you use an external CSS file for styling, make sure the classes (like .container) are defined.
import bannerImage from '../../public/assets/image/banner-inner.jpg'; 
import '../assets/css/about.css'; 
import { contactUsCreate } from '../redux/services/contactus/contactusServices';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

// --- 0. Banner Component (Provided by user) ---
const Banner = () => (
  <div className="banner-container" style={{ backgroundImage: `url(${bannerImage})` }}>
    <div className="banner-overlay"></div> 
    <div className="container"> 
      <div className="banner-content">
        <h1 className="main-title">Contact Us</h1>
        {/* <p className="subtitle">Reserve History & Other Information</p> */}
      </div>
    </div>
  </div>
);

const ContactForm = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  contactNo: "",
  arrivalDate: "",
  country: "",
  duration: "",
  noOfPerson: 0,
  tourDescription: "",
  verification: "",
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const body = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      contactNo: formData.contactNo,
      dateOfArrival: formData.arrivalDate || null, // matches backend dateOfArrival
      country: formData.country,
      durationOfStay: formData.duration,
      numberOfPersons: formData.noOfPerson,
      tourDescription: formData.tourDescription,
      verificationCode: formData.verification,
    };

    await dispatch(contactUsCreate({ token, body })).unwrap();

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contactNo: "",
        arrivalDate: "",
        country: "",
        duration: "",
        noOfPerson: "",
        tourDescription: "",
        verification: "",
      });
    } catch (err) {
      console.error("Failed to submit contact form:", err);
    }
  };

  // Styles
  const formLayout = {
    display: "flex",
    gap: "40px",
    padding: "40px 0",
    maxWidth: "1200px",
    margin: "0 auto",
  };
  const inputRowStyle = { display: "flex", gap: "20px", marginBottom: "20px" };
  const inputHalfStyle = {
    flex: "1 1 50%",
    padding: "12px 15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    boxSizing: "border-box",
  };
  const textareaStyle = { ...inputHalfStyle, width: "100%", height: "120px", resize: "none" };
  const captchaImageStyle = {
    width: "100px",
    height: "40px",
    border: "1px dashed #ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    letterSpacing: "3px",
    backgroundColor: "#f9f9f9",
  };
  const submitButtonStyle = {
    padding: "12px 30px",
    backgroundColor: "#e96d2b",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px",
  };
  const mapWrapperStyle = { flex: "1 1 35%", minWidth: "300px", height: "100%", position: "relative", overflow: "hidden" };

  return (
    <div className="container" style={formLayout}>
      {/* Form Section */}
      <div style={{ flex: "1 1 65%", minWidth: "400px" }}>
        <h1 style={{ marginBottom: "40px", fontSize: "36px", fontWeight: "bold" }}>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div style={inputRowStyle}>
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} style={inputHalfStyle} required />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} style={inputHalfStyle} required />
          </div>
          {/* Row 2 */}
          <div style={inputRowStyle}>
            <input type="email" name="email" placeholder="Your E-mail" value={formData.email} onChange={handleChange} style={inputHalfStyle} required />
            <input type="tel" name="contactNo" placeholder="Contact No" value={formData.contactNo} onChange={handleChange} style={inputHalfStyle} required />
          </div>
          {/* Row 3 */}
          <div style={inputRowStyle}>
            <input
              type="text"
              name="arrivalDate"
              placeholder="Date of Arrival"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              value={formData.arrivalDate}
              onChange={handleChange}
              style={inputHalfStyle}
            />
            <select name="country" value={formData.country} onChange={handleChange} style={inputHalfStyle} required>
              <option value="" disabled>Country Name</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
          </div>
          {/* Row 4 */}
          <div style={inputRowStyle}>
            <input type="text" name="duration" placeholder="Duration of Stay" value={formData.duration} onChange={handleChange} style={inputHalfStyle} />
            <input type="number" name="noOfPerson" placeholder="No of Person" value={formData.noOfPerson} onChange={handleChange} style={inputHalfStyle} />
          </div>
          {/* Row 5 */}
          <div style={{ marginBottom: "20px" }}>
            <textarea name="tourDescription" placeholder="Please Enter Your Tour Description and Requirements in Detail." value={formData.tourDescription} onChange={handleChange} style={textareaStyle}></textarea>
          </div>
          {/* Row 6 */}
          <div style={inputRowStyle}>
            <input type="text" name="verification" placeholder="Enter Verification" value={formData.verification} onChange={handleChange} style={inputHalfStyle} />
            <div style={captchaImageStyle}>q C 8 s q</div>
          </div>
          <button type="submit" style={submitButtonStyle}>Submit</button>
        </form>
      </div>

      {/* Map Section */}
      <div style={mapWrapperStyle}>
        <iframe
          src="https://www.google.com/maps?q=Dudhwa%20National%20Park&output=embed"
          width="100%"
          height="500px"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </div>
    </div>
  );
};


// --- 2. Contact Info Section ---
const ContactInfo = () => {
    const sectionStyle = {
        padding: '50px 0 80px 0',
        backgroundColor: '#f9f9f9', // Light background for the info section
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        gap: '40px',
    };

    const itemStyle = {
        flex: '1 1 30%',
    };

    const headingStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#333',
    };

    const contentStyle = {
        fontSize: '16px',
        color: '#666',
        lineHeight: '1.6',
    };

    return (
        <div style={sectionStyle}>
            <div className="container" style={containerStyle}>
                
                {/* Address */}
                <div style={itemStyle}>
                    <h2 style={headingStyle}>Address</h2>
                    <p style={contentStyle}>
                        Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>
                </div>

                {/* Contact No */}
                <div style={itemStyle}>
                    <h2 style={headingStyle}>Contact No</h2>
                    <p style={contentStyle}>+91 989XX XXXXX</p>
                </div>

                {/* Email */}
                <div style={itemStyle}>
                    <h2 style={headingStyle}>Email</h2>
                    <p style={contentStyle}>info@dudhwatiqerreserve.com</p>
                </div>
            </div>
        </div>
    );
};


// --- 3. Main ContactPage Component ---
const ContactPage = () => {
    return (
        <div className="contact-page">
            <Banner />
            <ContactForm />
            <ContactInfo />
        </div>
    );
};

export default ContactPage;