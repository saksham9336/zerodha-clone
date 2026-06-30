import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) setUserEmail(email);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (index) => setSelectedMenu(index);

  const handleProfileClick = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    window.location.href = "http://localhost:3000/login";
  };

  const getAvatar = () => {
    if (!userEmail) return "ZU";
    return userEmail.substring(0, 2).toUpperCase();
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="logo" />
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/funds" onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => handleMenuClick(6)}>
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />

        <div style={{ position: "relative" }} ref={dropdownRef}>
          <div
            className="profile"
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}
          >
            <div className="avatar" style={avatarStyle}>{getAvatar()}</div>
            <p className="username">{userEmail || "User"}</p>
          </div>

          {isProfileDropdownOpen && (
            <div style={dropdownStyle}>
              <div style={dropdownHeaderStyle}>
                <div className="avatar" style={{ ...avatarStyle, margin: "0 auto 8px" }}>
                  {getAvatar()}
                </div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: "14px", wordBreak: "break-word" }}>
                  {userEmail}
                </p>
              </div>
              <div style={dividerStyle} />
              <div onClick={handleLogout} style={logoutItemStyle}>
                <span style={{ marginRight: "8px" }}>⏻</span> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const avatarStyle = {
  backgroundColor: "#387ed1",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  fontSize: "13px",
  fontWeight: "600",
};

const dropdownStyle = {
  position: "absolute",
  top: "50px",
  right: "0",
  background: "#fff",
  borderRadius: "6px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
  width: "220px",
  padding: "16px",
  zIndex: 1000,
};

const dropdownHeaderStyle = {
  textAlign: "center",
  paddingBottom: "10px",
};

const dividerStyle = {
  height: "1px",
  background: "#eee",
  margin: "8px 0",
};

const logoutItemStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  borderRadius: "4px",
  color: "#e74c3c",
  fontWeight: "500",
  fontSize: "14px",
  cursor: "pointer",
  transition: "background 0.2s",
};

export default Menu;