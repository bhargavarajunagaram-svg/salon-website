import React from "react";

const Footer = () => (
  <footer style={{
    width: "100vw",
    background: "#18184a",
    color: "#fff",
    textAlign: "center",
    padding: "1.2rem 0",
    position: "relative",
    left: 0,
    bottom: 0,
    fontSize: "1.1rem"
  }}>
    &copy; {new Date().getFullYear()} Chandu Salon. All rights reserved.
  </footer>
);

export default Footer;
