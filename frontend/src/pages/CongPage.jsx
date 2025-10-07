import React from 'react';

// --- IMPORTS (Top Section) ---
// Assuming the image is saved in 'assets'
import bannerImage from '../../public/assets/image/banner-inner.jpg';
import '../assets/css/about.css';

// --- BANNER COMPONENT ---
// Component for the top banner (reused from previous implementation)
const Banner = () => (
 <div className="banner-container" style={{ backgroundImage: `url(${bannerImage})` }}>
  <div className="banner-overlay"></div> {/* For the darkening effect */}
  <div className="container">
 <div className="banner-content">
<h1 className="main-title">Congratulation</h1>
{/* <p className="subtitle">Reserve History & Other Information</p> */}
 </div>
  </div>
 </div>
);


/**
 * Renders the Booking Confirmed success message.
 */
const BookingConfirmationSuccess = () => {

  // --- Inline Styles ---

  const containerStyle = {
 display: 'flex',
 flexDirection: 'column',
 alignItems: 'center',
 justifyContent: 'center',
 // Centering container below banner
 margin: '100px auto 40px auto', 
 padding: '20px',
 fontFamily: 'Arial, sans-serif',
 backgroundColor: '#fff',
 maxWidth: '80%',
  };

  const congratulationStyle = {
 fontSize: '60px',
 fontWeight: 'bold',
 color: '#ff6700', // Bright orange/coral color
 fontFamily: 'Georgia, serif', 
 marginBottom: '20px',
 textShadow: '2px 2px 5px rgba(255, 103, 0, 0.2)', 
 position: 'relative',
  };

  const starStyle = {
 position: 'absolute',
 fontSize: '20px',
 color: '#ffc300', // Yellow color for stars
 fontWeight: 'normal',
 lineHeight: '0', 
  };

  const starLeftStyle = {
 ...starStyle,
 top: '0px', 
 left: '-30px',
  };

  const starRightStyle = {
 ...starStyle,
 bottom: '15px', 
 right: '-30px',
  };

  const buttonContainerStyle = {
 backgroundColor: '#5cb85c', // Green color
 color: 'white',
 padding: '25px 50px',
 borderRadius: '8px',
 textAlign: 'center',
 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
 width: '100%',
 maxWidth: '40%',
  };

  const buttonTextStyle = {
 fontSize: '24px',
 fontWeight: 'bold',
 marginBottom: '8px',
  };

  const subTextStyle = {
 fontSize: '14px',
 opacity: 0.9,
  };

  // --- Component Render ---

  return (
 <div style={containerStyle}>
<h1 style={congratulationStyle}>
  <span style={starLeftStyle}>★</span> 
  Congratulation
  <span style={starRightStyle}>★</span>
</h1>

<div style={buttonContainerStyle}>
  <div style={buttonTextStyle}>
 **Booking Confirmed**
  </div>
  <div className='order-name'>
      {/* <h5>  Oder No: 9874563210</h5> */}
<h5>Date: {new Date().toLocaleDateString("en-GB")}</h5>
  </div>
  <div style={subTextStyle}>
 Vehicle details will be shared 1 day before safari.
  </div>
</div>
 </div>
  );
};

// --- PARENT COMPONENT TO EXPORT ---
const ConfirmationPage = () => {
    return (
        <div>
            <Banner />
            <BookingConfirmationSuccess /> 
        </div>
    );
}

export default ConfirmationPage;