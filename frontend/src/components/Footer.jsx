import React from 'react';

export default function Footer() {
  return (
    <>
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <figure><img src="../../public/assets/image/f-logo.png" alt=""/></figure>
              <p>
                © 2024. All rights reserved.                
              </p>
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="row">
              <div className="col-md-9 col-sm-12">
                <ul className="privacy_list">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">CSR & Donations</a></li>
                </ul>
              </div>
              <div className="col-md-3 col-sm-12">
                <ul className="social">                
                  <li>
                    <a href="#" target="_blank"><i className="fa-brands fa-twitter"></i></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa-brands fa-instagram"></i></a>
                  </li>
                  {/* <li>
                    <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                  </li> */}
                </ul>
              </div>
            </div>

            <div className="last-footer">
              <div className="row">
                <div className="col-md-4 col-sm-12">
                  <ul className="privacy_list">
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of use</a></li>                    
                  </ul>
                </div>
                <div className="col-md-8 col-sm-12">
                  <ul className="privacy_list ph_mail">
                    <li><a href="#"><strong><i className="fa-sharp fa-regular fa-phone"></i> +91 989XX XXXXX</strong></a></li>
                    <li><a href="mailto:info@dudhwatigerreserve.com"><strong><i className="fa-regular fa-envelope"></i> info@dudhwatigerreserve.com</strong></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}