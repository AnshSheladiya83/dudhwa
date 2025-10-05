import React, { useState } from "react";
    import axiosInstance from "../utils/axiosInstance";
    import useToast from "../hooks/useToast";
    import { useDispatch } from "react-redux";
    import { Link, Navigate } from "react-router-dom";
    import { setUserProfile } from "../redux/slices/profileSlice";
    import { setToken } from "../redux/slices/centralSlice";
    
    const LoginForm = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [redirectTo, setRedirectTo] = useState(null);
      const [showPassword, setShowPassword] = useState(false);
      const dispatch = useDispatch();
      const { showToast } = useToast();
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
      const handleLogin = async () => {
        try {
          const response = await axiosInstance.post("/api/auth/login", {
            email,
            password,
          });
          const { token, user } = response.data.data;
          localStorage.setItem("token", token);
          showToast("Login successful");
          dispatch(setUserProfile(user));
          dispatch(setToken(token));
          if (user?.role === "admin") {
            setRedirectTo("/bookings");
          } 
        } catch (error) {
          console.error("Login failed", error);
          showToast("Login failed");
        }
      };
    
      if (redirectTo) {
        return <Navigate to={redirectTo} />;
      }
    
      const handleAdminLogin = () => {
        setEmail("admin@gmail.com");
        setPassword("12345678");
      };
    
      const handleEmployeeLogin = () => {
        setEmail("employee@gmail.com");
        setPassword("12345678");
      };
    
      const handleUserLogin = () => {
        setEmail("user@gmail.com");
        setPassword("123");
      };
    
      return (
        <div className="flex md:justify-center items-center min-h-screen flex-col bg-[#F7F9FB]">
          <div className="md:rounded-[24px] p-[60px] bg-background md:w-[574px] md:h-[531px] w-screen ">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-semibold font-urbanist">Welcome Back</h1>
              <p className="font-normal text-sm mt-1 text-[#1C1C1C66] text-opacity-40">
                Login to continue
              </p>
            </div>
            <div className="flex flex-col items-center justify-center my-8">
            <input
        type="text"
        placeholder="Email"
        className="md:w-[454px] h-[54px] w-[120%] p-[4px_12px] gap-[4px] rounded-[10px] bg-[#F8F9FB] text-sm font-medium font-urbanist focus:outline-none focus:ring-2 focus:ring-[#008BD9] focus:ring-opacity-40 border-opacity-40  focus:border-transparent"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="md:w-[454px] h-[54px] w-[120%] p-[4px_12px] gap-[4px] rounded-[10px] bg-[#F8F9FB] text-sm font-medium font-urbanist mt-[18px] relative focus:outline-none focus:ring-2 focus:ring-[#008BD9] focus:ring-opacity-40 border-opacity-40  focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="cursor-pointer relative bottom-[25px] md:left-[200px] left-[130px] transform -translate-y-1/2  text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.5">
                      <path
                        opacity="0.3"
                        d="M1 12C1 13.6394 1.46746 14.1915 2.40238 15.2957C4.26916 17.5004 7.39993 20 12 20C16.6001 20 19.7308 17.5004 21.5976 15.2957C22.5325 14.1915 23 13.6394 23 12C23 10.3606 22.5325 9.80853 21.5976 8.70433C19.7308 6.49956 16.6001 4 12 4C7.39993 4 4.26916 6.49956 2.40238 8.70433C1.46746 9.80853 1 10.3606 1 12Z"
                        fill="#282D34"
                        stroke="#1C1C1C"
                        stroke-width="1.5"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12ZM9.6 12C9.6 10.6745 10.6745 9.6 12 9.6C13.3255 9.6 14.4 10.6745 14.4 12C14.4 13.3255 13.3255 14.4 12 14.4C10.6745 14.4 9.6 13.3255 9.6 12Z"
                        fill="#282D34"
                        stroke="#1C1C1C"
                        stroke-width="1.5"
                      />
                    </g>
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.5">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.91858 6.60465C2.70062 6.09784 2.11327 5.86324 1.60603 6.08063C1.0984 6.29818 0.863613 6.8869 1.08117 7.39453L1.0816 7.39553L1.08267 7.39802L1.08566 7.4049L1.09505 7.42618C1.10282 7.44366 1.11363 7.46765 1.12752 7.49772C1.15529 7.55783 1.19539 7.64235 1.2481 7.74777C1.35345 7.95845 1.5096 8.25357 1.71879 8.605C2.12772 9.29201 2.74529 10.2043 3.59029 11.1241L2.79285 11.9215C2.40232 12.312 2.40232 12.9452 2.79285 13.3357C3.18337 13.7262 3.81654 13.7262 4.20706 13.3357L5.04746 12.4953C5.61245 12.9515 6.24405 13.3814 6.94417 13.7519L6.16177 14.9544C5.86056 15.4173 5.99165 16.0367 6.45457 16.338C6.91748 16.6392 7.53693 16.5081 7.83814 16.0452L8.82334 14.531C9.50014 14.7386 10.2253 14.8864 11 14.9556V16.4998C11 17.0521 11.4477 17.4998 12 17.4998V12.9998C9.25227 12.9998 7.18102 11.8012 5.69633 10.4109C5.68823 10.4031 5.68003 10.3954 5.67173 10.3878C5.47324 10.2009 5.28532 10.0105 5.10775 9.81932C4.35439 9.00801 3.80137 8.19355 3.43737 7.58204C3.25594 7.27722 3.12302 7.02546 3.03696 6.85334C2.99397 6.76735 2.96278 6.70147 2.94319 6.65905C2.93339 6.63785 2.92651 6.62253 2.9225 6.61352L2.91858 6.60465ZM1.08117 7.39453L1.99995 6.99977C1.08081 7.39369 1.08117 7.39453 1.08117 7.39453Z"
                        fill="#1C1C1C"
                      />
                      <path
                        opacity="0.5"
                        d="M15.2209 12.3984C14.2784 12.7694 13.209 13.0002 12 13.0002V17.5002C12.5523 17.5002 13 17.0525 13 16.5002V14.9559C13.772 14.8867 14.4974 14.7392 15.1764 14.5311L16.1618 16.0456C16.463 16.5085 17.0825 16.6396 17.5454 16.3384C18.0083 16.0372 18.1394 15.4177 17.8382 14.9548L17.0558 13.7524C17.757 13.3816 18.3885 12.9517 18.9527 12.496L19.7929 13.3361C20.1834 13.7267 20.8166 13.7267 21.2071 13.3361C21.5976 12.9456 21.5976 12.3124 21.2071 11.9219L20.4097 11.1245C21.1521 10.3164 21.7181 9.51502 22.1207 8.86887C22.384 8.44627 22.5799 8.08609 22.7116 7.82793C22.7775 7.69874 22.8274 7.59476 22.8619 7.5209C22.8791 7.48397 22.8924 7.45453 22.902 7.4332L22.9134 7.40736L22.917 7.39913L22.9191 7.39411C23.1367 6.88648 22.9015 6.2986 22.3939 6.08105C21.8864 5.86355 21.2985 6.09892 21.0809 6.60627L21.0759 6.61747C21.0706 6.62926 21.0617 6.6489 21.0492 6.6758C21.0241 6.72962 20.9844 6.81235 20.9299 6.91928C20.8207 7.13337 20.6526 7.4431 20.4233 7.81119C19.9628 8.55023 19.2652 9.50857 18.3156 10.3999C17.4746 11.1893 16.4469 11.9158 15.2209 12.3984Z"
                        fill="#1C1C1C"
                      />
                    </g>
                  </svg>
                )}
              </button>
    
              <div className="flex items-center justify-between w-full md:mt-4">
                <div className="border-gray-300 "></div>
                <Link
                  to="/login"
                  className="text-sm font-medium font-urbanist  text-[#1C1C1C]"
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                className="cursor-pointer md:w-[454px] h-[54px] w-[120%] px-4 py-2.5 gap-2 rounded-[12px] bg-primary text-white mt-4 transition duration-300 ease-in-out hover:bg-[#0078C6] font-urbanist font-semibold text-base"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </div>
            <div className="flex w-full gap-4 mt-4">
              <button
                className="cursor-pointer flex flex-col  justify-center w-full h-16 rounded-lg border border-[#1C1C1C] border-opacity-10 px-2 py-3 hover:bg-[#F7F9FB]"
                onClick={handleAdminLogin}
              >
                <span className="text-sm font-semibold text-[#1C1C1C] font-urbanist">
                  Admin
                </span>
                <span className="text-xs font-normal text-opacity-50 opacity-50 font-urbanist">
                  admin@gmail.com
                </span>
              </button>
             
            </div>
          </div>
        </div>
      );
    };
    
    export default LoginForm;
    