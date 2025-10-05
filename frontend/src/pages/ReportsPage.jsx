// ReportsPage.jsx
import React from 'react';

// NOTE: Ensure these imports are correct relative to this file's location
import bannerImage from '../../public/assets/image/banner-inner.jpg'; 
import '../assets/css/about.css'; 

// --- 0. Banner Component ---
const Banner = () => (
  <div className="banner-container" style={{ backgroundImage: `url(${bannerImage})` }}>
    <div className="banner-overlay"></div> 
    <div className="container"> {/* External container class for banner content */}
      <div className="banner-content">
        <h1 className="main-title">Reports</h1>
        {/* <p className="subtitle">Reserve History & Other Information</p> */}
      </div>
    </div>
  </div>
);

// --- 1. Data Structure ---
const reportData = [
  {
    reportTitle: 'WildCER - One Health Project',
    description: 'Wild-CER is a registered non-profit charity working towards environment sustainability across India.',
    authors: '-',
    dateOfPublishing: '11/04/2025',
    originalScanLink: 'Click to View',
    isVolume: false,
  },
  {
    reportTitle: 'Waterbird Census Report',
    description: 'Map showing Asian Waterbirds Census 2025 sites in Core and Buffer of Tadoba-Andhari Tiger Reserve, Chandrapur Maharashtra.',
    authors: '-',
    dateOfPublishing: '19/01/2025',
    originalScanLink: 'Click to View',
    isVolume: false,
  },
  {
    reportTitle: 'Volume-I Core Area Plan',
    description: 'The Project Tiger guidelines made it mandatory that every Tiger Reserve should be managed in accordance with a site specific Management Plan, which is the road map for managing a Tiger Reserve.',
    authors: 'Dr. S. H. Patil, Shri. V. R. Tiwari, Shri. G. P. Garad',
    dateOfPublishing: '2016-17',
    originalScanLink: 'Click to View',
    isVolume: true,
  },
  {
    reportTitle: 'Volume-II Buffer Area Plan',
    description: 'Buffer Forest Division is situated in the geographical limits of Chandrapur district comprises of forest areas adjoining to the Core of Tadoba-Andhari Tiger Reserve.',
    authors: 'Dr. S. H. Patil, Shri. V. R. Tiwari, Shri. G. P. Garad',
    dateOfPublishing: '2016-17',
    originalScanLink: 'Click to View',
    isVolume: true,
  },
  {
    reportTitle: 'Volume-III Adjoining Area Plan',
    description: 'The area included as adjoining area comprised of Bramhapuri Forest Division, Central Chandra Forest Division, Chandrapur Forest Division, West Chanda FDCM Division, Central Chanda FDCM Division and Bramhapuri FDCM Division.',
    authors: 'Dr. S. H. Patil, Shri. V. R. Tiwari, Shri. G. P. Garad',
    dateOfPublishing: '2016-17',
    originalScanLink: 'Click to View',
    isVolume: true,
  },
  {
    reportTitle: 'Volume-IV Eco Tourism Plan',
    description: 'Tadoba-Andhari Tiger Reserve was established as second Tiger Reserve in the Maharashtra State, in 1994-95. It represents Southern Tropical Dry Deciduous Teak Forests in the Tiger habitat.',
    authors: 'Dr. S. H. Patil, Shri. V. R. Tiwari, Shri. G. P. Garad',
    dateOfPublishing: '2016-17',
    originalScanLink: 'Click to View',
    isVolume: true,
  },
];


// --- 2. ReportRow Component ---
const ReportRow = ({ report, index }) => { 
  const authorsContent = report.isVolume
    ? report.authors.split(', ').map((line, idx) => (
        <React.Fragment key={idx}>
          {line}
          {idx < report.authors.split(', ').length - 1 && <br />}
        </React.Fragment>
      ))
    : report.authors;
    
  // Logic for Odd/Even/Volume background color
  const isEvenRow = index % 2 === 0;

  const EVEN_BG_COLOR = '#fff'; // Requested even row color
  const ODD_BG_COLOR = '#d2f0f1'; // White for odd rows
  const VOLUME_BG_COLOR = '#'; // Existing tint for all Volume rows

  let bgColor;
  if (report.isVolume) {
    bgColor = isEvenRow ? EVEN_BG_COLOR : ODD_BG_COLOR; 
   
  } else {
    // Standard rows alternate
     bgColor = VOLUME_BG_COLOR; 
  }

  // Inline Styles
  const rowStyle = {
    display: 'grid', gridTemplateColumns: '50% 18% 18% 14%', alignItems: 'center', padding: '10px 15px',
    borderBottom: '1px solid #eee', 
    backgroundColor: bgColor, 
    minHeight: '80px', 
  };
  const titleDescriptionStyle = { paddingRight: '20px' };
  const titleStyle = { fontWeight: 'bold', fontSize: '14px', color: report.isVolume ? '#000' : '#222', marginBottom: '4px' };
  const descriptionStyle = { fontSize: '12px', color: '#666' };
  const cellStyle = { fontSize: '12px', color: '#000', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' };
  const linkStyle = { color: '#007bff', textDecoration: 'none', fontWeight: '600', cursor: 'pointer' };


  return (
    <div style={rowStyle}>
      <div style={titleDescriptionStyle}>
        <div style={titleStyle}>{report.reportTitle}</div>
        <div style={descriptionStyle}>{report.description}</div>
      </div>
      <div style={cellStyle}>{authorsContent}</div>
      <div style={cellStyle}>{report.dateOfPublishing}</div>
      <div style={cellStyle}>
        <a href="#" style={linkStyle}>{report.originalScanLink}</a>
      </div>
    </div>
  );
};

// --- 3. Report Component (The Table itself) ---
const Report = () => {
  const headerStyle = {
    display: 'grid', gridTemplateColumns: '50% 18% 18% 14%',
    backgroundColor: '#004d40', color: 'white', fontWeight: 'bold',
    padding: '12px 15px', fontSize: '13px', textTransform: 'uppercase',
  };

  const tableWrapperStyle = {
    fontFamily: 'Arial, sans-serif', 
    border: '1px solid #ccc',
  }

  return (
    <div style={tableWrapperStyle}> 
      <div style={headerStyle}>
        <div>REPORT TITLE</div>
        <div>AUTHORS</div>
        <div>DATE OF PUBLISHING</div>
        <div>ORIGINAL SCAN</div>
      </div>
      <div>
        {/* Pass the 'index' to ReportRow */}
        {reportData.map((report, index) => (
          <ReportRow key={index} report={report} index={index} />
        ))}
      </div>
    </div>
  );
};


// --- 4. ReportsPage Component (The Main Page) ---
const ReportsPage = () => {
  const pageSectionStyle = {
    padding: '40px 0', 
  };

  const headingStyle = {
    color: '#004d40',
    marginBottom: '30px',
    textAlign: 'center',
  };

  return (
    <div>
      {/* 1. Page Banner */}
      <Banner /> 

      {/* 2. Page Content Section */}
      <section style={pageSectionStyle}>
        <div className="container"> {/* Use the standard 'container' class for page width/centering */}
          <h2 style={headingStyle}>Project Reports and Documentation</h2>
          
          {/* 3. Report Table */}
          <Report />
        </div>
      </section>
    </div>
  );
};

export default ReportsPage;