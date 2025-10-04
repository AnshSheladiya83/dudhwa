import React from 'react';

// Assuming the image is saved in 'assets' relative to the project root
// and the CSS is also linked correctly for the Banner component
import bannerImage from '../../public/assets/image/banner-inner.jpg';
import '../assets/css/about.css'; 

// Component for the top banner (reused from previous implementation)
const Banner = () => (
<div className="banner-container" style={{ backgroundImage: `url(${bannerImage})` }}>
<div className="banner-overlay"></div> {/* For the darkening effect */}
<div className="container">
<div className="banner-content">
<h1 className="main-title">Payment Details</h1>
{/* <p className="subtitle">Reserve History & Other Information</p> */}
</div>
</div>
</div>
);


const BookingSummaryAndPayment = ({
zone = "East Zone",
date = "4-Sep-2025",
travelers = [
{ name: "Aman Singh", gender: "M", age: 35 },
{ name: "Abhishek Kumar", gender: "M", age: 30 },
{ name: "Apoorva Kumari", gender: "F", age: 27 }
],
feePerPerson = 1850,
taxesPercentage = 18
}) => {

// --- Calculation Logic ---
const totalTravelers = travelers.length;
const subtotal = feePerPerson * totalTravelers;
// Taxes are not explicitly used in the final "Total payable" in the image, 
// but the subtotal matches the final total (5,550/-) implying taxes may be included or omitted for simplicity.
const totalPayable = subtotal; // Using subtotal as the final total to match the image (1850 * 3 = 5550)

// --- Inline Styles ---

const mainContainerStyle = {
maxWidth: '700px',
// --- MODIFIED LINE: Set margin-top to 120px ---
margin: '120px auto 40px auto', 
padding: '30px',
fontFamily: 'Arial, sans-serif',
backgroundColor: '#fff',
};

const titleStyle = {
fontSize: '28px',
fontWeight: 'bold',
color: '#333',
marginBottom: '25px',
};

const tableStyle = {
width: '100%',
borderCollapse: 'collapse',
border: '1px solid #ccc',
borderRadius: '8px',
overflow: 'hidden', // Ensures border radius works
marginBottom: '30px',
};

const cellStyle = {
padding: '15px',
borderBottom: '1px solid #eee',
textAlign: 'left',
fontSize: '16px',
color: '#333',
};

const keyCellStyle = {
...cellStyle,
width: '30%',
fontWeight: 'bold',
backgroundColor: '#f9f9f9',
};

const travelerCellStyle = {
...cellStyle,
lineHeight: '1.6',
};

const travelerItemStyle = {
fontSize: '15px',
color: '#555',
};

const totalContainerStyle = {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
marginTop: '20px',
paddingTop: '20px',
};

const totalPayableTextStyle = {
fontSize: '30px',
fontWeight: 'bold',
color: '#e96d2b',
};

const buttonContainerStyle = {
display: 'flex',
justifyContent: 'flex-start',
gap: '15px',
marginTop: '30px',
};

const prevButtonStyle = {
padding: '10px 25px',
backgroundColor: 'white',
color: '#e96d2b',
border: '1px solid #e96d2b',
borderRadius: '6px',
fontSize: '16px',
fontWeight: 'bold',
cursor: 'pointer',
};

const confirmButtonStyle = {
padding: '10px 25px',
backgroundColor: '#e96d2b',
color: 'white',
border: 'none',
borderRadius: '6px',
fontSize: '16px',
fontWeight: 'bold',
cursor: 'pointer',
};

// --- Component Render ---

return (
<div style={mainContainerStyle}>
<h1 style={titleStyle}>Booking Summary and Payment Details</h1>

<table style={tableStyle}>
<tbody>
{/* Zone Row */}
<tr>
<td style={keyCellStyle}>Zone</td>
<td style={cellStyle}>{zone}</td>
</tr>

{/* Date Row */}
<tr>
<td style={keyCellStyle}>Date</td>
<td style={cellStyle}>{date}</td>
</tr>

{/* Traveler Details Row */}
<tr>
<td style={keyCellStyle}>Traveler details</td>
<td style={travelerCellStyle}>
{travelers.map((traveler, index) => (
<div key={index} style={travelerItemStyle}>
{index + 1}. **{traveler.name}** ({traveler.gender}): Age: {traveler.age}
</div>
))}
</td>
</tr>

{/* Fee x Count Row */}
<tr>
<td style={keyCellStyle}>Fee &times; count</td>
<td style={cellStyle}>
{feePerPerson.toLocaleString()} &times; {totalTravelers} = (
<span style={{ color: '#e96d2b', fontWeight: 'bold' }}>
{totalPayable.toLocaleString()}/- Rs
</span>
)
</td>
</tr>

{/* Taxes Row */}
<tr>
<td style={keyCellStyle}>Taxes</td>
<td style={cellStyle}>{taxesPercentage}%</td>
</tr>
</tbody>
</table>

{/* Total Payable & Buttons */}
<div style={totalContainerStyle}>
<div style={{ flex: 1 }}>
<span style={totalPayableTextStyle}>
Total payable = {totalPayable.toLocaleString()}/-
</span>
</div>
</div>

<div style={buttonContainerStyle}>
<button style={prevButtonStyle}>Previous</button>
<button style={confirmButtonStyle}>Confirm & Pay</button>
</div>
</div>
);
};


// A new component to contain both the Banner and the Booking Summary
const BookingPage = () => {
    return (
        <div>
            <Banner />
            {/* The BookingSummaryAndPayment component will now appear below the Banner */}
            <BookingSummaryAndPayment /> 
        </div>
    );
}

export default BookingPage;