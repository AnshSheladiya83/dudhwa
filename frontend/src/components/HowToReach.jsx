import React, { useState } from 'react';

const cityTabs = [
  { id: 'lucknow', name: 'Lucknow' },
  { id: 'delhi', name: 'Delhi' },
  { id: 'sultanpur', name: 'Sultanpur' },
];

const travelDetails = {
  lucknow: [
    { mode: "By Air", icon: "/assets/image/air.png", alt: "Airplane Icon", details: ["Lucknow Airport is well-connected to major Indian cities.", "Daily flights available for Delhi, Mumbai, Bangalore.", "Airport is 15 km from the city center.", "Cab/Taxi services available 24x7.", "Best option for fast travel."] },
    { mode: "By Road", icon: "/assets/image/bus.jpg", alt: "Bus Icon", details: ["State highways connect Lucknow to nearby cities.", "Frequent UPSRTC buses available.", "NH27 is the main highway route.", "Private cabs and taxis available."] },
    { mode: "By Rail", icon: "/assets/image/train.jpg", alt: "Train Icon", details: ["Lucknow Charbagh is a major railway station.", "Trains available for almost all major cities.", "Metro connectivity available near station.", "Auto-rickshaws available for local travel."] },
  ],
  delhi: [
    { mode: "By Air", icon: "/assets/image/air.png", alt: "Airplane Icon", details: ["Indira Gandhi International Airport is one of the busiest.", "Flights available to domestic & international destinations.", "Airport Metro Express available for fast commute."] },
    { mode: "By Road", icon: "/assets/image/bus.jpg", alt: "Bus Icon", details: ["ISBT Kashmere Gate is the main bus terminal.", "Volvo, Sleeper, AC buses available.", "NH44 connects Delhi to northern India."] },
    { mode: "By Rail", icon: "/assets/image/train.jpg", alt: "Train Icon", details: ["New Delhi Railway Station is well-connected.", "Rajdhani, Shatabdi, Duronto trains available.", "Metro connectivity available from station."] },
  ],
  sultanpur: [
    { mode: "By Air", icon: "/assets/image/air.png", alt: "Airplane Icon", details: ["No direct airport in Sultanpur.", "Nearest airport is Lucknow (135 km).", "Taxi/Bus service available from airport."] },
    { mode: "By Road", icon: "/assets/image/bus.jpg", alt: "Bus Icon", details: ["NH731 connects Sultanpur to Lucknow & Varanasi.", "UPSRTC buses available frequently.", "Good road connectivity with nearby towns."] },
    { mode: "By Rail", icon: "/assets/image/train.jpg", alt: "Train Icon", details: ["Sultanpur Junction is well connected.", "Trains available for Delhi, Lucknow, Varanasi.", "Auto-rickshaws available for local transport."] },
  ],
};


export default function HowToReach() {
  const [activeCity, setActiveCity] = useState('lucknow'); // State to control the active city

  const currentDetails = travelDetails[activeCity];

  return (
    <section>
      <div className="location">
        <div className="container">
          <div className="location-inner">
            <h1>How to reach here from</h1>

            {/* Tab Buttons */}
            <div className="tabs">
              {cityTabs.map((city) => (
                <div
                  key={city.id}
                  className={`tab ${activeCity === city.id ? 'active' : ''}`}
                  data-city={city.id}
                  onClick={() => setActiveCity(city.id)}
                >
                  {city.name}
                </div>
              ))}
            </div>

            {/* Cards Container */}
            <div className="cards">
              {currentDetails.map((travel, index) => (
                <article key={index} className="card active" data-city={activeCity}>
                  <div className="location-box">
                    <div className="location-box-img">
                      {/* Note: Using original image paths. Please ensure these are correctly linked in your public/assets directory. */}
                      <img src={travel.icon} alt={travel.alt} />
                    </div>
                    <div className="location-box-de">
                      <h2>{travel.mode}</h2>
                      <ul>
                        {travel.details.map((detail, detailIndex) => (
                          <li key={detailIndex}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>

    
  );
}