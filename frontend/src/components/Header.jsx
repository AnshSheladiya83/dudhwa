import { User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authGetProfile } from "../redux/services/auth/authServices";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(authGetProfile({ token }));
    }
  }, [dispatch, token]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="header-container w-100 shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light bg-light container-fluid">
        <div className="container px-4 px-sm-6 px-lg-8 d-flex align-items-center justify-content-between">
          {/* Logo */}
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/assets/image/logo.png"
              alt="Dudhwa Tiger Reserve Logo"
              height="70"
            />
          </NavLink>

          {/* Mobile Menu */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu Items */}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav align-items-lg-center">
              {/* ✅ Only Home Active */}
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `nav-link ${isActive ? " text-success fw-bold" : ""}`
                  }
                >
                  Home
                </NavLink>
              </li>

              {/* About Dropdown */}
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  About
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/about-us">
                      Overview
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/flora-fauna">
                      Flora & Fauna
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/history">
                      History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/administrative-structure"
                    >
                      Administrative Structure
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/initiatives">
                      Ongoing Initiatives
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/tourism">
                      Tourism Column
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Publications Dropdown */}
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Publications
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/report">
                      Reports
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/reports">
                      Notifications
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/research-work">
                      Research Work
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/writeups">
                      Write-ups for Research
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/news">
                      News
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Contact */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact-us">
                  Contact
                </NavLink>
              </li>

              {/* CS Donations */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/csr-donations">
                  CS Donations
                </NavLink>
              </li>

              {/* Safari Button */}
              <li className="nav-item ms-lg-4 mt-3 mt-lg-0">
                <NavLink
                  to={profile ? "/book-safari" : "/login"}
                  className="btn btn-safari px-4 py-2 safari"
                >
                  Book My Safari
                </NavLink>
              </li>

              {/* Profile Dropdown */}
              <li
                className="nav-item ms-lg-3 mt-3 mt-lg-0 position-relative"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle bg-light"
                  style={{
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    border: "1px solid #ddd",
                  }}
                >
                  <User size={20} />
                </div>

                {open && (
                  <ul
                    className="dropdown-menu show"
                    style={{
                      position: "absolute",
                      top: "40px",
                      right: "0",
                      display: "block",
                      minWidth: "150px",
                      zIndex: 1000,
                    }}
                  >
                    {profile ? (
                      <>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => navigate("/profile")}
                          >
                            My Profile
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => navigate("/login")}
                          >
                            Login
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            style={{ color: "#5CB85C" }}
                            onClick={() => navigate("/signup")}
                          >
                            Signup
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
