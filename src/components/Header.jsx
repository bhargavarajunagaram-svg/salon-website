import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when a link is clicked
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" onClick={handleNavClick}>
          <span role="img" aria-label="scissors" style={{fontSize: "2rem"}}>✂️</span>
          <span style={{
            marginLeft: "0.5rem",
            fontWeight: "bold",
            fontSize: "1.5rem",
            letterSpacing: "2px"
          }}>
            SALON
          </span>
        </Link>
      </div>
      <nav className={`navigation${menuOpen ? " open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={handleNavClick}>Home</Link></li>
          <li><Link to="/about" onClick={handleNavClick}>About</Link></li>
          <li><Link to="/services" onClick={handleNavClick}>Services</Link></li>
          <li><Link to="/blog" onClick={handleNavClick}>Blog</Link></li>
          <li><Link to="/contact" onClick={handleNavClick}>Contact</Link></li>
          <li><Link to="/book" onClick={handleNavClick}>Book</Link></li>
          <li><Link to="/account" onClick={handleNavClick}>My Account</Link></li>
        </ul>
      </nav>
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span />
        <span />
        <span />
      </div>
    </header>
  );
};

export default Header;