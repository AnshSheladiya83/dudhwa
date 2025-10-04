import React from 'react';

// NOTE: Ensure these imports are correct relative to this file's location
// If you use an external CSS file for styling, make sure the classes (like .container) are defined.
import bannerImage from '../../public/assets/image/banner-inner.jpg'; 
import '../assets/css/about.css'; 

// --- 0. Banner Component (Provided by user) ---
const Banner = () => (
  <div className="banner-container" style={{ backgroundImage: `url(${bannerImage})` }}>
    <div className="banner-overlay"></div> 
    <div className="container"> 
      <div className="banner-content">
        <h1 className="main-title">Book Safari</h1>
        {/* <p className="subtitle">Reserve History & Other Information</p> */}
      </div>
    </div>
  </div>
);

// --- 1. Contact Form Component ---
const ContactForm = () => {
  // Simple style object for the map container's wrapper to replicate the layout
  const mapWrapperStyle = {
    flex: '1 1 35%',
    minWidth: '300px',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    // The visual style of the map (the angular yellow element) would be achieved via CSS
  };

  // The main form area layout style
  const formLayout = {
    display: 'flex',
    gap: '40px',
    padding: '40px 0',
    maxWidth: '1200px',
    margin: '0 auto',
  };
  
  // Style for the input fields' row container (for first name, last name, etc.)
  const inputRowStyle = {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  };

  // Style for all text inputs/selects to take up half a row
  const inputHalfStyle = {
    flex: '1 1 50%',
    padding: '12px 15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box',
  };
  
  // Style for the textarea
  const textareaStyle = {
    ...inputHalfStyle,
    width: '100%',
    height: '120px',
    resize: 'none',
  };

  // Style for the captcha image placeholder
  const captchaImageStyle = {
    width: '100px',
    height: '40px',
    border: '1px dashed #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    letterSpacing: '3px',
    backgroundColor: '#f9f9f9',
  };

  // Style for the Submit button
  const submitButtonStyle = {
    padding: '12px 30px',
    backgroundColor: '#e96d2b', // Orange color from the image
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
  };

  return (
    <div className="container" style={formLayout}>
      {/* Form Section */}
      <div style={{ flex: '1 1 65%', minWidth: '400px' }}>
        <h1 style={{ marginBottom: '40px', fontSize: '36px', fontWeight: 'bold' }}>Contact Us</h1>

        <form>
          {/* Row 1: First Name & Last Name */}
          <div style={inputRowStyle}>
            <input type="text" placeholder="First Name" style={inputHalfStyle} required />
            <input type="text" placeholder="Last Name" style={inputHalfStyle} required />
          </div>

          {/* Row 2: Your E-mail & Contact No */}
          <div style={inputRowStyle}>
            <input type="email" placeholder="Your E-mail" style={inputHalfStyle} required />
            <input type="tel" placeholder="Contact No" style={inputHalfStyle} required />
          </div>

          {/* Row 3: Date of Arrival & Country Name (Select) */}
          <div style={inputRowStyle}>
            <input type="text" placeholder="Date of Arrival" onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = 'text')} style={inputHalfStyle} />
            <select defaultValue="" style={inputHalfStyle}>
              <option value="" disabled>Country Name</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              {/* ... more countries ... */}
            </select>
          </div>

          {/* Row 4: Duration of Stay & No of Person */}
          <div style={inputRowStyle}>
            <input type="text" placeholder="Duration of Stay" style={inputHalfStyle} />
            <input type="number" placeholder="No of Person" style={inputHalfStyle} />
          </div>

          {/* Row 5: Tour Description (Textarea) */}
          <div style={{ marginBottom: '20px' }}>
            <textarea placeholder="Please Enter Your Tour Description and Requirements in Detail." style={textareaStyle}></textarea>
          </div>
          
          {/* Row 6: Verification & Submit */}
          <div style={inputRowStyle}>
            <input type="text" placeholder="Enter Verification" style={{ flex: '1 1 50%', padding: '12px 15px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px', boxSizing: 'border-box' }} />
            <div style={captchaImageStyle}>q C 8 s q</div>
          </div>

          <button type="submit" style={submitButtonStyle}>
            Submit
          </button>
        </form>
      </div>

      {/* Map Section (Placeholder) */}
      <div style={mapWrapperStyle}>
        {/* Placeholder for the Google Map image/iframe */}
        <iframe 
            src="https://www.google.com/maps?q=Dudhwa%20National%20Park&output=embed" 
            width="100%" 
            height="500px" 
            frameBorder="0" // JSX attribute name for 'frameborder'
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