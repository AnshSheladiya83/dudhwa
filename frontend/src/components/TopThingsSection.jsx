import React from 'react';

const thingsToDo = [
  { 
    heading: "Wild Animals", 
    description: "Dudhwa’s Big Five: Tigers, Rhinos, Elephants, Leopards, and Swamp Deer with other unique species.", 
    icon: "/assets/image/things-icon1.png" 
  },
  { 
    heading: "Birds Watching", 
    description: "Dudhwa hosts over 400 bird species, including the rare Bengal Florican and vibrant parakeets.", 
    icon: "/assets/image/things-icon2.png" 
  },
  { 
    heading: "Gypsy Safari", 
    description: "Explore Dudhwa’s landscapes and wildlife up close on an exciting Gypsy Safari.", 
    icon: "/assets/image/things-icon3.png" 
  },
  { 
    heading: "Night Stay", 
    description: "Enjoy a group safari through Dudhwa’s wilderness, perfect for shared wildlife adventures.", 
    icon: "/assets/image/night.png" 
  },
];

export default function TopThingsSection() {
  // Placeholder icon for image fallbacks
  const placeholderIcon = "https://placehold.co/100x100/f0f0f0/666666?text=Icon";
  
  return (
    <section className="top__things">
      <div className="container">
        <div className="row text-center mb-5">
          <div className="col-md-12">
            <h2 className="heading_bold">Top Things to do</h2>      
          </div>
        </div>

        <div className="row">
          {thingsToDo.map((item, index) => (
            // Responsive columns: 3 on large desktop, 6 on medium/small devices
            <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={index}>
              <div className="top-thingsCart">
                <figure>
                  <img 
                    src={item.icon} 
                    alt={item.heading + " icon"} 
                    onError={(e) => { e.target.onerror = null; e.target.src = placeholderIcon; }}
                  />
                </figure>
                <div className="things-heading">{item.heading}</div>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <div className="hero__outline__cta">
              {/* Uses the btn-outline-primary class defined in main.css */}
              <a href="#" className="btn btn-outline-primary">Explore More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
