
  import React from "react";
  import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
  import PrivateRoute from "./helpers/PrivateRoute";
  import Login from "./screens/Login";
  import NotFoundPage from "./screens/404";
  import Navbar from "./components/Navbar";
  import { Toaster } from 'react-hot-toast';
  import Sidebar from "./components/Sidebar";
  import { useSelector } from "react-redux";
  import Dashboard from "./screens/Dashboard";
  import EditProfile from "./screens/EditProfile";
  import ChangePassword from "./screens/ChangePassword";
import Bookings from "./screens/Bookings";
import ViewBooking from "./screens/ViewBooking";
import ContactUsPage from "./screens/ContactUsList";
import ViewContact from "./screens/ViewContactUs";
import Users from "./screens/Users";
  
  const App = () => {
    return (
      <Router>
        <AppContent />
      </Router>
    );
  };
  
  const AppContent = () => {
    const location = useLocation();
    const isSidebarOpen = useSelector((state) => state.central.isSidebarOpen);
    console.log(isSidebarOpen)
    const notshowNavbarRoutes = ["/login"];
    const shouldNotShowNavbar = notshowNavbarRoutes.includes(location.pathname);
    return (
      <>
      {!shouldNotShowNavbar && <Navbar />}
      <Toaster />
      <div className={!shouldNotShowNavbar ? "flex h-screen pt-[71px]" : ""}>
        {!shouldNotShowNavbar && <Sidebar />}
        <div className={`flex-grow ${!shouldNotShowNavbar && isSidebarOpen ? "md:ml-[260px]" : ""}`}>
          <Routes>
            <Route path="*" element={<PrivateRoute roles={["admin"]}><NotFoundPage /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute roles={["admin"]}><Dashboard /></PrivateRoute>} />
            <Route
            path="/edit-profile"
            element={
              <PrivateRoute roles={["admin"]}>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <PrivateRoute roles={["admin"]}>
                <ChangePassword />
              </PrivateRoute>
            }
          />
            <Route path="/bookings" element={<PrivateRoute roles={["admin"]}><Bookings /></PrivateRoute>} />
<Route path="/bookings/view-booking/:id" element={<PrivateRoute roles={["admin"]}><ViewBooking /></PrivateRoute>} />
 <Route path="/contactus" element={<PrivateRoute roles={["admin"]}><ContactUsPage /></PrivateRoute>} />
  <Route path="/contactus/view/:id" element={<PrivateRoute roles={["admin"]}><ViewContact /></PrivateRoute>} />
  <Route path="/users" element={<PrivateRoute roles={["admin"]}><Users /></PrivateRoute>} />
          </Routes>
        </div>
      </div>
    </>
    );
  };
  
  export default App;
  