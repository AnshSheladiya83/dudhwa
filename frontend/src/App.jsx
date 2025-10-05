import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import BookMySafari from "./pages/BookMySafari.jsx";
import BookMy from "./pages/BookMy.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import CongPage from "./pages/CongPage.jsx";
import PrivacypolicyPage from "./pages/PrivacypolicyPage.jsx";
import TeamCondPage from "./pages/TeamCondPage.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BookSafari from "./pages/BookSafari.jsx";
import MyProfilePage from "./pages/MyProfile.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/book-my-safari" element={<BookMySafari />} />
          <Route path="/book-my" element={<BookMy />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/cong" element={<CongPage />} />
          <Route path="/book-safari" element={<BookSafari />} />
          <Route path="/profile" element={<MyProfilePage />} />

          <Route path="/terms-and-conditions" element={<TeamCondPage />} />
          <Route path="/privacy-policy" element={<PrivacypolicyPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
