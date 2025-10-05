import React, { useState } from "react";
    import { FaPencil } from "react-icons/fa6";
    import { BiEdit } from "react-icons/bi";
    import { PiKey } from "react-icons/pi";
    import { TbLogout2 } from "react-icons/tb";
    import useLogout from "../hooks/useLogout";
    import { Navigate } from 'react-router-dom'; 
    import useNavigation from "../hooks/useNavigation";
    import ProfileImage from '../assets/profile.png'
    const ProfileSection = ({ data }) => {
      const [isProfileOpen, setIsProfileOpen] = useState(false);
      const [selectedImage, setSelectedImage] = useState(null);
      const { handleLogout, redirectTo } = useLogout();
      const { goToPage } = useNavigation();
      const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file); 
      };
      if (redirectTo) {
        return <Navigate to={redirectTo} />; 
      }
      return (
        <div className="relative dropdown-group ">
          <button
            className="flex items-center gap-2 dropdown-btn cursor-pointer "
            onClick={toggleProfile}
          >
            <img
              className="flex-shrink-0 object-cover w-12 h-12 rounded-lg"
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : ProfileImage
              }
              alt="avatar"
            />
            <h3 className="font-urbanist whitespace-nowrap text-sm font-medium capitalize text-left leading-[17px] text-textSeconday">
              Hello,
              <b className="block text-base font-bold font-urbanist text-textPrimary ">{data?.fullName || "John Doe"}</b>
            </h3>
            <i
              className={`lab lab-arrow-${
                isProfileOpen ? "up" : "down"
              } text-xs ml-1.5 lab-font-size-14`}
            ></i>
          </button>
          {isProfileOpen && (
            <div className="dropdown-list absolute top-full right-0 z-50 rounded-xl w-full sm:w-[360px] p-4 shadow-paper bg-white shadow-xl">
              <div className="mx-auto mb-5 text-center w-fit">
                <figure className="relative z-10 w-[98px] h-[98px] border-2 border-dashed rounded-full inline-flex items-center justify-center border-white bg-gradient-to-t from-[#FF7A00] to-[#FF016C] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-24 before:h-24 before:rounded-full before:-z-10 before:bg-white">
                  <img
                    className="w-[90px] h-[90px] rounded-full shadow-avatar"
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : ProfileImage
                    }
                    alt="avatar"
                  />
                </figure>
                {/* <label
                  htmlFor="imageProperty"
                  className="relative z-10 block mx-auto mb-3 bg-black border-2 border-white rounded-full cursor-pointer w-11 h-11 -mt-7 bg-heading"
                >
                  <input
                    accept="image/png, image/jpeg, image/jpg"
                    type="file"
                    id="imageProperty"
                    className="w-full h-full rounded-full opacity-0 cursor-pointer "
                    onChange={handleImageChange}
                  />
                  <i className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer lab lab-fill-edit top-1/2 left-1/2 -z-10 lab-font-size-24 lab-font-color-1">
                    <FaPencil className="text-white/80" />
                  </i>
                </label> */}
                <h3 className="font-urbanist  font-medium text-sm text-rhythm leading-6 capitalize mb-0.5">
                  {data?.fullName || "John Doe"}
                </h3>
                <p className="font-urbanist  text-xs mb-0.5 text-rhythm">
                  {data?.email || "admin@example.com"}
                </p>
                <p className="font-urbanist  text-xs mb-0.5 text-rhythm">{data?.phone || "+9999999999"}</p>
              </div>
              <nav>
                <div
                  onClick={() => goToPage('/edit-profile')}
                  className="paper-link transition w-full flex items-center gap-3 py-3 border-b last:border-none border-[#EFF0F6] cursor-pointer"
                >
                  <i className="lab lab-line-edit lab-font-size-17 "><BiEdit className="text-rhythm relative bottom-[1px]"/></i>
                  <span className="font-urbanist font-normal  text-sm mb-0.5 text-rhythm capitalize leading-6">Edit Profile</span>
                </div>
                <div
                  onClick={() => goToPage('/change-password')}
                  className="paper-link transition w-full flex items-center gap-3 py-3 border-b last:border-none border-[#EFF0F6] cursor-pointer"
                >
                  <i className="lab lab-line-key lab-font-size-17"><PiKey className="text-rhythm relative bottom-[1px]" /></i>
                  <span className="font-urbanist font-normal  text-sm mb-0.5 leading-6 text-rhythm capitalize ">
                    Change Password
                  </span>
                </div>
                <button className="paper-link transition w-full flex items-center gap-3 py-3 border-b last:border-none border-[#EFF0F6] cursor-pointer" onClick={handleLogout}>
                  <i className="lab lab-line-logout lab-font-size-17"><TbLogout2 className="text-rhythm relative bottom-[1px]"/></i>
                  <span className="font-urbanist font-normal  text-sm mb-0.5 text-rhythm capitalize">Logout</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      );
    };
    
    export default ProfileSection;
    