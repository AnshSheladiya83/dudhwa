import React, { useState } from "react";
    import { FaExpand, FaCompress } from "react-icons/fa";
    
    const FullScreenSection = () => {
      const [isFullScreen, setIsFullScreen] = useState(false);
    
      const toggleFullScreen = () => {
        if (!isFullScreen) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
          } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
        setIsFullScreen(!isFullScreen);
      };
     
      return (
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="cursor-pointer  dropdown-btn flex center-both gap-2px-3  h-[47px] w-[47px] rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-bg-color duration-500 "
            onClick={toggleFullScreen}
          >
            {isFullScreen ? (
              <FaCompress className="w-[18px] h-[18px]" />
            ) : (
              <FaExpand className="w-[18px] h-[18px]" />
            )}
    
          </button>
        </div>
      );
    };
    
    export default FullScreenSection;
    