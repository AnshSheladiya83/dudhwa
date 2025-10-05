import { useState, useEffect } from 'react';

    const useIsMobile = () => {
      const [isMobile, setIsMobile] = useState(false);
    
      useEffect(() => {
        // Function to check if the device matches a mobile screen size
        const checkIsMobile = () => {
          // Define the media query for mobile devices
          const mobileMediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust the max-width according to your definition of mobile
    
          // Update the state based on whether the device matches the mobile media query
          setIsMobile(mobileMediaQuery.matches);
        };
    
        // Initial check
        checkIsMobile();
    
        // Event listener to recheck when window size changes
        const resizeListener = () => {
          checkIsMobile();
        };
        window.addEventListener('resize', resizeListener);
    
        // Cleanup function
        return () => {
          window.removeEventListener('resize', resizeListener);
        };
      }, []);
    
      return isMobile;
    };
    
    export default useIsMobile;
    