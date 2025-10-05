// src/components/DudhwaZones.jsx

import React from 'react';

// Assuming you will link these to actual safari booking pages or routes later
const zones = [
  // 💡 FIX 1: Corrected image paths to be root-relative (starting with /)
  { name: "DUDHWA", image: "/assets/image/Rectangle 11.png" },
  { name: "KISHANPUR", image: "/assets/image/Rectangle 12.png" },
  { name: "KATARNIAGHAT", image: "/assets/image/Rectangle 13.png" },
];

export default function DudhwaZones() {
  return (
    <section className="pt-20 pb-5 relative topthreecircle">
      
      {/* Background Image / Decoration */}
      <div className="mys">
        {/* 💡 FIX 2: Corrected image source path */}
        <img src="/assets/image/image 7.png" alt="Decorative background element" />
      </div>
      
      <div className="box-top">
        <div className="container">
          {/* Note: Tailwind classes like 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
              are relying on the custom CSS added to main.css.
          */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center space-x-16 zone-card-group">
              
              {zones.map((zone) => (
                <div key={zone.name} className="flex flex-col items-center group zone-card-item">
                  <div className="w-50 h-50 rounded-full overflow-hidden mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {/* 💡 FIX 3: Directly use the corrected path from the zone object */}
                    <img
                      alt={zone.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      src={zone.image} 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{zone.name}</h3>
                  
                  {/* <div className="hero__outline__cta">
                    <a href={`/safari/${zone.name.toLowerCase()}`} className="btn btn-outline-primary">
                        View Details
                    </a>
                  </div> */}

                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
