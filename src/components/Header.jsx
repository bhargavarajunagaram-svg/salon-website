import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Close, Phone, CalendarToday } from "@mui/icons-material";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Check if current path matches the link
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-top">
          <div className="container">
            <div className="header-top-content">
              <div className="header-contact">
                <Phone className="icon" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="header-hours">
                <span>Open Monday - Saturday: 9AM - 8PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="header-main">
          <div className="container">
            <div className="header-content">
              <Link to="/" className="logo" onClick={closeMobileMenu}>
                <div className="logo-icon">
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
                </div>
                <span className="logo-text">CHANDU SALON</span>
              </Link>

              <nav className={`nav ${mobileMenuOpen ? "nav-open" : ""}`}>
                <Link 
                  to="/" 
                  className={`nav-link ${isActiveLink("/") ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className={`nav-link ${isActiveLink("/about") ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
                <Link 
                  to="/services" 
                  className={`nav-link ${isActiveLink("/services") ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  Services
                </Link>
                <Link 
                  to="/blog" 
                  className={`nav-link ${isActiveLink("/blog") ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  Blog
                </Link>
                <Link 
                  to="/gallery" 
                  className={`nav-link ${isActiveLink("/gallery") ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  Gallery
                </Link>
                <Link 
                  to="/contact" 
                  className={`nav-link ${isActiveLink("/contact") ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
                <div className="mobile-actions">
                  <Link 
                    to="/book" 
                    className="nav-btn mobile-btn"
                    onClick={closeMobileMenu}
                  >
                    <CalendarToday className="btn-icon" />
                    Book Appointment
                  </Link>
                </div>
              </nav>

              <div className="header-actions">
                <Link 
                  to="/book" 
                  className="nav-btn"
                >
                  <CalendarToday className="btn-icon" />
                  Book Now
                </Link>
              </div>

              <button 
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <Close /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}

      <style jsx>{`
        /* Header Styles */
        .header {
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        
        .header.scrolled {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .header-top {
          background: #0f1029;
          padding: 8px 0;
          font-size: 0.85rem;
        }
        
        .header-top-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .header-contact, .header-hours {
          display: flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .header-contact .icon {
          font-size: 1rem;
          margin-right: 8px;
        }
        
        .header-main {
          background: #18184a;
          transition: all 0.3s ease;
        }
        
        .header.scrolled .header-main {
          padding: 5px 0;
        }
        
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }
        
        /* Logo Styles */
        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          z-index: 1001;
        }
        
        .logo-icon {
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
        
        .logo-text {
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          letter-spacing: 1px;
        }
        
        /* Navigation Styles */
        .nav {
          display: flex;
          align-items: center;
          gap: 1.5vw;
        }
        
        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 0.8rem;
          border-radius: 6px;
          transition: all 0.3s ease;
          position: relative;
          font-size: 1.1rem;
        }
        
        .nav-link:hover {
          color: #ffd700;
        }
        
        .nav-link.active {
          color: #ffd700;
        }
        
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 5px;
          background: #ffd700;
          border-radius: 50%;
        }
        
        /* Header Actions */
        .header-actions {
          display: flex;
          align-items: center;
        }
        
        .nav-btn {
          background: #c2185b;
          color: white;
          text-decoration: none;
          font-weight: 600;
          padding: 0.7rem 1.5rem;
          border-radius: 50px;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(194, 24, 91, 0.3);
        }
        
        .nav-btn:hover {
          background: #a4134c;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(194, 24, 91, 0.4);
        }
        
        .btn-icon {
          margin-right: 8px;
          font-size: 1.1rem;
        }
        
        /* Mobile Menu Toggle */
        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 1.8rem;
          cursor: pointer;
          z-index: 1001;
        }
        
        /* Mobile Overlay */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }
        
        /* Mobile Actions (hidden on desktop) */
        .mobile-actions {
          display: none;
        }
        
        /* Container */
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Responsive Design */
        @media (max-width: 1024px) {
          .nav {
            gap: 1vw;
          }
          
          .nav-link {
            font-size: 1rem;
            padding: 0.4rem 0.6rem;
          }
          
          .logo-text {
            font-size: 1.6rem;
          }
        }
        
        @media (max-width: 900px) {
          .header-top {
            display: none;
          }
          
          .nav {
            position: fixed;
            top: 0;
            right: -300px;
            width: 300px;
            height: 100vh;
            background: #18184a;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 100px 30px 30px;
            gap: 0;
            transition: right 0.3s ease;
            z-index: 1000;
            box-shadow: -5px 0 25px rgba(0, 0, 0, 0.15);
          }
          
          .nav-open {
            right: 0;
          }
          
          .nav-link {
            width: 100%;
            padding: 1rem 0;
            font-size: 1.1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .nav-link.active::after {
            display: none;
          }
          
          .nav-link.active {
            border-left: 4px solid #ffd700;
            padding-left: 15px;
          }
          
          .mobile-menu-toggle {
            display: block;
          }
          
          .header-actions {
            display: none;
          }
          
          .mobile-actions {
            display: block;
            width: 100%;
            margin-top: 2rem;
          }
          
          .mobile-btn {
            justify-content: center;
            width: 100%;
            text-align: center;
          }
        }
        
        @media (max-width: 576px) {
          .header-content {
            height: 60px;
          }
          
          .logo-text {
            font-size: 1.4rem;
          }
          
          .nav {
            width: 280px;
            padding: 90px 20px 20px;
          }
          
          .container {
            padding: 0 15px;
          }
        }
        
        @media (max-width: 400px) {
          .logo-text {
            font-size: 1.2rem;
          }
          
          .logo-icon svg {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;