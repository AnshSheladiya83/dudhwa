// src/components/LoginPage.jsx
import React, { useState } from "react";
import styles from "../assets/css/LoginPage.module.css";
import peacockImage from "../../public/assets/image/Rectangle 15.png";
import bannerImage from "../../public/assets/image/banner-inner.jpg";
import "../assets/css/about.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authLogin } from "../redux/services/auth/authServices";
import toast from "react-hot-toast";

const Banner = () => (
  <div
    className="banner-container"
    style={{ backgroundImage: `url(${bannerImage})` }}
  >
    <div className="banner-overlay"></div>
    <div className="container">
      <div className="banner-content">
        <h1 className="main-title">Login</h1>
      </div>
    </div>
  </div>
);

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "ansh@gmail.com", // phone or email
    password: "12345678",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.identifier.trim()) {
      toast.error("Email or Phone number is required");
      return false;
    }
    // check if it's email
    const isEmail = /\S+@\S+\.\S+/.test(formData.identifier);
    const isPhone = /^\d{10}$/.test(formData.identifier);
    if (!isEmail && !isPhone) {
      toast.error("Enter a valid email or 10-digit phone number");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const body = {
      // send as email if input is email else phone
      email: /\S+@\S+\.\S+/.test(formData.identifier)
        ? formData.identifier
        : undefined,
      phone: /^\d{10}$/.test(formData.identifier)
        ? formData.identifier
        : undefined,
      password: formData.password,
    };

    const resultAction = await dispatch(authLogin({ body }));
    if (resultAction?.payload?.success) {
      localStorage.setItem("token", resultAction?.payload?.data?.token);
            navigate("/");

    } 
  };

  return (
    <>
      <Banner />
      <div className={styles.loginPageContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginFormSection}>
            <h2 className={styles.loginTitle}>Login to your Account</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="identifier" className={styles.inputLabel}>
                  Phone Number or Email
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>📧</span>
                  <input
                    type="text"
                    id="identifier"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    placeholder="Enter phone number or email"
                    className={styles.textInput}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.inputLabel}>
                  Password
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>🔒</span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={styles.textInput}
                    required
                  />
                </div>
              </div>

              <button type="submit" className={styles.continueButton}>
                Continue
              </button>
            </form>

            <p className={styles.signupText}>
              Don't Have An Account?{" "}
              <Link to="/signup" className={styles.signupLink}>
                Create An Account
              </Link>
            </p>
          </div>

          <div className={styles.imageSection}>
            <img
              src={peacockImage}
              alt="Peacock"
              className={styles.peacockImage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
