import React from 'react';

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
const ReportRow = ({ report }) => {
  // Logic to separate authors by <br /> for the volume reports
  const authorsContent = report.isVolume
    ? report.authors.split(', ').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < report.authors.split(', ').length - 1 && <br />}
        </React.Fragment>
      ))
    : report.authors;

  // Conditional styling for the 'Volume' rows (darker background)
  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '50% 18% 18% 14%',
    alignItems: 'center',
    padding: '10px 15px',
    borderBottom: '1px solid #eee',
    backgroundColor: report.isVolume ? '#f2f7f7' : '#fff', // Light grey/teal tint
    minHeight: '80px', // Ensures enough space for multiline text
  };

  const titleDescriptionStyle = {
    paddingRight: '20px',
  };

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: '14px',
    color: report.isVolume ? '#000' : '#222',
    marginBottom: '4px',
  };

  const descriptionStyle = {
    fontSize: '12px',
    color: '#666',
  };

  const cellStyle = {
    fontSize: '12px',
    color: '#000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  };

  const linkStyle = {
    color: '#007bff', // Or whatever blue/green color is in the original image
    textDecoration: 'none',
    fontWeight: '600',
    cursor: 'pointer',
  };

  return (
    <div style={rowStyle}>
      {/* Report Title and Description Column */}
      <div style={titleDescriptionStyle}>
        <div style={titleStyle}>{report.reportTitle}</div>
        <div style={descriptionStyle}>{report.description}</div>
      </div>

      {/* Authors Column */}
      <div style={cellStyle}>{authorsContent}</div>

      {/* Date of Publishing Column */}
      <div style={cellStyle}>{report.dateOfPublishing}</div>

      {/* Original Scan Column */}
      <div style={cellStyle}>
        <a href="#" style={linkStyle}>{report.originalScanLink}</a>
      </div>
    </div>
  );
};

// --- 3. ReportTable Component ---
const ReportTable = () => {
  const headerStyle = {
    display: 'grid',
    gridTemplateColumns: '50% 18% 18% 14%',
    backgroundColor: '#004d40', // Dark teal/green header
    color: 'white',
    fontWeight: 'bold',
    padding: '12px 15px',
    fontSize: '13px',
    textTransform: 'uppercase',
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif', border: '1px solid #ccc' }}>
      {/* Header Row */}
      <div style={headerStyle}>
        <div>REPORT TITLE</div>
        <div>AUTHORS</div>
        <div>DATE OF PUBLISHING</div>
        <div>ORIGINAL SCAN</div>
      </div>

      {/* Body Rows */}
      <div>
        {reportData.map((report, index) => (
          <ReportRow key={index} report={report} />
        ))}
      </div>
    </div>
  );
};

export default ReportTable;