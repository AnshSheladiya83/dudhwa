import React from "react";
    import { HashLoader } from "react-spinners";
    
    const LoaderComponent = ({ loading }) => {
      if (loading) {
        return (
          <div className="flex w-auto h-screen center-both">
            <HashLoader loading={loading} size={40} color="#008bd9" />
          </div>
        );
      }
    
      return null; // Return null if not loading
    };
    
    export default LoaderComponent;
    
    