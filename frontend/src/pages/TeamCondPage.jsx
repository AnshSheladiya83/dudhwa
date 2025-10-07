// DudhwaTigerReservePage.jsx

import React from "react";
import MediaSection from "../components/MediaSection";

// Assuming the image is saved in 'assets'
import bannerImage from "../../public/assets/image/banner-inner.jpg";
import "../assets/css/about.css";

// Component for the top banner
const Banner = () => (
  <div
    className="banner-container"
    style={{ backgroundImage: `url(${bannerImage})` }}
  >
    <div className="banner-overlay"></div>
    <div className="container">
      <div className="banner-content">
        <h1 className="main-title">Terms and Conditions</h1>
      </div>
    </div>
  </div>
);

const DudhwaTigerReservePage = () => {
  return (
    <div className="page-wrapper">
      <Banner />

      <main className="content-area">
        {/* Overview Section */}
        <section className="overview-section">
          <div className="container">
            <h2 className="section-title-large">Terms and Conditions</h2>
            <p className="overview-text">
              <strong>Effective Date:</strong> 
            </p>
            <p className="overview-text">
              Welcome to the official website of{" "}
              <strong>Dudhwa Tiger Conservation Foundation (DTCF)</strong> —{" "}
              <a
                href="https://dudhwatigerreserve.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://dudhwatigerreserve.in
              </a>
              . By using this site, you agree to comply with and be bound by the
              following terms and conditions.
            </p>

            <h3 className="section-title">General Terms</h3>
            <ul className="overview-text">
              <li>
                This website is owned and managed by Dudhwa Tiger Conservation
                Foundation, established under the Wildlife (Protection) Act,
                1972 to support conservation and eco-development within Dudhwa
                Tiger Reserve.
              </li>
              <li>
                Users may access the site for educational, awareness, and
                donation purposes only.
              </li>
              <li>
                Unauthorized reproduction, alteration, or commercial use of any
                site content (text, photos, videos, or data) is strictly
                prohibited.
              </li>
            </ul>

            <h3 className="section-title">Donations and Payments</h3>
            <ul className="overview-text">
              <li>
                All online payments are voluntary contributions toward
                conservation activities, awareness programs, and community
                support.
              </li>
              <li>
                Payments are processed securely through Razorpay Payments Pvt.
                Ltd., following Indian data protection and transaction security
                norms.
              </li>
              <li>
                Once a payment or donation is confirmed, it becomes
                non-refundable except in verified cases of duplication or
                technical error.
              </li>
            </ul>

            <h3 className="section-title">Liability and Disclaimer</h3>
            <ul className="overview-text">
              <li>
                While we strive for accuracy, DTCF does not guarantee
                completeness of information or uninterrupted access to this
                website.
              </li>
              <li>
                The Foundation will not be responsible for any loss, damage, or
                liability arising from the use of this website or related
                digital services.
              </li>
            </ul>

            <h3 className="section-title">Legal Jurisdiction</h3>
            <p className="overview-text">
              These terms are governed by the laws of India. Any disputes are
              subject to the jurisdiction of Lakhimpur Kheri District Courts,
              Uttar Pradesh.
            </p>

            <h3 className="section-title">Contact</h3>
            <p className="overview-text">
              ✉️ <a href="mailto:dudhwanp.palia@gmail.com">dudhwanp.palia@gmail.com</a>
              <br />
              📞 +91 92359 09113
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DudhwaTigerReservePage;
