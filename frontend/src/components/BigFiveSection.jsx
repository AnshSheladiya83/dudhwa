import React, { useState, useEffect, useCallback } from 'react';

const bigFiveData = [
  { name: "Tiger", src: "../../public/assets/image/big-1.jpg", description: "The apex predator and icon of the reserve." },
  { name: "Rhino", src: "../../public/assets/image/big-2.jpg", description: "The symbol of Dudhwa's successful reintroduction program." },
  { name: "Elephant", src: "../../public/assets/image/big-3.jpg", description: "The majestic Asian Elephant roaming the grasslands and forests." },
  { name: "Leopard", src: "../../public/assets/image/big-4.jpg", description: "The elusive and adaptable spotted big cat." },
  { name: "Swamp Deer (Barasingha)", src: "../../public/assets/image/big-5.jpg", description: "One of the world's largest populations of this unique deer species." },
];

export default function BigFiveSection() {
  const numItems = bigFiveData.length;
  // State for the current visible index
  const [currentIndex, setCurrentIndex] = useState(0);
  // State for how many items should be visible based on screen width
  const [itemsPerView, setItemsPerView] = useState(3);

  // Function to determine visible items based on screen width
  const determineItemsPerView = useCallback(() => {
    // Media query breakpoints based on main.css and Bootstrap standards
    if (window.innerWidth <= 768) {
      setItemsPerView(1); // Mobile
    } else if (window.innerWidth <= 1200) {
      setItemsPerView(2); // Tablet
    } else {
      setItemsPerView(3); // Desktop
    }
    // Reset index to prevent scrolling into empty space when itemsPerView changes
    setCurrentIndex(0);
  }, []);

  // Set initial itemsPerView and listen for resize events
  useEffect(() => {
    determineItemsPerView();
    window.addEventListener('resize', determineItemsPerView);
    return () => window.removeEventListener('resize', determineItemsPerView);
  }, [determineItemsPerView]);

  // Calculate the maximum index allowed before showing empty space
  // E.g., 5 items, 3 visible -> max index is 2 (0, 1, 2)
  const maxIndex = numItems > itemsPerView ? numItems - itemsPerView : 0;
  
  // Calculate the slide movement percentage
  const slidePercentage = itemsPerView > 0 ? (100 / itemsPerView) : 0;
  
  // The total width of the slider track (e.g., 5 items / 3 visible * 100% = 166.66%)
  const sliderTrackWidth = itemsPerView > 0 ? (numItems / itemsPerView * 100) : 0;

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      // Loop back to the start if we hit the limit
      if (prevIndex >= maxIndex) {
        return 0; 
      }
      return prevIndex + 1;
    });
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => {
      // Loop back to the end if we hit the start, or stop at 0 if maxIndex is 0
      if (prevIndex <= 0) {
        return maxIndex;
      }
      return prevIndex - 1;
    });
  };
  
  return (
    <section className="big__five">
      <div className="container">
        {/* Title and Description */}
        <div className="row text-center mb-5">
          <div className="col-md-12">
            <h2 className="heading_bold">The Big Five</h2>
            <p className="lead px-lg-5">
              Dudhwa Tiger Reserve is home to India’s Big Five: the **Tiger**, **Rhino**, **Elephant**, **Leopard**, and **Swamp Deer**. 
              These magnificent animals embody the wild spirit of Dudhwa, each playing a vital role in preserving the rich biodiversity 
              of this unique habitat.
            </p>
          </div>
        </div>

        {/* Big Five Cards / Slider Implementation */}
        <div className="row position-relative">
          <div className="col-md-12">
            <div className="big__five--slider-wrapper">
              <div 
                className="big__five--slider"
                style={{
                  // Translate the track by currentIndex * card width percentage
                  transform: `translateX(-${currentIndex * slidePercentage}%)`,
                  // Set the total width of the track to hold all items
                  width: `${sliderTrackWidth}%`,
                }}
              >
                {bigFiveData.map((animal, index) => (
                  <div 
                    key={index} 
                    className="item" 
                    // Set each item's width based on the calculated percentage (100 / itemsPerView)
                    // ADDED: boxSizing: 'border-box' to ensure the CSS padding is included in the width calculation, 
                    // which is necessary for correct item sizing and slider alignment.
                    style={{ 
                      width: `${slidePercentage}%`,
                      boxSizing: 'border-box' 
                    }}
                  >
                    <a href="#">
                      <div className="big__five-cart">
                        <figure>
                          <img 
                            src={animal.src} 
                            alt={animal.name} 
                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/4a4e69/ffffff?text=${animal.name}`; }} 
                          />
                        </figure>
                        <div className="big-five-heading">
                          {animal.name}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Navigation Buttons */}
            {/* Only show buttons if the number of items is greater than the items visible */}
            {numItems > itemsPerView && (
              <>
                <button 
                  className="slider-nav prev" 
                  onClick={goToPrev}
                  aria-label="Previous animal"
                >
                  &#10094;
                </button>
                <button 
                  className="slider-nav next" 
                  onClick={goToNext}
                  aria-label="Next animal"
                >
                  &#10095;
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
