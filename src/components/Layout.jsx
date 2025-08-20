import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <>
    <Header />
    <div style={{ width: "100vw", minHeight: "80vh", margin: 0, padding: 0, background: "#f7f7f7" }}>
      {children}
    </div>
    <Footer />
  </>
);

export default Layout;