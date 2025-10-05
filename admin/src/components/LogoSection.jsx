// ProfileSection.js
    import React from "react";
    import logo from "../assets/logo.png";
    const LogoSection = () => {
      return (
        <div className="flex items-center">
          <div className="">
            <img className="inline-block md:ml-[91px] ml-[25px]" src={logo} />
          </div>
        </div>
      );
    };
    
    export default LogoSection;
    