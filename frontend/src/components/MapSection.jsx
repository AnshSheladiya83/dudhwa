import React from 'react';

export default function MapSection() {
  return (
    <section>
      <div className="map-se">
        <div className="container">
          <div className="map-inn">
            {/* Using the image path found in the user's HTML snippet for consistency */}
            <img 
              src="assets/image/Range map of DTR 1.jpg" 
              alt="Range map of Dudhwa Tiger Reserve" 
              onError={(e) => { e.target.onerror = null; e.target.src = 'assets/image/Range map of DTR 1.jpg'; }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
