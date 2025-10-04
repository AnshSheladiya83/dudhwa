// DudhwaTigerReservePage.jsx

import React from 'react';
import MediaSection from '../components/MediaSection'; 

// Assuming the image is saved in 'assets'
import bannerImage from '../../public/assets/image/banner-inner.jpg';
import '../assets/css/about.css';

// Component for the top banner (reused from previous implementation)
const Banner = () => (
  <div className="banner-container" style={{ backgroundImage: `url(${bannerImage})` }}>
    <div className="banner-overlay"></div> {/* For the darkening effect */}
    <div  className="container">
        <div className="banner-content">
            <h1 className="main-title">About Dudhwa Tiger Reserve</h1>
            <p className="subtitle">Reserve History & Other Information</p>
        </div>
    </div>
  </div>
);

// Component for the main page content
const DudhwaTigerReservePage = () => {
  return (
    <div className="page-wrapper">
      <Banner />

      <main className="content-area">

        {/* 1. Overview Section */}
        <section className="overview-section">
            <div className="container">
                <h2 className="section-title-large">Overview</h2>
                <p className="overview-text">
                    Dudhwa Tiger Reserve is one of the last remains of once vastly spread Himalayan Terai. Being a threatened habitat itself, the beings it harbour are mostly rare and uncommon to the fragmented and ever reducing areas of vast wilderness of the country.
                    {/* ... rest of the first paragraph text ... */}
                </p>
                <p className="overview-text ">
                    <span className="bold-text">Dudhwa Tiger Reserve</span> comprises the Dudhwa National Park, Katarniaghat Wildlife Sanctuary, and Kishanpur Wildlife Sanctuary. The tiger reserve includes fragments of the three large forests mentioned above in an area of 2201.77 sq km. Supported by Mohana River on the Northern boundary and shaarda river on south along with gerwa river in katarniaghat with a series of last remained oxbow lakes and marshy grasslands, dry riverine grasslands and dense moist deciduous  sal woodlands dudhwa becomes a biodiversity hotspot for flora and fauna each interconnected under food chains and food webs of different niches. The challenging landscape makes most of the parts of DTR difficult to access even on foot during the monsoons. A rainbow of colours are to be found as butterflies, insects, flowers embed in dark green hues of woodland and clear sky.
                    {/* ... rest of the second paragraph text ... */}
                </p>
            {/* Note: The yellow swirl graphic would be added via CSS on the .content-area or a dedicated element */}
            </div>
          
        </section>

        {/* 2. Data Table Section */}
        <section className="table-section">
            <div className="container">
                <h3 className="section-title-small">A Quick Overview of Key Information About Dudhwa Tiger Reserve</h3>
                <DudhwaTable />
            </div>
          
        </section>

        {/* 3. History Section */}
        <section className="history-section">
             <div className="container">
                <h2 className="section-title-large">History - Where it all began</h2>
          <p className="history-text">
            Forest areas which constitute today’s Dudhwa NP and Tiger Reserve was brought an area of 303 sq km under the control of the State Government in 1861 after the visit of Sir D. Brandis in 1860. In Kheri district all the Sal and miscellaneous forests and grasslands in Khairigarh Pargana, between Mohana and Suheli Rivers were included in the North Kheri Forest Division.
            {/* ... rest of the first history paragraph text ... */}
          </p>
          <p className="history-text">
            This area is well known for tiger and other game species and equally well known for timber of Sal Shorea robusta. During the post-independence period encroachment on forest lands and poaching continued and alarming degradation of forest and viable decline of wildlife, the Sonaripur Wildlife Sanctuary comprising 15.7 sq km was created in 1955 to specifically protect the Swamp deer Cervus duvaceli duvaceli. The area was too small and later enlarged to 212 sq km and renamed as the Dudhwa Wildlife Sanctuary in 1968. In 1977, by including further additional areas the Dudhwa National Park was created over 490 sq km. The nearby Kishanpur Sanctuary of 200 sq km extent along with the Dudhwa NP was brought under control of the Management of Project Tiger in 1988 as the Dudhwa Tiger Reserve. Currently in 2003, Katerniaghat Wildlife Sanctuary is also included in the Dudhwa Tiger Reserve.
            {/* ... rest of the second history paragraph text ... */}
          </p>
             </div>
          
        </section>
         <MediaSection />
      </main>
    </div>
  );
};

// Component for the data table
const DudhwaTable = () => (
  <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>Name of Protected area</th>
          <th>Core area(km2)</th>
          <th>Buffer area(km2)</th>
          <th>Total area(km2)</th>
        </tr>
      </thead>
      <tbody>
        {/* Row 1 */}
        <tr>
          <td>Dudhwa</td>
          <td>490.2</td>
          <td>190.03</td>
          <td>680.32</td>
        </tr>
        {/* Row 2 */}
        <tr>
          <td>Kishanpur</td>
          <td>203.41</td>
          <td>-</td>
          <td>203.41</td>
        </tr>
        {/* Row 3 */}
        <tr>
          <td>Katarniaghat</td>
          <td>400.09</td>
          <td>150.02</td>
          <td>550.11</td>
        </tr>
        {/* Row 4 */}
        <tr>
          <td>North Kheri</td>
          <td>-</td>
          <td>453.90</td>
          <td>453.90</td>
        </tr>
        {/* Row 5 */}
        <tr>
          <td>South Kheri</td>
          <td>-</td>
          <td>247.79</td>
          <td>247.79</td>
        </tr>
        {/* Row 6 */}
        <tr>
          <td>Shahjahanpur</td>
          <td>-</td>
          <td>26.22</td>
          <td>26.22</td>
        </tr>
        {/* Total Row */}
        <tr className="total-row">
          <td>Total</td>
          <td>1093.79</td>
          <td>1107.98</td>
          <td>2201.77</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default DudhwaTigerReservePage;