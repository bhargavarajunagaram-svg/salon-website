import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ResponsiveMenu.css'; // Assuming you have a CSS file for styling

const ResponsiveMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="responsive-menu">
            <button className="menu-toggle" onClick={toggleMenu}>
                {isOpen ? 'Close Menu' : 'Open Menu'}
            </button>
            <nav className={`menu ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/my-account">My Account</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default ResponsiveMenu;