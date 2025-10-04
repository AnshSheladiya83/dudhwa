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
            <h1 className="main-title">Privacy Policy</h1>
            {/* <p className="subtitle">Reserve History & Other Information</p> */}
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
                <h2 className="section-title-large">Privacy Policy</h2>
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

        
        
       
      </main>
    </div>
  );
};


export default DudhwaTigerReservePage;