import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  return (

      <nav class="navbar navbar-expand-lg border-bottom" style={{ backgroundColor: "#FFF", padding: "10px 0" }}>
        <div class="container p-2 d-flex align-items-center justify-content-between">
          <Link class="navbar-brand" to="/">
            <img src="media/images/logo.svg" style={{width: "120px"}} alt="Logo" />
          </Link>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{ flexGrow: 0 }}>
            <ul class="navbar-nav mb-lg-0 align-items-center" style={{ flexDirection: "row", gap: "30px" }}>
              <li class="nav-item">
                <Link class="nav-link" style={navLinkStyle} to="/about">About</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" style={navLinkStyle} to="/products">Products</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" style={navLinkStyle} to="/pricing">Pricing</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" style={navLinkStyle} to="/support">Support</Link>
              </li>

              <li class="nav-item">
                <Link to="/login" style={loginBtnStyle}>Login</Link>
              </li>
              <li class="nav-item">
                <Link to="/signup" style={signupBtnStyle}>Signup</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    
  );
}

const navLinkStyle = {
  color: "#53555c",
  fontSize: "15px",
  fontWeight: "500",
  textDecoration: "none",
};

const loginBtnStyle = {
  color: "#6C5CE7",
  border: "1px solid #6C5CE7",
  padding: "7px 20px",
  borderRadius: "3px",
  fontSize: "14px",
  fontWeight: "500",
  textDecoration: "none",
};

const signupBtnStyle = {
  color: "#fff",
  backgroundColor: "#6C5CE7",
  border: "1px solid #6C5CE7",
  padding: "7px 20px",
  borderRadius: "3px",
  fontSize: "14px",
  fontWeight: "500",
  textDecoration: "none",
};

export default Navbar;
