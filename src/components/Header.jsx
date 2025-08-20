import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Custom Logo Component
const Logo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    style={{ marginRight: "10px", verticalAlign: "middle" }}
  >
    <g>
      <rect x="2" y="18" width="6" height="3" rx="1" fill="#8ecae6" />
      <rect x="2" y="7" width="6" height="3" rx="1" fill="#f4a261" />
      <rect x="8" y="12" width="2" height="12" fill="#1976d2" rx="1" />
      <rect x="14" y="6" width="2" height="18" fill="#c2185b" rx="1" />
    </g>
  </svg>
);

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      width: "100vw",
      background: "#18184a",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 2vw",
      height: "70px",
      boxSizing: "border-box",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      <div style={{display: "flex", alignItems: "center", gap: "1vw"}}>
        <img src="https://img.icons8.com/color/48/000000/barbershop.png" alt="Logo" style={{width: 40, height: 40}} />
        <span style={{fontSize: "2rem", fontWeight: "bold", letterSpacing: 2}}>CHANDU SALON</span>
      </div>
      <nav style={{display: "flex", alignItems: "center", gap: "2vw"}}>
        <Link to="/" style={navLink}>Home</Link>
        <Link to="/about" style={navLink}>About</Link>
        <Link to="/services" style={navLink}>Services</Link>
        <Link to="/blog" style={navLink}>Blog</Link>
        <Link to="/account" style={navLink}>My Account</Link>
        <Link to="/contact" style={navLink}>Contact</Link>
        <Link to="/book" style={navBtn}>Book Now</Link>
      </nav>
    </header>
  );
};

const navLink = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "1.1rem",
  fontWeight: 500,
  padding: "0.5rem 1rem",
  borderRadius: "6px"
};

const navBtn = {
  background: "#c2185b",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  padding: "0.6rem 1.3rem",
  borderRadius: "8px",
  marginLeft: "1vw"
};

export default Header;