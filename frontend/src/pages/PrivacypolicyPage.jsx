// DudhwaTigerReservePage.jsx

import React from 'react';
import bannerImage from '../../public/assets/image/banner-inner.jpg';
import '../assets/css/about.css';

// Top Banner Component
const Banner = () => (
  <div
    className="banner-container"
    style={{ backgroundImage: `url(${bannerImage})` }}
  >
    <div className="banner-overlay"></div>
    <div className="container">
      <div className="banner-content">
        <h1 className="main-title">Privacy Policy</h1>
      </div>
    </div>
  </div>
);

// Main Privacy Policy Page
const DudhwaTigerReservePage = () => {
  return (
    <div className="page-wrapper">
      <Banner />

      <main className="content-area">
        {/* Privacy Policy Section */}
        <section className="overview-section">
          <div className="container">
            <h2 className="section-title-large">Privacy Policy</h2>
            <p className="overview-text">
              <strong>Effective Date:</strong> 01 October 2025
            </p>

            <p className="overview-text">
              At <strong>Dudhwa Tiger Conservation Foundation (DTCF)</strong>,
              your privacy and data security are of utmost importance. This
              policy explains how we collect, use, and safeguard your
              information when you interact with our website:{' '}
              <a
                href="https://dudhwatigerreserve.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://dudhwatigerreserve.in
              </a>
              .
            </p>

            <h3>Information We Collect</h3>
            <ul className="overview-text">
              <li>
                <strong>Personal Details:</strong> Name, phone number, email
                address, and postal address voluntarily provided through forms
                or donations.
              </li>
              <li>
                <strong>Payment Information:</strong> Processed securely by
                Razorpay Payments Pvt. Ltd.; DTCF does not store or access your
                card/banking details.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type, and
                basic analytics data to enhance site performance.
              </li>
            </ul>

            <h3>Use of Information</h3>
            <ul className="overview-text">
              <li>To process donations and issue digital receipts.</li>
              <li>
                To communicate updates, event invites, or progress reports.
              </li>
              <li>
                To comply with government reporting and audit requirements.
              </li>
              <li>
                To improve our outreach and conservation engagement.
              </li>
            </ul>

            <h3>Data Security</h3>
            <p className="overview-text">
              Our site uses SSL encryption for all online transactions and
              forms. Personal data is accessible only to authorized officials
              and is never sold or shared with third parties. DTCF adheres to
              the <strong>Information Technology Act, 2000 (India)</strong> and
              its associated data protection provisions.
            </p>

            <h3>Cookies</h3>
            <p className="overview-text">
              This website uses cookies for analytics and session management.
              You can disable cookies in your browser settings if preferred.
            </p>

            <h3>Third-Party Links</h3>
            <p className="overview-text">
              External links are provided for reference; DTCF is not responsible
              for their content or privacy practices.
            </p>

            <h3>Contact</h3>
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
