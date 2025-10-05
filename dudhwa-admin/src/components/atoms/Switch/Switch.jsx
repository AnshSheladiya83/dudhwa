import React, { useState } from 'react';
    import './Switch.css'; // Import your CSS file
    
    const Switch = () => {
      const [isChecked, setIsChecked] = useState(false);
    
      const handleChange = () => {
        setIsChecked(!isChecked);
      };
    
      return (
        <div className="checkbox-wrap">
          <input
            name="slide"
            id="slide"
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
          />
          <label htmlFor="slide">
            <div id="pinkliquid">
              <div id="shine-one" className="shine"></div>
              <div id="shine-two" className="shine"></div>
              <div id="bubbles"></div>
            </div>
            <div id="circle">
              <div id="inner-circle"></div>
              <div id="inner-circle-two"></div>
            </div>
          </label>
        </div>
      );
    };
    
    export default Switch;
    