import React, { useState, useEffect } from "react";
    import { useSelector, useDispatch } from "react-redux";
    import { Navigate } from "react-router-dom";
    import { setIsSidebarOpen, toggleSidebar } from "../redux/slices/centralSlice";
    import LogoSection from "./LogoSection";
    import LanguageSection from "./LanguageSection";
    import ProfileSection from "./ProfileSection";
    import NotificationSection from "./NotificationSection";
    import FullScreenSection from "./atoms/FullScreenSection";
    import CollapseIcon from "../assets/svgs/collapse.svg";
    import Collapse2Icon from "../assets/svgs/collapse2.svg";
    import useIsMobile from "../hooks/useIsMobile";
    
    const Navbar = () => {
      const isSidebarOpen = useSelector((state) => state.central.isSidebarOpen);
      const dispatch = useDispatch();
      const userProfile = useSelector((state) => state.profile);
      const [redirectTo, setRedirectTo] = useState(null);
      const isMobile = useIsMobile();
    
      useEffect(() => {
        // Update sidebar state based on mobile view
        if (isMobile) {
          dispatch(setIsSidebarOpen(false)); // Close sidebar by default on mobile
        } else {
          dispatch(setIsSidebarOpen(true)); // Open sidebar by default on desktop
        }
      }, [isMobile, dispatch]);
    
      if (redirectTo) {
        return <Navigate to={redirectTo} />;
      }
    
      return (
        <nav className="fixed top-0 left-0 right-0 bg-background h-[74px] z-50">
          <div className="flex items-center h-full px-4 lg:px-6">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-between w-full lg:space-x-32 lg:w-auto">
                <LogoSection />
                {!isMobile && (
                  <button
                    className="cursor-pointer flex items-center justify-center h-[47px] w-[47px] px-3 rounded-lg text-[#282D34] bg-secondary/10 hover:bg-secondary/20 transition-bg-color duration-500"
                    onClick={() => dispatch(toggleSidebar())}
                  >
                {isSidebarOpen ? (
  <img src={CollapseIcon} alt="Collapse" className="" />
) : (
  <img src={Collapse2Icon} alt="Collapse 2" className="" />
)}
                  </button>
                )}
              </div>
    
              {/* Desktop view */}
              <div className="items-center hidden gap-1 space-x-4 lg:flex">
                <FullScreenSection />
                <ProfileSection data={userProfile} />
              </div>
    
              {/* Mobile view */}
              {isMobile && (
                <button
                  className="flex items-center justify-center h-[47px] w-[47px] rounded-lg px-3 text-[#282D34] bg-secondary/10 hover:bg-secondary/20 transition-bg-color duration-500"
                  onClick={() => dispatch(toggleSidebar())}
                >
                 {isSidebarOpen ? (
  <img src={CollapseIcon} alt="Collapse"  />
) : (
  <img src={Collapse2Icon} alt="Collapse"  />
)}
                </button>
              )}
            </div>
          </div>
        </nav>
      );
    };
    
    export default Navbar;
    