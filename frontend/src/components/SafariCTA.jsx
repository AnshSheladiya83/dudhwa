import React from 'react';

// Data for the safari options
const safariOptions = [
  { 
    name: 'Jungle Safari', 
    icon: '/assets/image/things-icon1.png', 
    alt: 'Jungle Jeep Icon',
    dataValue: 'Jungle safari' // For modal targeting
  },
  { 
    name: 'Boat Safari', 
    icon: '/assets/image/boat.png', 
    alt: 'Boat Icon',
    dataValue: 'Boat safari'
  },
  { 
    name: 'Night Stay', 
    icon: '/assets/image/night.png', 
    alt: 'Night Tent Icon',
    dataValue: 'Night stay'
  },
];

export default function SafariCTA() {
  return (
    <section className="safari_cta">
      <div className="container">
        <div className="row justify-content-center">
          {safariOptions.map((option, index) => (
            <div key={index} className="col-md-4 col-sm-12 mb-4 mb-md-0">
              <div className="safari_card">
                <figure>
                  {/* Using root-relative paths for images */}
                  <img 
                    src={option.icon} 
                    alt={option.alt} 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/f0f0f0/333333?text=Icon'; }} 
                  />
                </figure>
                <p>
                  <a 
                    href="#" 
                    data-value={option.dataValue} 
                    data-bs-toggle="modal" 
                    data-bs-target="#staticBackdrop"
                  >
                    {option.name}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
