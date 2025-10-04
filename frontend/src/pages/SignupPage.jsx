// src/components/SignupPage.jsx
import React, { useState } from "react";
import styles from "../assets/css/LoginPage.module.css";
import peacockImage from "../../public/assets/image/Rectangle 15.png";
import bannerImage from "../../public/assets/image/banner-inner.jpg";
import "../assets/css/about.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authRegister } from "../redux/services/auth/authServices";
import toast from "react-hot-toast";

const Banner = () => (
  <div
    className="banner-container"
    style={{ backgroundImage: `url(${bannerImage})` }}
  >
    <div className="banner-overlay"></div>
    <div className="container">
      <div className="banner-content">
        <h1 className="main-title">Sign Up</h1>
      </div>
    </div>
  </div>
);

function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "AAA",
    lastName: "AAA",
    email: "aaa@gmail.com",
    phone: "4543452354",
    password: "12345678",
    confirmPassword: "12345678"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const validateForm = () => {
  if (!formData.firstName.trim()) {
    toast.error("First Name is required");
    return false;
  }
  if (!formData.lastName.trim()) {
    toast.error("Last Name is required");
    return false;
  }
  if (!formData.email.trim()) {
    toast.error("Email is required");
    return false;
  }
  if (!/\S+@\S+\.\S+/.test(formData.email)) {
    toast.error("Please enter a valid email address");
    return false;
  }
  if (!formData.phone.trim()) {
    toast.error("Phone number is required");
    return false;
  }
  if (!/^\d{10}$/.test(formData.phone)) {
    toast.error("Phone number must be exactly 10 digits");
    return false;
  }
  if (!formData.password.trim()) {
    toast.error("Password is required");
    return false;
  }
  if (formData.password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }
  if (formData.password !== formData.confirmPassword) {
    toast.error("Confirm Password does not match Password");
    return false;
  }
  return true;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const body = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
    };

    const resultAction = await dispatch(authRegister({ body }));
    if (resultAction?.payload?.success) {
      navigate("/login");
    } 
  };

  return (
    <>
      <Banner />
      <div className={styles.loginPageContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginFormSection}>
            <h2 className={styles.loginTitle}>Create Your Account</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", gap: "15px" }}>
                <div className={styles.inputGroup} style={{ flex: 1 }}>
                  <label htmlFor="firstName" className={styles.inputLabel}>
                    First Name
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className={styles.textInput}
                      
                    />
                  </div>
                </div>
                <div className={styles.inputGroup} style={{ flex: 1 }}>
                  <label htmlFor="lastName" className={styles.inputLabel}>
                    Last Name
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className={styles.textInput}
                      
                    />
                  </div>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.inputLabel}>
                  Email
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>📧</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className={styles.textInput}
                    
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="phone" className={styles.inputLabel}>
                  Phone Number
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>📱</span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className={styles.textInput}
                    
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
                    placeholder="Create a password"
                    className={styles.textInput}
                    
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.inputLabel}>
                  Confirm Password
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>🔒</span>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    className={styles.textInput}
                    
                  />
                </div>
              </div>

              <button type="submit" className={styles.continueButton}>
                Create Account
              </button>
            </form>

            <p className={styles.signupText}>
              Already Have An Account?{" "}
              <a href="/login" className={styles.signupLink}>
                Login Here
              </a>
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

export default SignupPage;
