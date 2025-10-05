import React, { useState } from "react";
    import { useNavigate, useLocation } from "react-router-dom";
    import { useSelector } from "react-redux";
    import sidebarData from "../data/settingsbarData.json";
    import useIsMobile from "../hooks/useIsMobile";
    
    // Import your icon components here
    import { LuLayoutDashboard, LuBox } from "react-icons/lu";
    import { LuBuilding2 } from "react-icons/lu";
    import { IoTennisballOutline } from "react-icons/io5";
    import { MdOutlineMarkEmailUnread } from "react-icons/md";
    import { TfiDirectionAlt } from "react-icons/tfi";
    import { FiTruck } from "react-icons/fi";
    import { MdOutlineLock } from "react-icons/md";
    import { GoBell } from "react-icons/go";
    import { HiOutlineBellSnooze } from "react-icons/hi2";
    import { TiSocialFacebook } from "react-icons/ti";
    import { LuPaintbrush } from "react-icons/lu";
    import { PiSlideshow } from "react-icons/pi";
    import { GrCurrency } from "react-icons/gr";
    import { TbCategory } from "react-icons/tb";
    import { MdOutlineCategory } from "react-icons/md";
    import { LuCrown } from "react-icons/lu";
    import { MdOutlineAssignmentReturn } from "react-icons/md";
    import { FaPeopleCarryBox } from "react-icons/fa6";
    import { BsShop } from "react-icons/bs";
    import { PiUniteSquareDuotone } from "react-icons/pi";
    import { TbReceiptTax } from "react-icons/tb";
    import { GoPasskeyFill } from "react-icons/go";
    import { MdLanguage } from "react-icons/md";
    
    // Define your icon components mapping
    const iconComponents = {
      LuBuilding2,
      IoTennisballOutline,
      MdOutlineMarkEmailUnread,
      TfiDirectionAlt,
      FiTruck,
      MdOutlineLock,
      GoBell,
      HiOutlineBellSnooze,
      TiSocialFacebook,
      PiSlideshow,
      LuPaintbrush,
      GrCurrency,
      TbCategory,
      MdOutlineCategory,
      LuCrown,
      MdOutlineAssignmentReturn,
      FaPeopleCarryBox,
      BsShop,
      TbReceiptTax,
      PiUniteSquareDuotone,
      GoPasskeyFill,
      MdLanguage
    };
    
    const SettingsSidebar = () => {
      const [activeItem, setActiveItem] = useState(null);
      const navigate = useNavigate();
      const location = useLocation();
      const isSidebarOpen = useSelector((state) => state.central.isSidebarOpen);
      const isMobile = useIsMobile();
    
      const isActiveOption = (redirect) => {
        return location.pathname === redirect;
      };
    
      const handleItemClick = (item) => {
        setActiveItem(item.redirect);
        navigate(item.redirect);
      };
      return (
          <div className="flex justify-between h-full pb-4 bg-white shadow-md sm:rounded-lg w-96">
            <ul className="w-full p-2 font-medium scrollbar-red"> 
              {sidebarData.map((item, idx) => {
                const isActive = isActiveOption(item.redirect);
                const IconComponent = iconComponents[item.icon]; // Get the corresponding icon component
                return (
                  <li key={idx}>
                    <div
                      className={`flex items-center p-4 h-12  rounded-md group transition duration-500 ease-in-out cursor-pointer border-b border-rhythm border-opacity-10 ${
                        isActive
                          ? "text-primary bg-primary/5"
                          : "text-gray-900 hover:bg-gray-100"
                      }`}
                      onClick={() => handleItemClick(item)}
                    >
                      {IconComponent && (
                        <IconComponent
                          className={`w-5 h-5 font-urbanist ${
                            isActive
                              ? "text-primary"
                              : "text-rhythm hover:bg-rhythm-100"
                          }`}
                        />
                      )}
                      <span
                        className={`ms-3 font-medium text-base font-urbanist ${
                          isActive ? "text-primary" : "text-rhythm hover:bg-rhythm-100"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="pb-5"></div>
          </div>
      );
    };
    
    export default SettingsSidebar;