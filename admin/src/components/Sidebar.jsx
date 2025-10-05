import React, { useState } from "react";
    import { useSelector } from "react-redux";
    import { LuLayoutDashboard } from "react-icons/lu";
    import { LuBox } from "react-icons/lu";
    import { CiShop } from "react-icons/ci";
    import { IoExtensionPuzzleOutline } from "react-icons/io5";
    import { LuBoxes } from "react-icons/lu";
    import { TbHttpPost } from "react-icons/tb";
    import { HiOutlineInboxStack } from "react-icons/hi2";
    import { IoBagCheckOutline } from "react-icons/io5";
    import { HiOutlineInboxIn } from "react-icons/hi";
    import { RiSwapBoxLine } from "react-icons/ri";
    import { RiCoupon4Line } from "react-icons/ri";
    import { BsTags } from "react-icons/bs";
    import { TbBoxMultiple } from "react-icons/tb";
    import { FaRegBell } from "react-icons/fa";
    import { MdEmail } from "react-icons/md";
    import { LuUser } from "react-icons/lu";
    import { PiUsersThree } from "react-icons/pi";
    import { LuUsers } from "react-icons/lu";
    import { BsCreditCard } from "react-icons/bs";
    import { FaArrowTrendUp } from "react-icons/fa6";
    import { TbReportAnalytics } from "react-icons/tb";
    import { PiTrayArrowUpLight } from "react-icons/pi";
    import { IoSettingsOutline } from "react-icons/io5";
    
    
    import { useNavigate, useLocation } from "react-router-dom"; // Importing the useNavigate and useLocation hooks
    import sidebarData from "../data/sidebarData.json";
    import useIsMobile from "../hooks/useIsMobile";
    
    const iconComponents = {
      LuLayoutDashboard: LuLayoutDashboard,
      LuBox: LuBox,
      CiShop: CiShop,
      IoExtensionPuzzleOutline: IoExtensionPuzzleOutline,
      LuBoxes: LuBoxes,
      TbHttpPost: TbHttpPost,
      HiOutlineInboxStack: HiOutlineInboxStack,
      IoBagCheckOutline: IoBagCheckOutline,
      HiOutlineInboxIn: HiOutlineInboxIn,
      RiSwapBoxLine: RiSwapBoxLine,
      RiCoupon4Line: RiCoupon4Line,
      BsTags: BsTags,
      TbBoxMultiple: TbBoxMultiple,
      FaRegBell: FaRegBell,
      MdEmail: MdEmail,
      LuUser: LuUser,
      PiUsersThree: PiUsersThree,
      LuUsers: LuUsers,
      BsCreditCard: BsCreditCard,
      FaArrowTrendUp: FaArrowTrendUp,
      TbReportAnalytics: TbReportAnalytics,
      PiTrayArrowUpLight: PiTrayArrowUpLight,
      IoSettingsOutline: IoSettingsOutline,
    };
    
    
    const Sidebar = () => {
      const [activeItem, setActiveItem] = useState(null); // State to keep track of active item
      const navigate = useNavigate(); // Initializing useNavigate hook
      const location = useLocation(); // Initializing useLocation hook to get the current route path
    
      // Get the sidebar state from Redux store
      const isSidebarOpen = useSelector((state) => state.central.isSidebarOpen);
      const isMobile = useIsMobile();
      // Apply CSS classes conditionally based on the sidebar state
      const sidebarClasses = `${isMobile?"lg:block sm:hidden ":""} fixed left-0 top-0 z-40 h-full w-[264px] p-4 pr-5 overflow-y-auto bg-background transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "hidden -translate-x-full"
      } sm:translate-x-0 pt-[85px]`;
    
      // Function to determine if an option is active based on the current route path
      const isActiveOption = (redirect) => {
        return location.pathname === redirect;
      };
    
      const handleItemClick = (item) => {
        setActiveItem(item.redirect); // Set the active item when clicked
        navigate(item.redirect); // Navigate to the clicked option's redirect path
      };
    
      return (
        <aside id="default-sidebar" className={sidebarClasses} aria-label="Sidebar">
          <div className="h-full" >
            <ul className="font-medium scrollbar-red ">
              {sidebarData.map((section, index) => (
                <React.Fragment key={index}>
                  {section.section !== "default" && (
                    <div className="flex items-center h-8 sidebar-section">
                      <span className="uppercase font-urbanist text-xs text-rhythm font-medium tracking-[2px] text-opacity-70">
                        {section.section}
                      </span>
                    </div>
                  )}
                  {section.options.map((option, idx) => {
                    const IconComponent = iconComponents[option.icon];
                    const isActive = isActiveOption(option.redirect); // Check if the item is active
                    return (
                      <li key={idx}>
                        <div
                          href={option.redirect}
                          className={`flex items-center p-4 h-12 rounded-lg group transition duration-500 ease-in-out cursor-pointer ${
                            isActive
                              ? "text-primary bg-primary/5"
                              : "text-gray-900 hover:bg-gray-100"
                          }`}
                          onClick={() => handleItemClick(option)}
                        >
                          {IconComponent && (
                            <IconComponent className={`w-5 h-5 font-urbanist  ${
                              isActive
                                ? "text-primary"
                                : "text-rhythm hover:bg-rhythm-100"
                            }`} />
                          )}
                          <span className={`ms-3 font-medium text-base font-urbanist  ${
                              isActive
                                ? "text-primary "
                                : "text-rhythm hover:bg-rhythm-100"
                            }`}>
                            {option.title}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </React.Fragment>
              ))}
            </ul>
            <div className="pb-5"></div>
          </div>
        </aside>
      );
    };
    
    export default Sidebar;