import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          {/* Logo + Copy */}
          <div className="col-md-4 col-sm-12">
            <figure>
              <img src="/assets/image/f-logo.png" alt="Dudhwa Logo" />
            </figure>
            <p>© 2024. All rights reserved.</p>
          </div>

          {/* Navigation + Social */}
          <div className="col-md-8 col-sm-12">
            <div className="row">
              {/* Navigation Links */}
              <div className="col-md-9 col-sm-12">
                <ul className="privacy_list">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about-us">About</Link></li>
                  <li><Link to="/contact-us">Contact</Link></li>
                  <li><Link to="/reports">CSR & Donations</Link></li>
                </ul>
              </div>

              {/* Social Links (External) */}
              <div className="col-md-3 col-sm-12">
                <ul className="social">
                  <li>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="last-footer">
              <div className="row">
                {/* Policy Links */}
                <div className="col-md-4 col-sm-12">
                  <ul className="privacy_list">
                    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link to="/terms-and-conditions">Terms of use</Link></li>
                
                  </ul>
                </div>

                {/* Contact */}
                <div className="col-md-8 col-sm-12">
                  <ul className="privacy_list ph_mail">
                    <li>
                      <a href="tel:+919895999999">
                        <strong>
                          <i className="fa-sharp fa-regular fa-phone"></i> +91 989XX XXXXX
                        </strong>
                      </a>
                    </li>
                    <li>
                      <a href="mailto:info@dudhwatigerreserve.com">
                        <strong>
                          <i className="fa-regular fa-envelope"></i> info@dudhwatigerreserve.com
                        </strong>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
