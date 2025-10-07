import React from "react";
import "../assets/css/DonationSection.css";
import "../assets/css/about.css";

// ✅ Banner Component
const Banner = () => (
  <div
    className="banner-container"
    style={{ backgroundImage: `url(/assets/image/banner-inner.jpg)` }}
  >
    <div className="banner-overlay"></div>
    <div className="container">
      <div className="banner-content">
        <h1 className="main-title">CSR & Donations</h1>
      </div>
    </div>
  </div>
);

// ✅ Donation Section Component
const DonationSection = () => {
  return (
    <section className="donation-section">
      {/* CSR Section */}
      <div className="csr-section">
        <div className="csr-content">
          <h2 className="section-title">
            CSR – <span>Partnering For Conservation</span>
          </h2>
          <p className="section-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>

          <div className="csr-icons">
            <div className="icon-box">
              <img src="/assets/icons/wildlife.svg" alt="Wildlife" />
              <p>Wildlife Protection</p>
            </div>
            <div className="icon-box">
              <img src="/assets/icons/community.svg" alt="Community" />
              <p>Community Development</p>
            </div>
            <div className="icon-box">
              <img src="/assets/icons/habitat.svg" alt="Habitat" />
              <p>Habitat Development</p>
            </div>
            <div className="icon-box">
              <img src="/assets/icons/conflict.svg" alt="Conflict" />
              <p>Conflict Management</p>
            </div>
          </div>
        </div>

        <div className="csr-donate-box">
          <button className="btn-donate">MAKE A DONATION</button>
          <button className="btn-outline green">80G CERTIFICATE</button>
          <button className="btn-outline green">REG CERTIFICATE</button>
          <button className="btn-outline green">TAX EXEMPTION</button>
        </div>
      </div>

      {/* Personal Donations Section */}
      <div className="personal-section">
        <h2 className="section-title">
          Personal Donations – <span>Be A Guardian Of The Wild</span>
        </h2>
        <p className="section-text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>

        <div className="personal-icons">
          <div className="icon-box">
            <img src="/assets/icons/difference.svg" alt="Make a Difference" />
            <p>Make a Difference</p>
          </div>
          <div className="icon-box">
            <img src="/assets/icons/protect.svg" alt="Protect" />
            <p>Protect Wilderness</p>
          </div>
          <div className="icon-box">
            <img src="/assets/icons/tax.svg" alt="Tax" />
            <p>Tax Benefit</p>
          </div>
          <div className="icon-box">
            <img src="/assets/icons/guardian.svg" alt="Guardian" />
            <p>Guardian of Wild</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ✅ Page Component Export
export default function DudhwaTigerReservePage() {
  return (
    <>
      <Banner />
      <DonationSection />
    </>
  );
}
