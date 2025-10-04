// src/components/Hero.jsx

import React from 'react';

export default function Hero() {
  return (
    <section className="hero-section">
      {/* 💡 The background image is applied via the 'hero-section' CSS class */}
      
      <div className="container">
        <div className="hero-content">
          {/* <h1 className="hero-title">Dudhwa </h1> */}
          <p className="hero-description">Untamed Wilderness, Living Legacy of the Himalayan Terai.</p>
          
          <button 
            className="btn btn-safari px-4 py-2" 
            data-value="Jungle safari" 
            data-bs-toggle="modal" 
            data-bs-target="#staticBackdrop"
          >
            Book My Safari
          </button>
        </div>

        <div className="weather-card">
          <i className="fas fa-sun weather-icon"></i>
          <div className="weather-details">
            <div className="temp"><i className="fas fa-temperature-high"></i> 31.42°C</div>
            <div className="humidity"><i className="fas fa-tint"></i> 68%</div>
            <div className="wind"><i className="fas fa-wind"></i> 1.02 m/s</div>
            <div><i className="fas fa-cloud"></i> Scattered clouds</div>
          </div>
        </div>
      </div>
    </section>
  );
}